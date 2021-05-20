import { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input, Form, Card, CardBody, Collapse, Tooltip } from 'reactstrap';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react';
import RangeSlider from 'react-bootstrap-range-slider';
import LocalizedStrings from 'react-localization';
import calculateRiskScore from './CalculateRiskScore.js';

import locationImage from '../images/space-search.svg';
import doctorsImage from '../images/doctors.svg'

// Distance images
import lessThanSixFeetImage from "../images/less-than-six-feet.svg"
import sixFeetImage from '../images/six-feet.svg';
import nineFeetImage from '../images/nine-feet.svg';
import moreThanNineFeetImage from '../images/more-than-nine-feet.svg';

// Speaking images
import speakingNormalImage from '../images/speaking-normal.svg';
import notSpeakingImage from '../images/not-speaking.svg'
import speakingLoudImage from '../images/speaking-loudly.svg'

// Activity preset images
import groceryShoppingImage from '../images/grocery-shopping.svg';
import goingToWorkImage from '../images/going-to-work.svg';
import takingTheBusImage from '../images/taking-the-bus.svg';
import indoorDiningImage from '../images/going-to-dinner.svg';
import partyImage from '../images/party.svg';
import barImage from '../images/going-to-bar.svg';

// Mask images
import noMaskImage from '../images/no-mask.svg'
import cottonMaskImage from '../images/cotton-mask.svg'
import surgicalMaskImage from '../images/surgical-mask.svg'
import kn95MaskImage from '../images/kn95-mask.svg'

import '../App.css';
import './Calculator.css';
import CountyList from './CountyList';

let strings = new LocalizedStrings({
    en:{
        indoors: "Indoors",
        outdoors: "Outdoors",
        lessThanSixFeet: "Less than 6 feet",
        sixFeet: "6 feet",
        nineFeet: "9 feet",
        twelveFeetOrMore: "12 feet or more",
        notSpeaking: "Not speaking",
        normalSpeaking: "Speaking normally",
        loudSpeaking: "Speaking loudly",
        cottonMask: "Cotton mask",
        surgicalMask: "Surgical mask",
        kn95Mask: "KN95 Mask",
        noMask: "No mask",
        cottonMaskInfo: "cotton mask",
        surgicalMaskInfo: "surgical mask",
        kn95MaskInfo: "KN95 Mask",
    }
});

export default function Calculator(props) {
    
    let startingPageNum = 1;
        
    if (props.location.fromResults) {
        // Start at last screen
        startingPageNum = 9;
    } else if (props.location.fromStartNewButton) {
        // Skip demographic pages
        startingPageNum = 4;
    } else if (props.surveyCompleted) {
        // Skip disclaimer
        startingPageNum = 2;
    }

    const [pageNum, setPageNum] = useState(startingPageNum);
    const [usingPreset, setUsingPreset] = useState(false);

    // Calculator selections are stored in the calculator state before being
    // updated to the App state in case the user quits mid survey
    const [userLocationSelection, setUserLocationSelection] = useState(props.userLocation);
	const [vaccinationSelection, setVaccinationSelection] = useState(props.vaccination);
	const [activityBasicInfoSelection, setActivityBasicInfoSelection] = useState(props.activityBasicInfo);
	const [distancingSelection, setDistancingSelection] = useState(props.distancing);
	const [speakingVolumeSelection, setSpeakingVolumeSelection] = useState(props.speakingVolume);
	const [ownMaskSelection, setOwnMaskSelection] = useState(props.ownMask);
	const [othersMaskSelection, setOthersMaskSelection] = useState(props.othersMask);

	const [personRisk, setPersonRisk] = useState(props.personRisk);

    let pageScreen = <div></div>;
    let paginationDots =  (
        <div className="calc-dots-container">
            <PaginationDots activeNumber={pageNum} />
        </div>
    )

    const handleNextClick = () => {
        setPageNum(pageNum + 1);
    }

    const handleBackClick = () => {
        setPageNum(pageNum - 1);
    }

    // State code is handled separate from whole location so the county list can re-render
    const handleStateCodeChange = (event) => {
        setUserLocationSelection({stateCode: event.target.value, county: userLocationSelection.county});
    }

    // Update location selections and send request to backend for county level covid rates
    const handleLocationPageSubmit = (event) => {
        event.preventDefault();
        setUserLocationSelection({
            stateCode: event.target.state.value,
            county: event.target.county.value
        });

        let requestData = {
            StateCode: event.target.state.value,
            County: event.target.county.value
        }

        // Fetch Covid rates for selected county
        axios.post('https://covidaware.ischool.uw.edu/retrieve_county_rates', requestData)
        .then(response => {
            console.log(response.data)
            // TODO: MULTIPLY BY REPORTED CASES ONCE WE FIND OUT WHICH NUMBER TO USE
            
            const startDate = moment("02-12-2020", "MM-DD-YYYY");
            const today = moment();
        
            const daysSince = today.diff(startDate, "days");

            let positiveTestRate = response.data.posTestRate;

            let underReportingFactor = 1000 / (daysSince + 10) * (positiveTestRate ** 0.5) + 2;

            let personRisk = /* REPORTED CASES times */ underReportingFactor * response.data.delayPopQuotient;
            
            setPersonRisk(personRisk);
        })
        .catch(error => console.log(error));

        handleNextClick();
    }

    // The vaccine selection is handled separate from the vaccine page submission
    // so the dose number form will re-render based on the selection
    const handleVaccineTypeChange = (event) => {
        setVaccinationSelection({
            type: event.target.value,
            doseNumber: vaccinationSelection.doseNumber,
            twoWeeks: vaccinationSelection.twoWeeks 
        });
    }

    // Determine how effective dose number based on twoWeeks variable, and update selection
    const handleVaccinePageSubmit = (event) => {
        event.preventDefault();

        // If no vaccine was selected, the form will not have rendered all components, so this check
        // prevents refrencing a null variable
        if (event.target.vaccine.value === "none") {
            setVaccinationSelection({
                type: "none",
                doseNumber: 0,
                effectiveDoseNumber: 0,
                twoWeeks: null
            });
        }else {
            let twoWeeks = event.target.weeks.value;

            let doseNumber = 0;
            let effectiveDoseNumber = 1;
            
            // If J&J was selected use defaults, if not check the selections
            if (event.target.vaccine.value !== "johnsonAndJohnson") {
                doseNumber = event.target.doses.value;
                effectiveDoseNumber = event.target.doses.value;
            }

            // If it hasn't been two weeks since the last dose, don't count it
            if (twoWeeks === "no") {
                effectiveDoseNumber--;
            }
            
            setVaccinationSelection({ 
                type: event.target.vaccine.value,
                doseNumber: doseNumber,
                effectiveDoseNumber: effectiveDoseNumber,
                twoWeeks: twoWeeks
            });

        }
        handleNextClick();
    }
    
    const handlePresetActivityState = (presetUsed) => {
        setUsingPreset(presetUsed);
    }

    const updateSelectionsWithPreset = (preset) => {
		setActivityBasicInfoSelection(preset.activityBasicInfo);
		setDistancingSelection(preset.distancing);
		setSpeakingVolumeSelection(preset.volume);
		setOwnMaskSelection(preset.ownMask);
		setOthersMaskSelection(preset.othersMask);
	}

    const handleActivityPageSubmit = (setting, attendees, hours, minutes) => {
		setActivityBasicInfoSelection({
			setting: setting,
			attendees: attendees,
			hours: hours,
			minutes: minutes
		});
        // Set othersMask.numWearers equivalent to attendees so it can't be null later
        setOthersMaskSelection({ type: othersMaskSelection.type, numWearers: attendees });

        handleNextClick();
    }

    const updateDistancingSelection = (distance) => {
		setDistancingSelection(distance);
	}

	const updateSpeakingVolumeSelection = (volume) => {
		setSpeakingVolumeSelection(volume);
	}

	const updateOwnMaskSelection = (maskType) => {
		setOwnMaskSelection(maskType);
	}

	const updateOthersMaskTypeSelection = (maskType) => {
		setOthersMaskSelection({ type: maskType, numWearers: othersMaskSelection.numWearers });
	}

    const updateOthersMaskNumWearers = (num) => {
        setOthersMaskSelection({ type: othersMaskSelection.type, numWearers: num })
    }

    // Call completeSurvey
    const handleOthersMaskPageSubmit = (event) => {
        event.preventDefault();
        completeSurvey();
    }
    
    // Create userID if new user, set surveyComplete
    // Update app level state, post survey to backend,
    // navigate to results screen
    const completeSurvey = () => {
        let userID = props.userID;

        // If first time user
        if (userID === null) {
            // Generate new user Id
            userID = (Math.random() * 100000000000000);
            props.updateUserID(userID);
        }

        // Update app state with completed survey and retrieved person risk
        props.updateAllSelections(
            userLocationSelection,
            vaccinationSelection,
            activityBasicInfoSelection,
            distancingSelection,
            speakingVolumeSelection,
            ownMaskSelection,
            othersMaskSelection
        );

        props.updatePersonRisk(personRisk);

        console.log("User selections and pesronRisk", {
            userLocation: userLocationSelection,
            vaccination: vaccinationSelection,
            activityBasicInfo: activityBasicInfoSelection,
            distancing: distancingSelection,
            speakingVolume: speakingVolumeSelection,
            ownMask: ownMaskSelection,
            othersMask: othersMaskSelection,
            personRisk: personRisk
        }
        )

        // Calculate and update risk score with completed survey
        let riskScore = calculateRiskScore({            
            userLocation: userLocationSelection,
            vaccination: vaccinationSelection,
            activityBasicInfo: activityBasicInfoSelection,
            distancing: distancingSelection,
            speakingVolume: speakingVolumeSelection,
            ownMask: ownMaskSelection,
            othersMask: othersMaskSelection,
            personRisk: personRisk
        });

        props.updateRiskScore(riskScore);
        
        props.updateSurveryCompleted(true);
        

        // Convert dose numbers to string for backend
        let vaxData = vaccinationSelection;
        vaxData.doseNumber = toString(vaxData.doseNumber);
        vaxData.effectiveDoseNumber = toString(vaxData.effectiveDoseNumber);
        console.log(vaxData);

        let requestData = {
            userID: userID,
            userLocation: userLocationSelection,
            vaccination: vaxData,
            activityBasicInfo: activityBasicInfoSelection,
            distancing: distancingSelection,
            speakingVolume: speakingVolumeSelection,
            ownMask: ownMaskSelection,
            othersMask: othersMaskSelection,
            riskScore: riskScore,
            surveyCompleted: true
        }

        axios.post('https://covidaware.ischool.uw.edu/insert_survey', requestData)
        .then(response => console.log(response))
        .catch(error => console.log(error));

        props.history.push({
            pathname: '/results',
            fromCalculator: true
        });
    }

    switch (pageNum) {
        case 1:
            pageScreen = <DisclaimerPage nextClickCallback={handleNextClick} />;
            paginationDots = <div></div>;
            break;
        case 2:
            pageScreen = <LocationPage 
                nextClickCallback={handleNextClick} 
                backClickCallback={handleBackClick}
                stateSelectionCallback={handleStateCodeChange} 
                submitCallback={handleLocationPageSubmit}
                selection={userLocationSelection} 
            />;
            break;
        case 3:
            pageScreen = <VaccinePage
                backClickCallback={handleBackClick}
                submitCallback={handleVaccinePageSubmit}
                vaccineTypeCallback={handleVaccineTypeChange}
                selection={vaccinationSelection}
            />;
            break;
        case 4:
            pageScreen = <PresetPage 
                nextClickCallback={handleNextClick} 
                backClickCallback={handleBackClick}
                fillWithPresetCallback={updateSelectionsWithPreset}
                updatePresetUsedCallback={handlePresetActivityState}
            />;
            break;
        case 5:
            pageScreen = <ActivityPage
                backClickCallback={handleBackClick}
                setting={activityBasicInfoSelection.setting}
                attendees={activityBasicInfoSelection.attendees}
                hours={activityBasicInfoSelection.hours}
                minutes={activityBasicInfoSelection.minutes}
                usingPreset={usingPreset}
                submitCallback={handleActivityPageSubmit}
            />;
            break;
        case 6:
            pageScreen = <SocialDistancePage 
                backClickCallback={handleBackClick}
                nextClickCallback={handleNextClick}
                selectionCallback={updateDistancingSelection} 
                selection={distancingSelection} 
            />;
            break;
        case 7:
            pageScreen = <TalkingPage 
                backClickCallback={handleBackClick}
                nextClickCallback={handleNextClick}
                selectionCallback={updateSpeakingVolumeSelection} 
                selection={speakingVolumeSelection} 
            />;
            break;
        case 8:
            pageScreen = <OwnMaskPage 
                nextClickCallback={handleNextClick} 
                backClickCallback={handleBackClick}
                selectionCallback={updateOwnMaskSelection} 
                selection={ownMaskSelection} 
            />;
            break;
        case 9:
            pageScreen = <OthersMaskPage 
                backClickCallback={handleBackClick}
                selectionCallback={updateOthersMaskTypeSelection} 
                selection={othersMaskSelection.type}
                formSubmitCallback={handleOthersMaskPageSubmit} 
                numWearers={othersMaskSelection.numWearers}
                numWearersCallback={updateOthersMaskNumWearers}
                attendees={activityBasicInfoSelection.attendees}
            />;
            break;
        default:
            pageScreen = <DisclaimerPage nextClickCallback={handleNextClick} />;
    }

    return (
        <div className="calc-outer">
            <div className="calc-main-container">
                {paginationDots}
                {pageScreen}
            </div>            
        </div>
    );
}

function DisclaimerPage(props) {

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [buttonColor, setButtonColor] = useState("secondary");

    const handleCheckbox = () => {
        if(buttonDisabled){ 
            // If button is currently disabled, set new color to blue (enabled)
            setButtonColor("primary");
        } else {
            setButtonColor("secondary");
        }
        setButtonDisabled(!buttonDisabled);
    }

    return (
        <div>
            <div className="disclaimer-container">
                <h1 className="disclaimer-title">Agreement & Regulations</h1>
                <div className="disclaimer-body-container">
                    <p className="disclaimer-body">
                        CovidAware has been designed specifically for use in the United States.
                    </p>
                    <p className="disclaimer-body">
                        Be aware that the information provided by this tool
                        <span className="red"> IS NOT a replacement for medical advice and cannot be used to diagnose or treat medical conditions. </span>
                        If you would like more information regarding this, please visit our <Link to="/about">FAQ</Link>
                    </p>
                    <p className="disclaimer-body">
                        The COVID-19 related data utilized in this app is updated weekly:
                    </p>
                    <p className="disclaimer-body last-update-date">
                        Last updated: <span className="blue">Mar 11, 2021</span>
                    </p>
                </div>
            </div>
            <div className="checkbox-container horizontal-center">
                <FormGroup check>
                    <Label check className="checkbox-text">
                        <Input type="checkbox" onChange={handleCheckbox} />{' '}
                        I have read the agreement and understand that this risk calculator is an estimate and is not a substitution for medical advice.
                    </Label>
                </FormGroup>
            </div>
            <div  className="calc-risk-btn-container horizontal-center">
                <Button color={buttonColor} className="horizontal-center" disabled={buttonDisabled} onClick={props.nextClickCallback}>
                    Calculate my risk!
                </Button>
            </div>
            <div>
                <Link to="/FAQ" className="horizontal-center learn-more-link">
                    Learn about the calculations
                </Link>
            </div>
        </div>
    );
}

function LocationPage(props) {

    return (
        <div className="calc-step-container">
            <h1 className="calc-step-title">Your location</h1>
            <h2 className="calc-step-desc">
                Fill in the <span className="blue">state and county </span> where you have spent the most time during the <span className="blue">past two weeks</span>
            </h2>
            <Form id="location-form" onSubmit={props.submitCallback}>
                <FormGroup tag="fieldset">
                    <Label>State:</Label>
                        <Input type="select" name="state" className="w-auto" defaultValue={props.selection.stateCode} onChange={props.stateSelectionCallback}>
                            <option value="AL">AL</option>
                            <option value="AK">AK</option>
                            <option value="AZ">AZ</option>
                            <option value="AR">AR</option>
                            <option value="CA">CA</option>
                            <option value="CO">CO</option>
                            <option value="CT">CT</option>
                            <option value="DE">DE</option>
                            <option value="DC">DC</option>
                            <option value="FL">FL</option>
                            <option value="GA">GA</option>
                            <option value="HI">HI</option>
                            <option value="ID">ID</option>
                            <option value="IL">IL</option>
                            <option value="IN">IN</option>
                            <option value="IA">IA</option>
                            <option value="KS">KS</option>
                            <option value="KY">KY</option>
                            <option value="LA">LA</option>
                            <option value="ME">ME</option>
                            <option value="MD">MD</option>
                            <option value="MA">MA</option>
                            <option value="MI">MI</option>
                            <option value="MN">MN</option>
                            <option value="MS">MS</option>
                            <option value="MO">MO</option>
                            <option value="MT">MT</option>
                            <option value="NE">NE</option>
                            <option value="NV">NV</option>
                            <option value="NH">NH</option>
                            <option value="NJ">NJ</option>
                            <option value="NM">NM</option>
                            <option value="NY">NY</option>
                            <option value="NC">NC</option>
                            <option value="ND">ND</option>
                            <option value="OH">OH</option>
                            <option value="OK">OK</option>
                            <option value="OR">OR</option>
                            <option value="PA">PA</option>
                            <option value="PR">PR</option>
                            <option value="RI">RI</option>
                            <option value="SC">SC</option>
                            <option value="SD">SD</option>
                            <option value="TN">TN</option>
                            <option value="TX">TX</option>
                            <option value="UT">UT</option>
                            <option value="VT">VT</option>
                            <option value="VA">VA</option>
                            <option value="WA">WA</option>
                            <option value="WV">WV</option>
                            <option value="WI">WI</option>
                            <option value="WY">WY</option>
                        </Input>
                </FormGroup>
                <FormGroup tag="fieldset">
                    <Label>County:</Label>
                        <CountyList stateCode={props.selection.stateCode} selection={props.selection.county} />
                </FormGroup>
            </Form>
            <img className="calc-img" src={locationImage} alt="Illustration of two doctors" />

            <div className="calc-nav-controls">
                <div className="prev-next-btns">
                    <button className="btn prev-btn" onClick={props.backClickCallback} aria-label="Previous step">
                        <ChevronLeftIcon size={48} fill="#4A7CE2" />
                    </button>
                    <button type="submit" form="location-form" className="btn next-btn" aria-label="Next step">
                        <ChevronRightIcon size={48} fill="#4A7CE2" />
                    </button>
                </div>
            </div>
        </div>
    );

}

function VaccinePage(props) {

    let yesChecked = false;
    let noChecked = false;

    if (props.selection.twoWeeks === "yes") {
        yesChecked = true;
    } else if (props.selection.twoWeeks === "no") {
        noChecked = true;
    }

    // Render dose form only if the user has selected that they have been vaccinated
    let doseForm = <div></div>;
    if (props.selection.type !== "none") {

        // Don't render doseNumberInput if user selected J&J (1 dose vaccine)
        let doseNumberInput = <div></div>;
        if (props.selection.type !== "johnsonAndJohnson"){
            doseNumberInput = (
                <FormGroup tag="fieldset">
                    <Label>How many doses have you received? </Label>
                    <Input type="select" name="doses" className="w-auto" defaultValue={props.selection.doseNumber}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </Input>
                </FormGroup>
            );
        }

        doseForm = (
            <div>
                {doseNumberInput}
                <FormGroup tag="fieldset">
                    <legend>Has it been two weeks since your last dose?</legend>
                    <FormGroup check required>
                        <Label>
                            <Input required type="radio" name="weeks" value="yes" defaultChecked={yesChecked}
                            />{' '}
                    Yes
                </Label>
                    </FormGroup>
                    <FormGroup check required>
                        <Label>
                            <Input required type="radio" name="weeks" value="no" defaultChecked={noChecked}
                            />{' '}
                    No
                </Label>
                    </FormGroup>
                </FormGroup>
            </div>
        );
    }
    
    
    return (
        <div className="calc-step-container">
            <h1 className="calc-step-title">What is your vaccination status?</h1>
            <h2 className="calc-step-desc">The COVID-19 vaccine drastically reduces your chance of catching and spreading the virus</h2>
            <img className="calc-img" src={doctorsImage} alt="Illustration of two doctors" />
            <Form id="vaccine-form" onSubmit={props.submitCallback}>
                <FormGroup tag="fieldset">
                    <Label>Have you received a COVID-19 vaccine? If so, which type?</Label>
                        <Input type="select" name="vaccine" className="w-auto" defaultValue={props.selection.type} onChange={props.vaccineTypeCallback}>
                            <option value="none">No</option>
                            <option value="pfizer">Yes - Pfizer</option>
                            <option value="moderna">Yes - Moderna</option>
                            <option value="johnsonAndJohnson">Yes - Johnson & Johnson</option>
                            <option value="astrazeneca">Yes - Astrazeneca</option>
                            <option value="other">Yes - Other</option>
                        </Input>
                </FormGroup>
                {doseForm}
            </Form>
            
            <div className="calc-nav-controls">
                <div className="prev-next-btns">
                    <button className="btn prev-btn" onClick={props.backClickCallback} aria-label="Previous step">
                        <ChevronLeftIcon size={48} fill="#4A7CE2" />
                    </button>
                    <button type="submit" form="vaccine-form" className="btn next-btn" aria-label="Next step">
                        <ChevronRightIcon size={48} fill="#4A7CE2" />
                    </button>
                </div>
            </div>
            
        </div>
    );
}

function PresetPage(props) {

    const presets = {
        "empty-activity": {
            activityBasicInfo: { setting: "none-selected", attendees: null, hours: null,  minutes: null },
            distancing: "none-selected",
            volume: "none-selected",
            ownMask: "none-selected",
            othersMask: { type: "none-selected", numWearers: null }
        },

        "groceryShopping": {
            activityBasicInfo: { setting: "indoors", attendees: 5, hours: 1,  minutes: 0 },
            distancing: "sixFeet",
            volume: "normalSpeaking",
            ownMask: "cotton-mask",
            othersMask: { type: "cottonMask", numWearers: null }
        },

        "goingToWork": {
            activityBasicInfo: { setting: "indoors", attendees: null, hours: null,  minutes: null },
            distancing: "sixFeet",
            volume: "normalSpeaking",
            ownMask: "none-selected",
            othersMask: { type: "none-selected", numWearers: null }
        },

        "goingToAParty": {
            activityBasicInfo: { setting: "indoors", attendees: null, hours: null,  minutes: null },
            distancing: "lessThanSixFeet",
            volume: "loudSpeaking",
            ownMask: "none-selected",
            othersMask: { type: "none-selected", numWearers: null }
        },

        "takingTheBus": {
            activityBasicInfo: { setting: "indoors", attendees: 15, hours: null,  minutes: null },
            distancing: "sixFeet",
            volume: "notSpeaking",
            ownMask: "cotton-mask",
            othersMask: { type: "cotton-mask", numWearers: 15 }
        },

        "indoorDining": {
            activityBasicInfo: { setting: "indoors", attendees: null, hours: 1,  minutes: 0 },
            distancing: "lessThanSixFeet",
            volume: "normalSpeaking",
            ownMask: "noMask",
            othersMask: { type: "noMask", numWearers: null }
        },

        "goingToABar": {
            activityBasicInfo: { setting: "indoors", attendees: null, hours: 1,  minutes: 0 },
            distancing: "lessThanSixFeet",
            volume: "normalSpeaking",
            ownMask: "noMask",
            othersMask: { type: "noMask", numWearers: null }
        },        
    }

    // Checks if the preset buttons description matches one of the preset objects and fills it in
    // If it doesn't it proceeds as if no preset was entered for safety, but this should never happen anyway
    const fillSurvey = (desc) => {
        if (presets.hasOwnProperty(desc)) {
            props.fillWithPresetCallback(presets[desc]);
            props.updatePresetUsedCallback(true);
        }
        props.nextClickCallback();
    }

    const buildOwnActivity = () => {
        props.updatePresetUsedCallback(false);
        props.fillWithPresetCallback(presets["empty-activity"])
        props.nextClickCallback();
    }

    return (
        <div className="calc-step-container">
            <h1 className="calc-step-title">What social activity are you planning to do?</h1>
            <h2 className="calc-step-desc">Select an activity <span className="blue">or </span> build your own</h2>

            <div className="container">
                <div className="row img-btn-row">
                    <div className="col-4 d-flex justify-content-center">
                        <ImageButton image={groceryShoppingImage} value="groceryShopping" desc={"Grocery Shopping"} alt="Person grocery shopping" clickCallback={fillSurvey}/>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <ImageButton image={goingToWorkImage} value="goingToWork" desc={"Working at an Office"} alt="Person in a suit walking" clickCallback={fillSurvey}/>
                     </div>
                    <div className="col-4 d-flex justify-content-center">
                        <ImageButton image={partyImage} value="goingToAParty" desc={"Going to a Party"} alt="Group of people doing a toast" clickCallback={fillSurvey}/>
                    </div>
                </div>
                <div className="row img-btn-row">
                    <div className="col-4 d-flex justify-content-center">
                        <ImageButton image={takingTheBusImage} value="takingTheBus" desc={"Taking the Bus"} alt="Person riding a bus" clickCallback={fillSurvey}/>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <ImageButton image={indoorDiningImage} value="indoorDining" desc={"Indoor Dining"} alt="Two people at a restaurant table" clickCallback={fillSurvey}/>
                     </div>
                    <div className="col-4 d-flex justify-content-center">
                        <ImageButton image={barImage} value="goingToABar" desc={"Going to a Bar"} alt="Person at a bar" clickCallback={fillSurvey}/>
                    </div>
                </div>
            </div>

            <h2 className="calc-subtext">Didn’t see an activity you want?</h2>
            <div className="horizontal-center build-own-btn">
                <Button color="outline-primary" onClick={buildOwnActivity}>Build my own activity!</Button>
            </div>
            <div className="calc-nav-controls">
                <div className="prev-next-btns">
                    <button className="btn prev-btn" onClick={props.backClickCallback} aria-label="Previous step">
                        <ChevronLeftIcon size={48} fill="#4A7CE2" />
                    </button>
                    <button className="btn next-btn" onClick={buildOwnActivity} aria-label="Next step">
                        <ChevronRightIcon size={48} fill="#4A7CE2" />
                    </button>
                </div>
            </div>
        </div>
    );

}

function ActivityPage(props) {

    let indoorsChecked = false;
    let outdoorsChecked = false;

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [zeroAttendees, setZeroAttendees] = useState(false);

    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
    let toolTip = ""

    const attendeesHandler = (event) => {
        if (event.target.value === "0" || event.target.value === 0) {
            setZeroAttendees(true);
        } else {
            setZeroAttendees(false);
        }
    }

    if (zeroAttendees) {
        toolTip = (
            <Tooltip placement="bottom" isOpen={true} target="attendees" toggle={toggleTooltip}>
            If you are interacting with zero other people, then the activity poses no risk
            </Tooltip>
        );
    }




    if (props.setting === "indoors") {
        indoorsChecked = true;
    } else if (props.setting === "outdoors") {
        outdoorsChecked = true;
    }


    let subHeader = (
        <h2 className="calc-step-desc">Calculate the risk for your planned social activity</h2>
    );

    if(props.usingPreset) {
        subHeader = (
        <h2 className="preset-text">
            Calculator choices have been auto-filled based on your chosen activity
        </h2>
        );
    }

    const [durationError, setDurationError] = useState("");

    const verifyAndSubmitForm = (event) => {
        event.preventDefault();
        let hours = event.target.hours.value;
        let minutes = event.target.minutes.value;

        if (hours + minutes <= 0) {
            setDurationError(<h2 className="duration-error">Error: Estimated duration must be greater than zero</h2>);
        } else {
            props.submitCallback(
                event.target.setting.value,
                event.target.attendees.value,
                hours,
                minutes
            );
        }
    }

    return (
        <div className="calc-step-container">
            <h1 className="calc-step-title">Basic information</h1>
            {subHeader}
            <Form id="activity-form" onSubmit={verifyAndSubmitForm}>
                <FormGroup tag="fieldset">
                    <legend>Where will the activity be held?</legend>
                    <FormGroup check required>
                        <Label>
                            <Input required type="radio" name="setting" value="indoors" defaultChecked={indoorsChecked}/>{' '}
                            Indoors
                        </Label>
                    </FormGroup>
                    <FormGroup check required>
                        <Label>
                            <Input required type="radio" name="setting" value="outdoors" defaultChecked={outdoorsChecked}/>{' '}
                            Outdoors
                        </Label>
                    </FormGroup>
                </FormGroup>
                <FormGroup tag="fieldset">
                    <legend>How many other people will attend?</legend>
                    <p>Include anybody who you might come within 15 feet of</p>
                    <Input required type="number" name="attendees" id="attendees" min="1" className="w-auto"
                        defaultValue={props.attendees} onChange={attendeesHandler} />
                    {toolTip}
                </FormGroup> 
                <FormGroup tag="fieldset" className="form-inline">
                    <legend>Estimated duration:</legend>
                    <Label>Hours
                        <Input required type="number" name="hours" id="hours" min="0" max="24" className="w-auto" defaultValue={props.hours} />
                    </Label>
                    <Label>Minutes
                        <Input required type="number" name="minutes" id="minutes" min="0" max="59" className="w-auto"
                            defaultValue={props.minutes} />
                    </Label>
                </FormGroup>
            </Form>
            {durationError}
            <div className="calc-nav-controls">
                <div className="prev-next-btns">
                    <button className="btn prev-btn" onClick={props.backClickCallback} aria-label="Previous step">
                        <ChevronLeftIcon size={48} fill="#4A7CE2" />
                    </button>
                    <button form="activity-form" type="submit" className="btn next-btn" aria-label="Next step">
                        <ChevronRightIcon size={48} fill="#4A7CE2" />
                    </button>
                </div>
            </div>
        </div>
    );

}

function SocialDistancePage(props) {

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    let toolTip = <div></div>
    let nextButtonDisabled = false

    let lessThanSixSelected = false;
    let sixSelected = false;
    let nineSelected = false;
    let moreThanNineSelected =false;

    switch(props.selection) {
        case "lessThanSixFeet":
            lessThanSixSelected = true;
            break;
        case "sixFeet":
            sixSelected = true;
            break;
        case "nineFeet":
            nineSelected = true;
            break;
        case "twelveFeetOrMore":
            moreThanNineSelected = true;
            break;
        case "none-selected":
            toolTip = (
                <Tooltip placement="top" isOpen={tooltipOpen} target="distance-next-btn" toggle={toggle}>
                    Please select a distance from the buttons above
                </Tooltip>
            )
            nextButtonDisabled = true;
            break;
        default:
            toolTip = (
                <Tooltip placement="top" isOpen={tooltipOpen} target="distance-next-btn" toggle={toggle}>
                    Please select a distance from the buttons above
                </Tooltip>
            )
            nextButtonDisabled = true;    
        }

    return (
        <div className="calc-step-container">
            <h1 className="calc-step-title">Physical Distancing</h1>
            <h2 className="calc-step-desc">Maintain a safe distance between yourself and other people who are not from your household</h2>
            <h2 className="calc-step-question">What is the distance between you and others during the activity?</h2>

            <div className="container">
                <div className="row img-btn-row">
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={lessThanSixFeetImage} value="lessThanSixFeet" desc="Less than 6 feet" alt="Cartoon of bed with a six foot label" large selected={lessThanSixSelected} clickCallback={props.selectionCallback}/>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={sixFeetImage} value="sixFeet" desc="6 feet" alt="Cartoon of bed with a six foot label" large selected={sixSelected} clickCallback={props.selectionCallback}/>
                    </div>
                </div>
                <div className="row img-btn-row">
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={nineFeetImage} value="nineFeet" desc="9 feet" alt="Cartoon of bed with a six foot label" large selected={nineSelected} clickCallback={props.selectionCallback}/>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={moreThanNineFeetImage} value="twelveFeetOrMore" desc="12 feet or more" alt="Cartoon of bed with a six foot label" large selected={moreThanNineSelected} clickCallback={props.selectionCallback} />
                    </div>
                </div>
            </div>

            <div className="calc-nav-controls">
                <div className="prev-next-btns">
                    <button className="btn prev-btn" onClick={props.backClickCallback} aria-label="Previous step">
                        <ChevronLeftIcon size={48} fill="#4A7CE2" />
                    </button>
                    <div id="distance-next-btn" tabIndex="0">
                        <button className="btn next-btn" onClick={props.nextClickCallback} aria-label="Next step"
                        disabled={nextButtonDisabled} >
                            <ChevronRightIcon size={48} fill="#4A7CE2" />
                        </button>
                        {toolTip}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TalkingPage(props) {

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    let toolTip = <div></div>
    let nextButtonDisabled = false

    let notSpeakingSelected = false;
    let normalSpeakingSelected = false;
    let loudSpeakingSelected = false;

    switch(props.selection) {
        case "notSpeaking":
            notSpeakingSelected = true;
            break;
        case "normalSpeaking":
            normalSpeakingSelected = true;
            break;
        case "loudSpeaking":
            loudSpeakingSelected = true;
            break;
        case "none-selected":
            toolTip = (
                <Tooltip placement="top" isOpen={tooltipOpen} target="talking-next-btn" toggle={toggle}>
                    Please select a volume from the buttons above
                </Tooltip>
            )
            nextButtonDisabled = true;
            break;
        default:
            toolTip = (
                <Tooltip placement="top" isOpen={tooltipOpen} target="talking-next-btn" toggle={toggle}>
                    Please select a volume from the buttons above
                </Tooltip>
            )
            nextButtonDisabled = true;    
        }

    return (
        <div className="calc-step-container">
            <h1 className="calc-step-title">Speaking volume</h1>
            <h2 className="calc-step-desc">Risk is also calculated based on <span className="blue">movement of air </span>particles through <span className="blue">speaking</span></h2>
            <h2 className="calc-step-question">How loud will people be speaking during the activity?</h2>

            <div className="container">
                <div className="row img-btn-row">
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={notSpeakingImage} value="notSpeaking" desc="Not speaking" alt="Two people outdoors speaking" large selected={notSpeakingSelected} clickCallback={props.selectionCallback}/>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={speakingNormalImage} value="normalSpeaking" desc="Speaking normally" alt="Two people outdoors speaking" large selected={normalSpeakingSelected} clickCallback={props.selectionCallback}/>
                    </div>
                </div>
                <div className="row img-btn-row">
                    <div className="col-12 d-flex justify-content-center">
                        <ImageButton image={speakingLoudImage} value="loudSpeaking" desc="Speaking loudly or shouting" alt="Two people outdoors speaking" large selected={loudSpeakingSelected} clickCallback={props.selectionCallback}/>
                    </div>
                </div>
            </div>

            <div className="calc-nav-controls">
                <div className="prev-next-btns">
                    <button className="btn prev-btn" onClick={props.backClickCallback} aria-label="Previous step">
                        <ChevronLeftIcon size={48} fill="#4A7CE2" />
                    </button>
                    <div id="talking-next-btn" tabIndex="0">
                        <button className="btn next-btn" onClick={props.nextClickCallback} aria-label="Next step"
                        disabled={nextButtonDisabled} >
                            <ChevronRightIcon size={48} fill="#4A7CE2" />
                        </button>
                        {toolTip}
                    </div>
                </div>
            </div>
        </div>
    );

}

function OwnMaskPage(props) {

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

    let toolTip = <div></div>
    let nextButtonDisabled = false

    const [infoIsOpen, setInfoIsOpen] = useState(false);

    const toggleInfo = () => setInfoIsOpen(!infoIsOpen);

    let noMaskSelected = false;
    let cottonMaskSelected = false;
    let surgicalMaskSelected = false;
    let kn95MaskSelected = false;

    let maskInfo = "N/A";

    switch(props.selection) {
        case "noMask":
            noMaskSelected = true;
            maskInfo = "N/A";
            break;
        case "cottonMask":
            cottonMaskSelected = true;
            maskInfo = "The filtration effectiveness of cloth masks is generally lower than that of medical masks and respirators; however, cloth masks may provide some protection if well designed and used correctly."
            break;
        case "surgicalMask":
            surgicalMaskSelected = true;
            maskInfo = "Fluid resistant and provides the wearer protection against large droplets or sprays of bodily fluids. Protects others from the wearer’s respiratory emissions."
            break;
        case "kn95Mask":
            kn95MaskSelected= true;
            maskInfo = "Reduces wearer’s exposure to particles including small particle aerosols and large droplets. Protects others from the wearer’s respiratory emissions."
            break;
        case "none-selected":
            toolTip = (
                <Tooltip placement="top" isOpen={tooltipOpen} target="own-mask-next-btn" toggle={toggleTooltip}>
                    Please select a mask from the buttons above
                </Tooltip>
            )
            nextButtonDisabled = true;
            break;
        default:
            toolTip = (
                <Tooltip placement="top" isOpen={tooltipOpen} target="own-mask-next-btn" toggle={toggleTooltip}>
                    Please select a mask from the buttons above
                </Tooltip>
            )
            nextButtonDisabled = true;    
        }

    let dropdownClass = "";

    if (noMaskSelected || props.selection === "none-selected") {
        dropdownClass = "hidden";
    }

    return (
        <div className="calc-step-container">
            <h1 className="calc-step-title">Your mask</h1>
            <h2 className="calc-step-desc">Different types of face masks have different levels of effectiveness in catching droplets from talking, sneezing, or coughing</h2>
            <h2 className="calc-subtext">What type of mask will you wear?</h2>
            <div className="container">
                <div className="row img-btn-row">
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={noMaskImage} value="noMask" desc="No Mask" alt="Person with no mask" large selected={noMaskSelected} clickCallback={props.selectionCallback}/>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={cottonMaskImage} value="cottonMask" desc="Cotton Mask" alt="Cotton mask" large selected={cottonMaskSelected} clickCallback={props.selectionCallback}/>
                    </div>
                </div>
                <div className="row img-btn-row">
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={surgicalMaskImage} value="surgicalMask" desc="Surgical Mask" alt="Surgical mask" large selected={surgicalMaskSelected} clickCallback={props.selectionCallback}/>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={kn95MaskImage} value="kn95Mask" desc="KN95 Mask" alt="KN95 mask" large selected={kn95MaskSelected} clickCallback={props.selectionCallback} />
                    </div>
                </div>
            </div>
            <div className={dropdownClass}>
                <div className="info-dropdown-btn">
                    <button className="btn btn-outline-secondary" onClick={toggleInfo}>
                        What is a {strings[props.selection +"Info"]}? {infoIsOpen
                        ? <ChevronUpIcon size={24} />
                        : <ChevronDownIcon size={24} />
                    }
                    </button>
                </div>
                <Collapse isOpen={infoIsOpen}>
                    <Card>
                        <CardBody>
                            {maskInfo}
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
            <div className="calc-nav-controls">
                <div className="prev-next-btns">
                    <button className="btn prev-btn" onClick={props.backClickCallback} aria-label="Previous step">
                        <ChevronLeftIcon size={48} fill="#4A7CE2" />
                    </button>
                    <div id="own-mask-next-btn" tabIndex="0">
                        <button className="btn next-btn" onClick={props.nextClickCallback} aria-label="Next step"
                        disabled={nextButtonDisabled} >
                            <ChevronRightIcon size={48} fill="#4A7CE2" />
                        </button>
                        {toolTip}
                    </div>
                </div>
            </div>
        </div>
    );

}

function OthersMaskPage(props) {

    const [sliderValue, setSliderValue ] = useState(parseInt(props.attendees)); 

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    let toolTip = <div></div>
    let nextButtonDisabled = false


    let noMaskSelected = false;
    let cottonMaskSelected = false;
    let surgicalMaskSelected = false;
    let kn95MaskSelected = false;

    switch(props.selection) {
        case "noMask":
            noMaskSelected = true;
            break;
        case "cottonMask":
            cottonMaskSelected = true;
            break;
        case "surgicalMask":
            surgicalMaskSelected = true;
            break;
        case "kn95Mask":
            kn95MaskSelected= true;
            break;
        case "none-selected":
            toolTip = (
                <Tooltip placement="top" isOpen={tooltipOpen} target="others-mask-next-btn" toggle={toggle}>
                    Please select a mask from the buttons above
                </Tooltip>
            )
            nextButtonDisabled = true;
            break;
        default:
            toolTip = (
                <Tooltip placement="top" isOpen={tooltipOpen} target="others-mask-next-btn" toggle={toggle}>
                    Please select a mask from the buttons above
                </Tooltip>
            )
            nextButtonDisabled = true;
        }

    return (
        <div className="calc-step-container">
            <h1 className="calc-step-title">What type of mask will others wear?</h1>
            <h2 className="calc-step-desc">Different types of face masks have different levels of effectiveness in catching droplets from talking, sneezing, or coughing</h2>
            
            <div className="container">
                <div className="row img-btn-row">
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={noMaskImage} value="noMask" desc="No Mask" alt="Person with no mask" large selected={noMaskSelected} clickCallback={props.selectionCallback}/>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={cottonMaskImage} value="cottonMask" desc="Cotton Mask" alt="Cotton mask" large selected={cottonMaskSelected} clickCallback={props.selectionCallback}/>
                    </div>
                </div>
                <div className="row img-btn-row">
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={surgicalMaskImage} value="surgicalMask" desc="Surgical Mask" alt="Surgical mask" large selected={surgicalMaskSelected} clickCallback={props.selectionCallback}/>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={kn95MaskImage} value="kn95Mask" desc="KN95 Mask" alt="KN95 mask" large selected={kn95MaskSelected} clickCallback={props.selectionCallback} />
                    </div>
                </div>
            </div>

            <Form className="others-mask-form" id="others-mask-form" onSubmit={props.formSubmitCallback}>            
                <FormGroup>
                    <Label>
                        Number of people wearing masks:
                        <Input required type="number" name="portion" id="portion" min="0" max={parseInt(props.attendees)} className="w-auto"
                            value={sliderValue} 
                            onChange={e => {
                                setSliderValue(e.target.value)
                                props.numWearersCallback(e.target.value)
                            }} />
                        <RangeSlider
                            value={sliderValue}
                            onChange={changeEvent => {
                                setSliderValue(changeEvent.target.value)
                                props.numWearersCallback(changeEvent.target.value)
                            }}
                            min={0}
                            max={parseInt(props.attendees)}
                        />
                    </Label>
                </FormGroup>
            </Form>
            
            <div className="calc-nav-controls">
                <div className="prev-next-btns">
                    <button className="btn prev-btn" onClick={props.backClickCallback} aria-label="Previous step">
                        <ChevronLeftIcon size={48} fill="#4A7CE2" />
                    </button>
                    <div id="others-mask-next-btn" tabIndex="0">

                        <button form="others-mask-form" type="submit" className="btn btn-primary next-btn" disabled={nextButtonDisabled}>
                            <div>
                            Get my risk score
                            </div>
                        </button>
                        {toolTip}
                    </div>
                </div>
            </div>
        </div>
    );

}

function ImageButton(props) {

    let btnClass = "img-btn";
    let contentClass = "img-btn-content";
    let containerClass = "img-btn-image-container";
    let imageClass = "img-btn-image";
    let textClass = "img-btn-text";

    if(props.large) {
        btnClass += " img-btn-large";
        contentClass = "img-btn-large-content";
        containerClass = "img-btn-large-image-container";
        imageClass = "img-btn-large-image";
        textClass = "img-btn-text-large";
    }

    if(props.selected) {
        btnClass += " img-btn-selected";
    }

    const handleClick = () => {
        props.clickCallback(props.value);
    } 

    return(
        <button className={btnClass} aria-pressed="false" onClick={handleClick}>
            <div className={contentClass}>
                <div className={containerClass}>
                    <img className={imageClass} src={props.image} alt={props.alt} />
                </div>
                <div className={textClass}>
                    {props.desc}
                </div>
            </div>
        </button>
    );
}

function PaginationDots(props) {

    let dotsArr = [2, 3, 4, 5, 6, 7, 8, 9];
    let dotsList = dotsArr.map((item) => {
        
        let dotClass = ""
        if (item <= props.activeNumber) {
            dotClass = "active"
        }
        return <li key={item} className={dotClass}></li>;
    })

    return (
        <ol className="calc-pagination-dots">
            {dotsList}
        </ol>
    );
}


