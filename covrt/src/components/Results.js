import highRiskMeter from '../images/high-risk-meter.svg';
import mediumRiskMeter from '../images/medium-risk-meter.svg';
import lowRiskMeter from '../images/low-risk-meter.svg';

import houseIcon from '../images/house-vector.svg'
import sunIcon from '../images/sun-vector.svg'
import clockIcon from '../images/clock-vector.svg'
import peopleIcon from '../images/people-icon-vector.svg'
import rulerIcon from '../images/ruler-vector.svg'
import volumeIcon from '../images/volume-vector.svg'

import celebrationImage from '../images/celebration.svg'

import "./Results.css";
import { Link } from 'react-router-dom';
import { InfoIcon } from '@primer/octicons-react';
import { useState, useEffect } from 'react';
import { Form } from 'reactstrap';
import { ChevronLeftIcon, ChevronRightIcon } from '@primer/octicons-react';
import LocalizedStrings from 'react-localization';
import axios from 'axios';
import calculateRiskScore from './CalculateRiskScore.js';
import Loader from "react-loader-spinner";


let strings = new LocalizedStrings({
    en:{
        indoors: "Indoors",
        outdoors: "Outdoors",
        lessThanSixFeet: "Less than 6 feet",
        sixFeet: "6 feet",
        nineFeet: "9 feet",
        twelveFeetOrMore: "12 feet or more",
        notSpeaking: "Speaking minimally",
        normalSpeaking: "Speaking normally",
        loudSpeaking: "Speaking loudly",
        cottonMask: "Cotton mask",
        surgicalMask: "Surgical mask",
        kn95Mask: "KN95 Mask",
        noMask: "No mask",
        none: "None",
        pfizer: "Pfizer",
        moderna: "Moderna",
        johnsonAndJohnson: "Johnson & Johnson",
        astrazeneca: "Astrazeneca",
        other: "Other",
    }
})

export default function Results(props){

    console.log("Risk score:", props.riskScore);

        
    const [page, setPage] = useState("results");    
    
    const changePageCallback = (value) => {
        setPage(value)
    }

    let screen = <ResultsScreen {...props} setPage={changePageCallback} />;
    
    if (!props.surveyCompleted) {
        screen = <ErrorScreen />
    } else if (page === "results") {
        screen = <ResultsScreen {...props} setPage={changePageCallback} />
    } else {
        screen = <ReduceRiskScreen {...props} setPage={changePageCallback} />
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

    // Recalculate risk score just in case
    let riskScore = calculateRiskScore({...props});
    props.updateRiskScore(riskScore);

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

    let countyComparisonText = "";
    if (props.countyComparison.direction === "higher") {
        countyComparisonText = <span> has <span className="red">higher</span> than national average COVID rates</span>
    } else if (props.countyComparison.direction === "lower") {
        countyComparisonText = <span> has <span className="green">lower</span> than national average COVID rates</span>
    }

    const switchToReducePage = () => {
        props.setPage("reduce");
    }

    // Set risk level text and meter image
    // Default to moderate
    let riskLevelText = "Moderate Risk";
    let riskLevelClass = "risk-title yellow";
    let riskMeterImage = mediumRiskMeter;

    if (riskScore < 25) {
        riskLevelText = "Low Risk";
        riskLevelClass = "risk-title green";
        riskMeterImage = lowRiskMeter;
    } else if (riskScore < 350) {
        riskLevelText = "Moderately Low Risk";
        riskLevelClass = "risk-title green";
        riskMeterImage = lowRiskMeter;
    } else if (riskScore < 1000) {
        riskLevelText = "Moderate Risk";
        riskLevelClass = "risk-title yellow";
        riskMeterImage = mediumRiskMeter;
    } else if (riskScore < 10000) {
        riskLevelText = "Moderately High Risk";
        riskLevelClass = "risk-title red";
        riskMeterImage = highRiskMeter;
    } else {
        riskLevelText = "Very High Risk";
        riskLevelClass = "risk-title red";
        riskMeterImage = highRiskMeter;
    }

    let summarySubheading = "";
    if (props.location.fromDashboard) {
        summarySubheading = <h2 className="risk-subheading">of your most recent activity</h2>;
    }

    // If results page is accessed by URL or from dashboard
    let resultsNav = (
        <div className="results-nav">
            <button className="btn" aria-label="Previous step">
                <Link to={{ pathname: "/dashboard", fromResults: true }} aria-label="Link to last page of">
                    <ChevronLeftIcon size={48} fill="#4A7CE2" />
                </Link>
            </button>
            <div className="hidden">
                <Link to="/dashboard" className="dashboard-link-btn" aria-label="Link to dashboard">
                    <ChevronRightIcon size={48} fill="#4A7CE2" />
                </Link>
            </div>
        </div>
    );
    
    // If results page is accessed from calculator back button should go to calc
    if (props.location.fromCalculator) {
        resultsNav = (
            <div className="results-nav">
            <button className="btn" aria-label="Previous step">
                <Link to={{ pathname: "/calculator", fromResults: true }} aria-label="Link to dashboard">
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
        )
    }

    return (
        <div>
            <div>
                {resultsNav}
            </div>
            <div>
                <h1 className="risk-title">Risk Summary</h1>
                {summarySubheading}
                <h2 className={riskLevelClass}>{riskLevelText}</h2>
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
                        <li className="selection-list-item">
                            {props.userLocation.county}{countyComparisonText}
                            </li>
                        <li className="selection-list-item">
                            Vaccine: {strings[props.vaccination.type]} - {props.vaccination.doseNumber} doses
                        </li>
                    </ul>
                </div>
            </div>
            <div className="horizontal-center link-container">
                <Link to="/faq"><InfoIcon /> How is my risk calculated?</Link>
            </div>
            <div className="horizontal-center">
                <button className="btn btn-primary" onClick={switchToReducePage}>Lower my risk!</button>
            </div>
        </div>
    )
}

function ReduceRiskScreen(props) {

    // Holds the current suggestions from the backend
    const [suggestionObject, setSuggestionsObject] = useState(null);

    const switchToResultsPage = () => {
        props.setPage("results")
    }

    // Copy vaccinationSelection into new object with any ints converted to strings
    let doseString = props.vaccination.doseNumber.toString();
    let effDoseString = props.vaccination.effectiveDoseNumber.toString();
    let vaxData = { 
        type: props.vaccination.type,
        doseNumber: doseString,
        effctiveDoseNumber: effDoseString,
        twoWeeks: props.vaccination.twoWeeks
    };
    
    // SurveyData to send in backend request
    let surveyData = {
        userID: props.userID,
        userLocation: props.userLocation,
        vaccination: vaxData,
        activityBasicInfo: props.activityBasicInfo,
        distancing: props.distancing,
        speakingVolume: props.speakingVolume,
        ownMask: props.ownMask,
        othersMask: props.othersMask,
        riskScore: props.riskScore,
        surveyCompleted: props.surveyCompleted,
    }
    
    // Callback for submitting suggestions form
    let submitCallback = (event) => {
        event.preventDefault();

        // Check if each input exists
        // Check if it is checked
        // Update app state with it's value

        if ( event.target.setting){
            if (event.target.setting.checked) {
                props.updateActivitySetting(event.target.setting.value);
            }
        }
        if (event.target.distancing){
            if (event.target.distancing.checked) {
                props.updateDistancing(event.target.distancing.value);
            }       
        }
        if (event.target.speakingVolume){
            if (event.target.speakingVolume.checked) {
                props.updateSpeakingVolume(event.target.speakingVolume.value);
            }           
        }
        if (event.target.ownMask){
            if(event.target.ownMask.checked) {
                props.updateOwnMask(event.target.ownMask.value);
            }
        }
        if(event.target.othersMaskType){
            if(event.target.othersMaskType.checked){
                props.updateOthersMaskType(event.target.othersMaskType.value);
            }
        }

        switchToResultsPage();
    }

    // POST request using axios inside useEffect React hook
    useEffect(() => {
        // If user has optimal selections, set suggestions to empty object
        // else, request the server for suggestions
        if ((
            props.activityBasicInfo.setting === "outdoors" &&
            props.distancing === "twelveFeetOrMore" &&
            props.speakingVolume === "notSpeaking" &&
            props.ownMask === "kn95Mask" &&
            props.othersMask.type === "kn95Mask"
        )){
            setSuggestionsObject({});
        }
        else {
            axios.post('https://covidaware.ischool.uw.edu/recommendations', surveyData)
            .then(response => {
                console.log(response.data);
                setSuggestionsObject(response.data);
            })
            .catch(error => {
                console.log(error)

                // If client made connection to server
                // error is most likely our fault
                if (error.response) {
                    setSuggestionsObject("our-error")
                } else {
                    setSuggestionsObject("user-error");
                }
            });
        }
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

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
            <SuggestionForm suggestions={suggestionObject} submitCallback={submitCallback} />
        </div>
    )
}

// Suggestions form renders a list of checkboxes, one for each suggestion
// If the suggestions object is empty, it renders the 'congrats' screen
// If the suggestions object is null, it renders the fetching screen
// IF the suggestions object is "error" it renders error screen
function SuggestionForm (props) {


    // If suggestions is null, post request is still fetching
    if (props.suggestions === null || props.suggestions === undefined) {
        return (
            <div>
                <h1 className="risk-title">Tips to Lower Risk</h1>
                <h2 className="risk-subheading">Fetching suggestions, this should only take a few seconds</h2>
                <div className="loader-screen-content">
                    <Loader
                        type="TailSpin"
                        color="#4A7CE2"
                        height={100}
                        width={100}
                    />
                </div>
            </div>
        )
    }

    // If our error, suggest refreshing and apologize
    if (props.suggestions === "our-error") {
        return (
            <div className="alert alert-warning">
                <p className="error-text">Something went wrong while fetching suggestions</p>
                <p className="error-text">Try refreshing the page and seeing if the error is fixed</p>
                <p className="error-text">We apologize for the inconvenience</p>
            </div>        
        )
    }

    // If their error, suggest checking connection
    if (props.suggestions === "user-error") {
        return (
            <div className="alert alert-warning">
                <p className="error-text">Something went wrong while fetching suggestions</p>
                <p className="error-text">Try checking your internet connection then refreshing the page</p>
            </div>        
        )
    }


    let suggestions = props.suggestions;

    // Maps each type of sugggestion to it's text rendering functions
    let suggestionsMap = {
        setting: {
            renderText: function() { return ("Move the activity outdoors") }
        },
        distancing: {
            renderText: function(distance) { return ("Keep " + strings[distance] + " of space between people") }
        },
        speakingVolume: {
            renderText: function(volume) { return ("Lower speaking volume to " + (strings[volume]).toLowerCase()) }
        },
        ownMask: { 
            renderText: function(mask) { return ("Wear a " + (strings[mask].toLowerCase())) }
        },
        othersMaskType: {
            renderText: function(mask) { return ("Ask others to wear a " + (strings[mask]).toLowerCase()) }
        }
    }

    let keysArray = Object.keys(suggestions);

    // If there are no more suggestions render a 'congrats' screen
    // with more info on safety
    if (keysArray.length === 0) {
        return (
            <div>
                <h1 className="risk-title">Great Job!</h1>
                <h2 className="risk-subheading">Your activity selections are already the <span className="green">safest choices</span></h2>
                <div className="congrats-screen-content">
                    <img className="celebration-img" src={celebrationImage} alt="people celebrating" />
                    <p className="">
                        If you want to further reduce your risk, be sure to wash your hands regularly, avoid touching your face, and disinfect surfaces
                    </p>
                    <p className="">
                        For more information on safe practices visit the <a href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html">CDC's prevention guide</a>
                    </p>
                </div>
            </div>
        )
    } 

    let list = keysArray.map((key) => {

        let value = suggestions[key];
        if (value === "") {
            return "";
        }

        let displayText = suggestionsMap[key]["renderText"](value);

        return(
            <li key={key} className="tips-list-item">
                <div className="form-check ">
                    <input className="form-check-input " type="checkbox" value={suggestions[key]} id={key} />
                    <label className="form-check-label" htmlFor={key}>
                        {displayText}
                    </label>
                </div>
            </li>
        );
    })

    return (
        <div>
            <h1 className="risk-title">Tips to Lower Risk</h1>
            <h2 className="risk-subheading">Check the suggestions you would like to implement:</h2>
            <div className="tips-container">
                <Form id="tips-form" onSubmit={props.submitCallback}>
                    <ul className="tips-list">
                        {list}
                    </ul>
                </Form>
            </div>
            <div className="horizontal-center">
                <button type="submit" form="tips-form" className="btn btn-primary lower-risk-btn">Lower my risk!</button>
            </div>
        </div>
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