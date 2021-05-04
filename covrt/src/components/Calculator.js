import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input, Form, Card, CardBody, Collapse } from 'reactstrap';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react';
import RangeSlider from 'react-bootstrap-range-slider';
import ReactGA from 'react-ga';



import locationImage from '../images/space-search.svg';
import sixFeetImage from '../images/six-feet-bed.svg';
import speakingNormalImage from '../images/speaking-normal.svg';
import doctorsImage from '../images/doctors.svg'


// Activity preset images
import groceryShoppingImage from '../images/grocery-shopping.svg';
import goingToWorkImage from '../images/going-to-work.svg';
import visitingFriendImage from '../images/visiting-a-friend.svg';
import takingTheBusImage from '../images/taking-the-bus.svg';
import indoorDiningImage from '../images/going-to-dinner.svg';
import joggingImage from '../images/jogging.svg';
import partyImage from '../images/party.svg';
import outdoorGatheringImage from '../images/outdoor-gathering.svg'
import hikingImage from '../images/hiking.svg'

// Mask images
import noMaskImage from '../images/no-mask.svg'
import cottonMaskImage from '../images/cotton-mask.svg'
import surgicalMaskImage from '../images/surgical-mask.svg'
import kn95MaskImage from '../images/kn95-mask.svg'

import '../App.css';
import './Calculator.css';

export default function Calculator(props) {
    ReactGA.pageview(window.location.pathname + window.location.search);

    let startingPageNum = 1;
        
    // If user has navigated here by coming back from the results page
    // start them on the last screen of the calculator
    if (props.location.fromResults) {
        startingPageNum = 9;
    } else if (props.location.fromStartNewButton) {
        startingPageNum = 4;
    } else if (props.updateSurveryCompleted) {
        startingPageNum = 2;
    }

    const [pageNum, setPageNum] = useState(startingPageNum);

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

    const handleLocationPageSubmit = (event) => {
        event.preventDefault();
        console.log("Handler called")
        props.updateLocation(
            event.target.state.value,
            event.target.county.value
        );
        handleNextClick();
    }

    // The vaccine selection is handled separate from the vaccine page submission
    // so that the state will change and re-render the form based on vaccine type
    const handleVaccineTypeChange = (event) => {
        props.updateVaccineType(event.target.value);
    }

    const handleVaccinePageSubmit = (event) => {
        event.preventDefault();

        // If no vaccine was selected, the form will not have rendered all components, so this check
        // prevents refrencing a null variable
        if (event.target.vaccine.value === "None") {
            props.updateVaccination({ type: "None", doseNumber: 0, effectiveDoseNumber: 0, twoWeeks: null});
        }else {
            let twoWeeks = event.target.weeks.value;

            let doseNumber = 0;
            let effectiveDoseNumber = 1;
            
            // If J&J was selected use defaults, if not check the selections
            if (event.target.vaccine.value !== "J&J") {
                doseNumber = event.target.doses.value;
                effectiveDoseNumber = event.target.doses.value;
            }

            // If it hasn't been two weeks since the last dose, don't count it
            if (twoWeeks === "No") {
                effectiveDoseNumber--;
            }

            props.updateVaccination({ 
                type: event.target.vaccine.value,
                doseNumber: doseNumber,
                effectiveDoseNumber: effectiveDoseNumber,
                twoWeeks: twoWeeks
            });

        }
        handleNextClick();
    }
    
    const handleActivityPageSubmit = (event) => {
        event.preventDefault();
        props.updateActivityBasicInfo(
            event.target.attendees.value,
            event.target.hours.value,
            event.target.minutes.value
        );
        handleNextClick();
    }

    // Submit mask page, set survey completed, navigate to /results
    const handleOthersMaskPageSubmit = (event) => {
        event.preventDefault();
        props.updateOthersMaskNumWearers(event.target.portion.value);
        props.updateSurveryCompleted(true);
        props.history.push('/results');
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
                submitCallback={handleLocationPageSubmit}
                selection={props.userLocation} 
            />;
            break;
        case 3:
            pageScreen = <VaccinePage
                backClickCallback={handleBackClick}
                submitCallback={handleVaccinePageSubmit}
                vaccineTypeCallback={handleVaccineTypeChange}
                selection={props.vaccination}
            />;
            break;
        case 4:
            pageScreen = <PresetPage 
                nextClickCallback={handleNextClick} 
                backClickCallback={handleBackClick}
                presetCallback={props.updateWithPreset}
            />;
            break;
        case 5:
            pageScreen = <ActivityPage
                backClickCallback={handleBackClick}
                radioSelectionCallback={props.updateActivitySetting}
                radioSelection={props.activityBasicInfo.setting}
                attendees={props.activityBasicInfo.attendees}
                hours={props.activityBasicInfo.hours}
                minutes={props.activityBasicInfo.minutes}
                submitCallback={handleActivityPageSubmit}
            />;
            break;
        case 6:
            pageScreen = <SocialDistancePage 
                backClickCallback={handleBackClick}
                nextClickCallback={handleNextClick}
                selectionCallback={props.updateDistancing} 
                selection={props.distancing} 
            />;
            break;
        case 7:
            pageScreen = <TalkingPage 
                backClickCallback={handleBackClick}
                nextClickCallback={handleNextClick}
                selectionCallback={props.updateSpeakingVolume} 
                selection={props.speakingVolume} 
            />;
            break;
        case 8:
            pageScreen = <OwnMaskPage 
                nextClickCallback={handleNextClick} 
                backClickCallback={handleBackClick}
                selectionCallback={props.updateOwnMask} 
                selection={props.ownMask} 
            />;
            break;
        case 9:
            pageScreen = <OthersMaskPage 
                backClickCallback={handleBackClick}
                selectionCallback={props.updateOthersMaskType} 
                selection={props.othersMask.type}
                formSubmitCallback={handleOthersMaskPageSubmit} 
                numWearers={props.othersMask.numWearers} 
                attendees={props.activityBasicInfo.attendees}
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
                        <Input type="select" name="state" className="w-auto" defaultValue={props.selection.stateCode}>
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
                        <Input type="select" name="county" className="w-auto" defaultValue={props.selection.county}>
                            <option>King</option>
                            <option>Pierce</option>
                        </Input>
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

    if (props.selection.twoWeeks === "Yes") {
        yesChecked = true;
    } else if (props.selection.twoWeeks === "No") {
        noChecked = true;
    }

    // Render dose form only if the user has selected that they have been vaccinated
    let doseForm = <div></div>;
    if (props.selection.type !== "None") {

        // Don't render doseNumberInput if user selected J&J (1 dose vaccine)
        let doseNumberInput = <div></div>;
        if (props.selection.type !== "J&J"){
            doseNumberInput = (
                <FormGroup tag="fieldset">
                    <Label>How many doses have you received? </Label>
                    <Input type="select" name="doses" className="w-auto" defaultValue={props.selection.doseNumber}>
                        <option>1</option>
                        <option>2</option>
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
                            <Input required type="radio" name="weeks" value="Yes" defaultChecked={yesChecked}
                            />{' '}
                    Yes
                </Label>
                    </FormGroup>
                    <FormGroup check required>
                        <Label>
                            <Input required type="radio" name="weeks" value="No" defaultChecked={noChecked}
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
            <h2 className="calc-step-desc">Description placeholder</h2>
            <img className="calc-img" src={doctorsImage} alt="Illustration of two doctors" />
            <Form id="vaccine-form" onSubmit={props.submitCallback}>
                <FormGroup tag="fieldset">
                    <Label>Have you recieved a COVID-19 vaccine? If so, which type?</Label>
                        <Input type="select" name="vaccine" className="w-auto" defaultValue={props.selection.type} onChange={props.vaccineTypeCallback}>
                            <option value="None">No</option>
                            <option value="Pfizer">Yes - Pfizer</option>
                            <option value="Moderna">Yes - Moderna</option>
                            <option value="J&J">Yes - Johnson & Johnson</option>
                            <option value="Astrazeneca">Yes - Astrazeneca</option>
                            <option value="Other">Yes - Other</option>
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
        "Indoor Dining": {
            activityBasicInfo: { setting: "Indoor", attendees: null, hours: 1,  minutes: 0 },
            distancing: "Less than 6 feet",
            volume: "Speaking normally",
            ownMask: "No Mask",
            othersMask: { type: "No Mask", numWearers: null }
        }
    }

    // Checks if the preset buttons description matches one of the preset objects and fills it in
    // If it doesn't it proceeds as if no preset was entered for safety, but this should never happen anyway
    const fillSurvey = (desc) => {
        if (presets.hasOwnProperty(desc)) {
            props.presetCallback(presets[desc]);
        }
        props.nextClickCallback();
    }

    return (
        <div className="calc-step-container">
            <h1 className="calc-step-title">What activity are you planning to do?</h1>
            <h2 className="calc-step-desc">Select an activity <span className="blue">or </span> build your own</h2>

            <div className="container">
                <div className="row img-btn-row">
                    <div className="col-4 d-flex justify-content-center">
                        <ImageButton image={groceryShoppingImage} desc={"Grocery Shopping"} alt="Person grocery shopping" clickCallback={fillSurvey}/>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <ImageButton image={goingToWorkImage} desc={"Going to Work"} alt="Person in a suit walking" clickCallback={fillSurvey}/>
                     </div>
                    <div className="col-4 d-flex justify-content-center">
                        <ImageButton image={visitingFriendImage} desc={"Visiting a Friend"} alt="Two people sitting outdoors" clickCallback={fillSurvey}/>
                    </div>
                </div>
                <div className="row img-btn-row">
                    <div className="col-4 d-flex justify-content-center">
                        <ImageButton image={takingTheBusImage} desc={"Taking the Bus"} alt="Person riding a bus" clickCallback={fillSurvey}/>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <ImageButton image={indoorDiningImage} desc={"Indoor Dining"} alt="Two people at a restaurant table" clickCallback={fillSurvey}/>
                     </div>
                    <div className="col-4 d-flex justify-content-center">
                        <ImageButton image={joggingImage} desc={"Jogging"} alt="Person jogging on a trail" clickCallback={fillSurvey}/>
                    </div>
                </div>
                <div className="row img-btn-row">
                    <div className="col-4 d-flex justify-content-center">
                        <ImageButton image={partyImage} desc={"Going to a Party"} alt="Group of people doing a toast" clickCallback={fillSurvey}/>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <ImageButton image={outdoorGatheringImage} desc={"Outdoor Gathering"} alt="Group of people having an outdoor barbeque" clickCallback={fillSurvey}/>
                     </div>
                    <div className="col-4 d-flex justify-content-center">
                        <ImageButton image={hikingImage} desc={"Hiking"} alt="Person hiking" clickCallback={fillSurvey}/>
                    </div>
                </div>
            </div>

            <h2 className="calc-subtext">Didn’t see an activity you want?</h2>
            <div className="horizontal-center build-own-btn">
                <Button color="outline-primary" onClick={props.nextClickCallback}>Build my own activity!</Button>
            </div>
            <div className="calc-nav-controls">
                <div className="prev-next-btns">
                    <button className="btn prev-btn" onClick={props.backClickCallback} aria-label="Previous step">
                        <ChevronLeftIcon size={48} fill="#4A7CE2" />
                    </button>
                    <button className="btn next-btn" onClick={props.nextClickCallback} aria-label="Next step">
                        <ChevronRightIcon size={48} fill="#4A7CE2" />
                    </button>
                </div>
            </div>
        </div>
    );

}

function ActivityPage(props) {

    // Default to both unchecked
    let settingsTypes = [
        { desc: "Indoor", checked: false },
        { desc: "Outdoor", checked: false }
    ];

    return (
        <div className="calc-step-container">
            <h1 className="calc-step-title">Basic information</h1>
            <h2 className="calc-step-desc">Calculate the risk for your planned activity</h2>
            <Form id="activity-form" onSubmit={props.submitCallback}>
                <RadioOptions options={settingsTypes} legend="Where will the activity be held?"
                    selectionCallback={props.radioSelectionCallback} selection={props.radioSelection} />
                <FormGroup tag="fieldset">
                    <legend>How many people will attend?</legend>
                    <Input required type="number" name="attendees" id="atendees" min="0" className="w-auto"
                        defaultValue={props.attendees} />
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

    let lessThanSixSelected = false;
    let sixSelected = false;
    let nineSelected = false;
    let moreThanNineSelected =false;

    switch(props.selection) {
        case "Less than 6 feet":
            lessThanSixSelected = true;
            break;
        case "6 feet":
            sixSelected = true;
            break;
        case "9 feet":
            nineSelected = true;
            break;
        case "More than 9 feet":
            moreThanNineSelected = true;
            break;
        default:
            sixSelected = true;
    }

    return (
        <div className="calc-step-container">
            <h1 className="calc-step-title">Physical Distancing</h1>
            <h2 className="calc-step-desc">Maintain a safe distance between yourself and other people who are not from your household</h2>
            <h2 className="calc-step-question">What is the distance between you and others during the activity?</h2>

            <div className="container">
                <div className="row img-btn-row">
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={sixFeetImage} desc="Less than 6 feet" alt="Cartoon of bed with a six foot label" large selected={lessThanSixSelected} clickCallback={props.selectionCallback}/>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={sixFeetImage} desc="6 feet" alt="Cartoon of bed with a six foot label" large selected={sixSelected} clickCallback={props.selectionCallback}/>
                    </div>
                </div>
                <div className="row img-btn-row">
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={sixFeetImage} desc="9 feet" alt="Cartoon of bed with a six foot label" large selected={nineSelected} clickCallback={props.selectionCallback}/>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={sixFeetImage} desc="More than 9 feet" alt="Cartoon of bed with a six foot label" large selected={moreThanNineSelected} clickCallback={props.selectionCallback} />
                    </div>
                </div>
            </div>

            <div className="calc-nav-controls">
                <div className="prev-next-btns">
                    <button className="btn prev-btn" onClick={props.backClickCallback} aria-label="Previous step">
                        <ChevronLeftIcon size={48} fill="#4A7CE2" />
                    </button>
                    <button className="btn next-btn" onClick={props.nextClickCallback} aria-label="Next step">
                        <ChevronRightIcon size={48} fill="#4A7CE2" />
                    </button>
                </div>
            </div>
        </div>
    );

}

function TalkingPage(props) {

    let notSpeakingSelected = false;
    let normalSpeakingSelected = false;
    let loudSpeakingSelected = false;

    switch(props.selection) {
        case "Not speaking":
            notSpeakingSelected = true;
            break;
        case "Speaking normally":
            normalSpeakingSelected = true;
            break;
        case "Speaking loudly or shouting":
            loudSpeakingSelected = true;
            break;
        default:
            normalSpeakingSelected = true;
    }

    return (
        <div className="calc-step-container">
            <h1 className="calc-step-title">Speaking volume</h1>
            <h2 className="calc-step-desc">Risk is also calculated based on <span className="blue">movement of air </span>particles through <span className="blue">speaking</span></h2>
            <h2 className="calc-step-question">How loud will people be speaking during the activity?</h2>

            <div className="container">
                <div className="row img-btn-row">
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={speakingNormalImage} desc="Not speaking" alt="Two people outdoors speaking" large selected={notSpeakingSelected} clickCallback={props.selectionCallback}/>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={speakingNormalImage} desc="Speaking normally" alt="Two people outdoors speaking" large selected={normalSpeakingSelected} clickCallback={props.selectionCallback}/>
                    </div>
                </div>
                <div className="row img-btn-row">
                    <div className="col-12 d-flex justify-content-center">
                        <ImageButton image={speakingNormalImage} desc="Speaking loudly or shouting" alt="Two people outdoors speaking" large selected={loudSpeakingSelected} clickCallback={props.selectionCallback}/>
                    </div>
                </div>
            </div>

            <div className="calc-nav-controls">
                <div className="prev-next-btns">
                    <button className="btn prev-btn" onClick={props.backClickCallback} aria-label="Previous step">
                        <ChevronLeftIcon size={48} fill="#4A7CE2" />
                    </button>
                    <button className="btn next-btn" onClick={props.nextClickCallback} aria-label="Next step">
                        <ChevronRightIcon size={48} fill="#4A7CE2" />
                    </button>
                </div>
            </div>
        </div>
    );

}

function OwnMaskPage(props) {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    let noMaskSelected = false;
    let cottonMaskSelected = false;
    let surgicalMaskSelected = false;
    let kn95MaskSelected = false;

    let maskInfo = "N/A";

    switch(props.selection) {
        case "No Mask":
            noMaskSelected = true;
            maskInfo = "N/A";
            break;
        case "Cotton Mask":
            cottonMaskSelected = true;
            maskInfo = "The filtration effectiveness of cloth masks is generally lower than that of medical masks and respirators; however, cloth masks may provide some protection if well designed and used correctly."
            break;
        case "Surgical Mask":
            surgicalMaskSelected = true;
            maskInfo = "Fluid resistant and provides the wearer protection against large droplets or sprays of bodily fluids. Protects others from the wearer’s respiratory emissions."
            break;
        case "KN95 Mask":
            kn95MaskSelected= true;
            maskInfo = "Reduces wearer’s exposure to particles including small particle aerosols and large droplets. Protects others from the wearer’s respiratory emissions."
            break;
        default:
            cottonMaskSelected = true;
    }

    let dropdownClass = "";

    if (noMaskSelected) {
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
                        <ImageButton image={noMaskImage} desc="No Mask" alt="Person with no mask" large selected={noMaskSelected} clickCallback={props.selectionCallback}/>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={cottonMaskImage} desc="Cotton Mask" alt="Cotton mask" large selected={cottonMaskSelected} clickCallback={props.selectionCallback}/>
                    </div>
                </div>
                <div className="row img-btn-row">
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={surgicalMaskImage} desc="Surgical Mask" alt="Surgical mask" large selected={surgicalMaskSelected} clickCallback={props.selectionCallback}/>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={kn95MaskImage} desc="KN95 Mask" alt="KN95 mask" large selected={kn95MaskSelected} clickCallback={props.selectionCallback} />
                    </div>
                </div>
            </div>
            <div className={dropdownClass}>
                <div className="info-dropdown-btn">
                    <button className="btn btn-outline-secondary" onClick={toggle}>
                        What is a {props.selection}? {isOpen
                        ? <ChevronUpIcon size={24} />
                        : <ChevronDownIcon size={24} />
                    }
                    </button>
                </div>
                <Collapse isOpen={isOpen}>
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
                    <button className="btn next-btn" onClick={props.nextClickCallback} aria-label="Next step">
                        <ChevronRightIcon size={48} fill="#4A7CE2" />
                    </button>
                </div>
            </div>
        </div>
    );

}

function OthersMaskPage(props) {

    const [ sliderValue, setSliderValue ] = useState(parseInt(props.attendees)); 


    let noMaskSelected = false;
    let cottonMaskSelected = false;
    let surgicalMaskSelected = false;
    let kn95MaskSelected = false;

    switch(props.selection) {
        case "No Mask":
            noMaskSelected = true;
            break;
        case "Cotton Mask":
            cottonMaskSelected = true;
            break;
        case "Surgical Mask":
            surgicalMaskSelected = true;
            break;
        case "KN95 Mask":
            kn95MaskSelected= true;
            break;
        default:
            cottonMaskSelected = true;
    }

    return (
        <div className="calc-step-container">
            <h1 className="calc-step-title">What type of mask will others wear?</h1>
            <h2 className="calc-step-desc">Different types of face masks have different levels of effectiveness in catching droplets from talking, sneezing, or coughing</h2>
            
            <div className="container">
                <div className="row img-btn-row">
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={noMaskImage} desc="No Mask" alt="Person with no mask" large selected={noMaskSelected} clickCallback={props.selectionCallback}/>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={cottonMaskImage} desc="Cotton Mask" alt="Cotton mask" large selected={cottonMaskSelected} clickCallback={props.selectionCallback}/>
                    </div>
                </div>
                <div className="row img-btn-row">
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={surgicalMaskImage} desc="Surgical Mask" alt="Surgical mask" large selected={surgicalMaskSelected} clickCallback={props.selectionCallback}/>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <ImageButton image={kn95MaskImage} desc="KN95 Mask" alt="KN95 mask" large selected={kn95MaskSelected} clickCallback={props.selectionCallback} />
                    </div>
                </div>
            </div>

            <Form className="others-mask-form" id="others-mask-form" onSubmit={props.formSubmitCallback}>            
                <FormGroup>
                    <Label>
                        Number of people wearing masks:
                        <Input required type="number" name="portion" id="portion" min="0" max={parseInt(props.attendees)} className="w-auto"
                            value={sliderValue} onChange={e => setSliderValue(e.target.value)} />
                        <RangeSlider
                            value={sliderValue}
                            onChange={changeEvent => setSliderValue(changeEvent.target.value) }
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
                    <span>
                        <button form="others-mask-form" type="submit" className="btn btn-primary next-btn">
                            Get my risk score
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );

}

// Renders radio button options for the calculator
// Rendered in this fashion so that they can be checked dynamically based off of props
// Props: options (array of all options for buttons), selection (value of option to select)
// legend, and selectionCallback for updating state on selection
function RadioOptions(props) {
    let optionsElement = props.options.map((option) => {

        let optionChecked = false;

        if (option.desc === props.selection) {
            optionChecked = true;
        }

        return (
            <FormGroup check key={option.desc} required>
                <Label check>
                    <Input
                        required
                        type="radio"
                        name="radio1"
                        defaultChecked={optionChecked}
                        onChange={props.selectionCallback}
                        value={option.desc}
                    />{' '}
                    {option.desc}
                </Label>
            </FormGroup>
        )
    })

    return (
        <FormGroup tag="fieldset">
            <legend>{props.legend}</legend>
            {optionsElement}
        </FormGroup>
    )
}

function ImageButton(props) {

    let btnClass = "img-btn";
    let textClass = "img-btn-text";

    if(props.large) {
        btnClass += " img-btn-large";
        textClass = "img-btn-text-large";
    }

    if(props.selected) {
        btnClass += " img-btn-selected";
    }

    const handleClick = () => {
        props.clickCallback(props.desc);
    } 

    return(
        <button className={btnClass} aria-pressed="false" onClick={handleClick}>
            <div className="img-btn-content">
                <div className="img-btn-image-container">
                    <img className="img-btn-image" src={props.image} alt={props.alt} />
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
