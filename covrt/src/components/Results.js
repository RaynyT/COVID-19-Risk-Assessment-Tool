import riskMeterImage from '../images/risk-meter.svg'
import houseIcon from '../images/house-vector.svg'
import sunIcon from '../images/sun-vector.svg'
import clockIcon from '../images/clock-vector.svg'
import peopleIcon from '../images/people-icon-vector.svg'
import rulerIcon from '../images/ruler-vector.svg'
import volumeIcon from '../images/volume-vector.svg'

import "./Results.css"
import { Link } from 'react-router-dom';
import { InfoIcon } from '@primer/octicons-react';
import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@primer/octicons-react';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
        indoors: "Indoors",
        outdoors: "Outdoors",
        lessThanSixFeet: "Less than 6 feet",
        sixFeet: "6 feet",
        nineFeet: "9 feet",
        moreThanNineFeet: "More than 9 feet",
        notSpeaking: "Not speaking",
        normalSpeaking: "Speaking normally",
        loudSpeaking: "Speaking loudly",
        cottonMask: "Cotton mask",
        surgicalMask: "Surgical mask",
        kn95Mask: "KN95 Mask",
        noMask: "No mask",
    }
});

export default function Results(props){

    console.log("Risk score:", props.riskScore);

    
    let startingPage = "results";
    
    // If user has navigated here by coming back from the results page
    // start them on the last screen of the calculator
    if (props.location.fromTipsButton) {
        startingPage = "tips";
    }
    
    const [page, setPage] = useState(startingPage);
    
    
    const changePageCallback = (value) => {
        setPage(value)
    }

    let screen = <ResultsScreen {...props} riskScore={props.riskScore} setPage={changePageCallback} />;
    
    if (!props.surveyCompleted) {
        screen = <ErrorScreen />
    } else if (page === "results") {
        screen = <ResultsScreen {...props} riskScore={props.riskScore} setPage={changePageCallback} />
    } else {
        screen = <ReduceRiskScreen {...props} riskScore={props.riskScore} setPage={changePageCallback} />
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

    // Set outdoors/indoors icon
    let activitySettingIcon = houseIcon;
    if (props.activityBasicInfo.setting === "outdoors") {
        activitySettingIcon = sunIcon;
    }

    let attendeesText = props.activityBasicInfo.attendees
    if (attendeesText >= 999999999) {
        attendeesText = "100000000+";
    }

    let maskAmountText = Math.round(props.othersMask.numWearers);
    if (maskAmountText >= 999999999) {
        maskAmountText = "100000000+";
    }

    const switchToReducePage = () => {
        props.setPage("reduce");
    }

    let summarySubheading = "";
    if (props.location.fromDashboard) {
        // Think of better phrasing for this
        summarySubheading = <h2 className="risk-subheading">of your most recent activity</h2>;
    }

    return (
        <div>
            <div>
                <div className="results-nav">
                        <button className="btn" aria-label="Previous step">
                            <Link to={{pathname: "/calculator", fromResults: true}} aria-label="Link to dashboard">
                                <ChevronLeftIcon size={48} fill="#4A7CE2" />
                            </Link>
                        </button>
                        <div>
                            <Link to="/dashboard" className="dashboard-link-btn" aria-label="Link to dashboard">
                                <p className="to-dashboard-text">To Risk Dashboard</p>
                                <ChevronRightIcon size={48} fill="#4A7CE2" />
                            </Link>
                        </div>
                    </div>
                </div>
            <div>
                <h1 className="risk-title">Risk Summary</h1>
                {summarySubheading}
                <img className="risk-level-img" alt="Risk meter" src={riskMeterImage} />
            </div>
            <div className="horizontal-center">
                <div>
                    <h3 className="list-title">Activity</h3>

                    <div className="container">
                        <div className="row img-card-row">
                            <div className="col-3">
                                <ImageCard image={activitySettingIcon} desc={strings[props.activityBasicInfo.setting]} alt="Test" />
                            </div>
                            <div className="col-3">
                                <ImageCard image={clockIcon} desc={props.activityBasicInfo.hours + "h " + props.activityBasicInfo.minutes + "m"} alt="Clock icon" />
                            </div>
                            <div className="col-3">
                                <ImageCard image={peopleIcon} desc={attendeesText + " people"} alt="Icon of two people" />
                            </div>
                            <div className="col-3">
                                <ImageCard image={rulerIcon} desc={strings[props.distancing]} alt="Ruler icon" />
                            </div>
                        </div>
                        <div className="row img-card-row">
                            <div className="col-3">
                                <ImageCard image={volumeIcon} desc={strings[props.speakingVolume]} alt="Speaker icon" />
                            </div>
                            <div className="col-3">
                            <ImageCard noImage desc={"I will wear: " + strings[props.ownMask]} alt="none" />
                            </div>
                            <div className="col-3">
                            <ImageCard noImage desc={"Others wear: " + strings[props.othersMask.type]} alt="none" />
                            </div>
                            <div className="col-3">
                            <ImageCard noImage desc={maskAmountText + " people will wear masks"} alt="none" />
                            </div>
                        </div>
                    </div>
                    <h3 className="list-title">Demographic</h3>
                    <ul className="selection-list">
                        <li className="selection-list-item">{props.userLocation.stateCode} state</li>
                        <li className="selection-list-item">{props.userLocation.county} county</li>
                    </ul>
                </div>
            </div>
            <div className="horizontal-center link-container">
                <Link to="/FAQ"><InfoIcon /> How is my risk calculated?</Link>
            </div>
            <div className="horizontal-center">
                <button className="btn btn-primary" onClick={switchToReducePage}>Lower my risk!</button>
            </div>
        </div>
    )
}

function ReduceRiskScreen(props) {

    const switchToResultsPage = () => {
        props.setPage("results")
    }

    return (
        <div>
            <div className="results-nav">
                <button className="btn" onClick={switchToResultsPage} aria-label="Previous step">
                    <ChevronLeftIcon size={48} fill="#4A7CE2" />
                </button>
                <div className="hidden">
                    <Link to="/dashboard" className="dashboard-link-btn" aria-label="Link to dashboard">
                        <p className="to-dashboard-text">To Risk Dashboard</p>
                        <ChevronRightIcon size={48} fill="#4A7CE2" />
                    </Link>
                </div>
            </div>
            <h1 className="risk-title">Tips to Lower Risk</h1>
            <h2 className="risk-subheading">Check the suggestions you would like to implement:</h2>
            <div className="tips-container">
                <TipList />
            </div>
            <div className="horizontal-center">
                <button className="btn btn-primary lower-risk-btn" onClick={switchToResultsPage}>Lower my risk!</button>
            </div>
        </div>
    )
}

function TipList (props) {
    let testArray = [
        {suggestion: "Suggestion One"},
        {suggestion: "Suggestion Two"},
        {suggestion: "Suggestion Three"},
        {suggestion: "Suggestion Four"},
        {suggestion: "Suggestion Five"},
        {suggestion: "Suggestion Six"}
    ];

    let list = testArray.map((item) => {
        return(
            <li key={item.suggestion} className="tips-list-item">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value={item.suggestion} id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        {item.suggestion}
                    </label>
                </div>
            </li>
        );
    })

    return (
        <ul className="tips-list">
            {list}
        </ul>
    );
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