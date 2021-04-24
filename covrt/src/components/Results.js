import riskMeterImage from '../images/risk-meter.svg'
import houseIcon from '../images/house-vector.svg'
import sunIcon from '../images/sun-vector.svg'
import clockIcon from '../images/clock-vector.svg'
import peopleIcon from '../images/people-icon-vector.svg'
import rulerIcon from '../images/ruler-vector.svg'
import volumeIcon from '../images/volume-vector.svg'

import "./Results.css"
import { Link } from 'react-router-dom';
import { InfoIcon, LightBulbIcon } from '@primer/octicons-react';
import { useState } from 'react'



export default function Results(props){

    // TODO
    // Should find a way to make these not dependent on the names of the selections
    // That way it will be easier to change if the wording of the questions change

    // TODO: Find a way to make fractions work in a JSON object

    const numericValues = {
        "Indoor": 1,
        "Outdoor": .05,
        "Less than 6 feet": 1,
        "6 feet": .5,
        "9 feet": .25,
        "More than 9 feet": .125,
        "Not speaking": .20,
        "Speaking normally": 1,
        "Speaking loudly or shouting": 5,
        "Cotton Mask": .6666666666,
        "Surgical Mask": .5,
        "KN95 Mask": .3333333333,
        "No Mask": 1
    }

    const calculateRiskScore = () => {

        let score = (
            numericValues[props.activityBasicInfo.setting] * props.activityBasicInfo.attendees *
            (props.activityBasicInfo.hours + (props.activityBasicInfo.minutes / 60)) *
            numericValues[props.ownMask] * (numericValues[props.othersMask.type] * props.othersMask.percent) *
            numericValues[props.distancing] * numericValues[props.speakingVolume]
        );

        // if (isNaN(score)) {
        //     console.log("Error with calc:")
        //     console.log(score);
        //     console.log("Basic info: ", props.activityBasicInfo);
        //     console.log("Distancing: ", props.distancing);
        //     console.log("Volume: ", props.speakingVolume);
        //     console.log("Own Mask: ", props.ownMask);
        //     console.log("Others Mask: ", props.othersMask);

        //     console.log("Setting value: ", numericValues[props.activityBasicInfo.setting]);
        //     console.log("Mask values: ",  numericValues[props.ownMask], numericValues[props.othersMask.type]);
        //     console.log("Distancing value: ", numericValues[props.distancing]);
        //     console.log("Volume value: ", numericValues[props.speakingVolume]  )
        // }

        return score;
    }

    const [riskScore, setRiskScore] = useState(calculateRiskScore());

    let screen = <ErrorScreen />;
    
    if (props.surveyCompleted) {
        screen =<ResultsScreen {...props} riskScore={riskScore}/>;
    }

    return (
        <div className="results-outer">
            <div className="results-main-container">
                {screen}
            </div>
        </div>
    );
}

function ErrorScreen() {
    return (
        <div className="alert alert-warning">
            <p className="error-text">It seems you've navigated to the results page without calculating your risk first</p>
            <p className="error-text">To calculate your risk, head here: <Link to="/calculator">Calculator</Link> </p>
            <p className="error-text">If you have completed the survey already, then this is an error on our end and we apologize for the inconvenience</p>
        </div>
    )
}

function ResultsScreen(props) {

    // Set outdoor/indoor icon
    let activitySettingIcon = houseIcon;
    if (props.activityBasicInfo.setting === "Outdoor") {
        activitySettingIcon = sunIcon;
    }

    // This is the stupidest hacky way to fix the text overflowing from the button
    // But since this is the only string of text that does it, I'm using this for now
    // until I have more time to fix the general problem
    let volumeText = props.speakingVolume;
    if (props.speakingVolume === "Speaking loudly or shouting") {
        volumeText = "Speaking loudly";
    }

    // Another stupid edge case I felt like catching
    let attendeesText = props.activityBasicInfo.attendees
    if (attendeesText >= 999999999) {
        attendeesText = "100000000+";
    }

    let maskAmountText = Math.round(props.othersMask.percent / 100 * props.activityBasicInfo.attendees);
    if (maskAmountText >= 999999999) {
        maskAmountText = "100000000+";
    }


    return (
        <div>
            <div>
                <h1 className="risk-title">Risk Summary</h1>
                <h2 className="risk-level-text">Risk score: {props.riskScore}</h2>
                <img className="risk-level-img" alt="Risk meter" src={riskMeterImage} />
            </div>
            <div className="horizontal-center">
                <div>
                    <h3 className="list-title">Activity</h3>

                    <div className="container">
                        <div className="row img-card-row">
                            <div className="col-3">
                                <ImageCard image={activitySettingIcon} desc={props.activityBasicInfo.setting} alt="Test" />
                            </div>
                            <div className="col-3">
                                <ImageCard image={clockIcon} desc={props.activityBasicInfo.hours + "h " + props.activityBasicInfo.minutes + "m"} alt="Clock icon" />
                            </div>
                            <div className="col-3">
                                <ImageCard image={peopleIcon} desc={attendeesText + " people"} alt="Icon of two people" />
                            </div>
                            <div className="col-3">
                                <ImageCard image={rulerIcon} desc={props.distancing} alt="Ruler icon" />
                            </div>
                        </div>
                        <div className="row img-card-row">
                            <div className="col-3">
                                <ImageCard image={volumeIcon} desc={volumeText} alt="Speaker icon" />
                            </div>
                            <div className="col-3">
                            <ImageCard noImage desc={"I will wear: " + props.ownMask} alt="none" />
                            </div>
                            <div className="col-3">
                            <ImageCard noImage desc={"Others wear: " + props.othersMask.type} alt="none" />
                            </div>
                            <div className="col-3">
                            <ImageCard noImage desc={maskAmountText + " people will wear masks"} alt="none" />
                            </div>
                        </div>
                    </div>
                    <h3 className="list-title">Demographic</h3>
                    <ul className="selection-list">
                        <li className="selection-list-item">{props.location.state} state</li>
                        <li className="selection-list-item">{props.location.county} county</li>
                    </ul>
                    <h3 className="list-title">Work Status</h3>
                    <ul className="selection-list">
                        <li className="selection-list-item">{props.workStatus}</li>
                    </ul>
                </div>
            </div>
            <div className="horizontal-center link-container">
                <Link to="/about"><InfoIcon /> How is my risk calculated?</Link>
            </div>
            <div className="horizontal-center">
                <btn className="btn btn-primary"><LightBulbIcon/> Tips to lower risk</btn>
            </div>
        </div>
    )
}

function ImageCard(props) {

    let imageClass = "img-card-image-container"

    if(props.noImage) {
        imageClass = "display-none";
    }

    return(
        <div className="img-card">
            <div className="img-card-content">
                <div className={imageClass}>
                    <img className="img-card-image" src={props.image} alt={props.alt} />
                </div>
                <div className="img-card-text">
                    {props.desc}
                </div>
            </div>
        </div>
    );
}