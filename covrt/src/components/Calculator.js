import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';
import { ChevronLeftIcon, ChevronRightIcon } from '@primer/octicons-react';

import workFromHomeImage from '../images/work-from-home.svg';
import sixFeetImage from '../images/six-feet-bed.svg';
import speakingNormalImage from '../images/speaking-normal.svg';

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

    const [pageNum, setPageNum] = useState(1);


    let pageScreen = <div></div>;

    const handleNextClick = () => {
        setPageNum(pageNum + 1);
    }

    const handleBackClick = () => {
        setPageNum(pageNum - 1);
    }

    const handleRadioButtonsSubmit = (event) => {
        event.preventDefault();
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

    // Submit mask page and navigate to /results
    const handleOthersMaskPageSubmit = (event) => {
        event.preventDefault();
        props.updateOthersMaskPercent(event.target.percent.value);
        props.history.push('/results');
    }

    switch (pageNum) {
        case 1:
            pageScreen = <DisclaimerPage nextClickCallback={handleNextClick} />;
            break;
        case 2:
            pageScreen = <LocationPage 
                nextClickCallback={handleNextClick} 
                backClickCallback={handleBackClick} 
                stateSelectionCallback={props.updateStateSelection} 
                countySelectionCallback={props.updateCountySelection} 
                selection={props.location} 
            />;
            break;
        case 3:
            pageScreen = <WorkStatusPage 
                submitCallback={handleRadioButtonsSubmit} 
                backClickCallback={handleBackClick}
                selectionCallback={props.updateWorkStatus} 
                selection={props.workStatus} 
            />;
            break;
        case 4:
            pageScreen = <PresetPage 
                nextClickCallback={handleNextClick} 
                backClickCallback={handleBackClick} 
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
                submitCallback={handleRadioButtonsSubmit} 
                backClickCallback={handleBackClick}
                selectionCallback={props.updateDistancing} 
                selection={props.distancing} 
            />;
            break;
        case 7:
            pageScreen = <TalkingPage 
                submitCallback={handleRadioButtonsSubmit} 
                backClickCallback={handleBackClick}
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
                radioSelectionCallback={props.updateOthersMaskType} 
                radioSelection={props.othersMask.type}
                formSubmitCallback={handleOthersMaskPageSubmit} 
                percent={props.othersMask.percent} 
            />;
            break;
        default:
            pageScreen = <DisclaimerPage nextClickCallback={handleNextClick} />;
    }

    return (
        <div>
            {pageScreen}
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
                        CovidAware has been designed specifically for use in the United States. The use of this tool is subject to the <Link to="/about">Terms of Use.</Link>
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
                <Link to="/about" className="horizontal-center learn-more-link">
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
            <FormGroup tag="fieldset" className="form-inline">
                <Label> State:
                    <Input type="select" name="state" className="w-auto" defaultValue={props.selection.state} onChange={props.stateSelectionCallback}>
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
                </Label>
            </FormGroup>
            <FormGroup tag="fieldset" className="form-inline">
                <Label> County:
                    <Input type="select" name="county" className="w-auto" defaultValue={props.selection.county}
                        onChange={props.countySelectionCallback}>
                        <option>King</option>
                        <option>Pierce</option>
                    </Input>
                </Label>
            </FormGroup>
            <div className="prev-next-btns">
                <button className="btn prev-btn" onClick={props.backClickCallback} aria-label="Previous step">
                    <ChevronLeftIcon size={48} fill="#4A7CE2" />
                </button>
                <button type="submit" className="btn next-btn" onClick={props.nextClickCallback} aria-label="Next step">
                    <ChevronRightIcon size={48} fill="#4A7CE2" />
                </button>
            </div>
        </div>
    );

}

function WorkStatusPage(props) {

    // Default to all unchecked
    let workTypes = [
        { desc: "Not working", checked: false },
        { desc: "Working from home", checked: false },
        { desc: "Healthcare worker", checked: false },
        { desc: "Non-healthcare essential worker", checked: false }
    ];

    return (
        <div className="calc-step-container">
            <h1 className="calc-step-title">Your work status</h1>
            <h2 className="calc-step-desc">Your occupation impacts your potential exposure to COVID-19</h2>
            <h2 className="calc-step-question">What is your occupation?</h2>
            <img className="calc-img" src={workFromHomeImage} alt="Person working on a laptop" />
            <Form id="work-form" onSubmit={props.submitCallback}>
                <RadioOptions options={workTypes} legend="" selection={props.selection} selectionCallback={props.selectionCallback} />
            </Form>
            <div className="prev-next-btns">
                <button className="btn prev-btn" onClick={props.backClickCallback} aria-label="Previous step">
                    <ChevronLeftIcon size={48} fill="#4A7CE2" />
                </button>                
                <button form="work-form" type="submit" className="btn next-btn" aria-label="Next step">
                    <ChevronRightIcon size={48} fill="#4A7CE2" />
                </button>
            </div>
        </div>
    );

}

function PresetPage(props) {

    const fillSurvey = () => {
        console.log("TODO")
    }

    return (
        <div className="calc-step-container">
            <h1 className="calc-step-title">What activity are you planning to do?</h1>
            <h2 className="calc-step-desc">Select an activity <span className="blue">or </span> build your own</h2>

            <div className="container">
                <div className="row img-btn-row">
                    <div className="col-4">
                        <ImageButton image={groceryShoppingImage} desc={"Grocery Shopping"} clickCallback={fillSurvey}/>
                    </div>
                    <div className="col-4">
                        <ImageButton image={goingToWorkImage} desc={"Going to Work"} clickCallback={fillSurvey}/>
                     </div>
                    <div className="col-4">
                        <ImageButton image={visitingFriendImage} desc={"Visiting a Friend"} clickCallback={fillSurvey}/>
                    </div>
                </div>
                <div className="row img-btn-row">
                    <div className="col-4">
                        <ImageButton image={takingTheBusImage} desc={"Taking the Bus"} clickCallback={fillSurvey}/>
                    </div>
                    <div className="col-4">
                        <ImageButton image={indoorDiningImage} desc={"Indoor Dining"} clickCallback={fillSurvey}/>
                     </div>
                    <div className="col-4">
                        <ImageButton image={joggingImage} desc={"Jogging"} clickCallback={fillSurvey}/>
                    </div>
                </div>
                <div className="row img-btn-row">
                    <div className="col-4">
                        <ImageButton image={partyImage} desc={"Going to a Party"} clickCallback={fillSurvey}/>
                    </div>
                    <div className="col-4">
                        <ImageButton image={outdoorGatheringImage} desc={"Outdoor Gathering"} clickCallback={fillSurvey}/>
                     </div>
                    <div className="col-4">
                        <ImageButton image={hikingImage} desc={"Hiking"} clickCallback={fillSurvey}/>
                    </div>
                </div>
            </div>

            <h2 className="calc-subtext">Didn’t see an activity you want?</h2>
            <div className="horizontal-center build-own-btn">
                <Button color="outline-primary" onClick={props.nextClickCallback}>Build my own activity!</Button>
            </div>
            <div className="prev-next-btns">
                <button className="btn prev-btn" onClick={props.backClickCallback} aria-label="Previous step">
                    <ChevronLeftIcon size={48} fill="#4A7CE2" />
                </button>
                <button className="btn next-btn" onClick={props.nextClickCallback} aria-label="Next step">
                    <ChevronRightIcon size={48} fill="#4A7CE2" />
                </button>
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
            <div className="prev-next-btns">
                <button className="btn prev-btn" onClick={props.backClickCallback} aria-label="Previous step">
                    <ChevronLeftIcon size={48} fill="#4A7CE2" />
                </button>
                <button form="activity-form" type="submit" className="btn next-btn" aria-label="Next step">
                    <ChevronRightIcon size={48} fill="#4A7CE2" />
                </button>
            </div>
        </div>
    );

}

function SocialDistancePage(props) {

    // Default to all unchecked
    let distances = [
        { desc: "Less than 6 feet", checked: false },
        { desc: "6 feet", checked: false },
        { desc: "9 feet", checked: false },
        { desc: "More than 9 feet", checked: false }
    ];

    return (
        <div className="calc-step-container">
            <h1 className="calc-step-title">Physical Distancing</h1>
            <h2 className="calc-step-desc">Maintain a safe distance between yourself and other people who are not from your household</h2>
            <h2 className="calc-step-question">What is the distance between you and others during the activity?</h2>
            <img className="calc-img" src={sixFeetImage} alt="Cartoon of bed that is six feet long" />
            <Form id="distancing-form" onSubmit={props.submitCallback}>
                <RadioOptions options={distances} legend="" selection={props.selection} selectionCallback={props.selectionCallback} />
            </Form>
            <div className="prev-next-btns">
                <button className="btn prev-btn" onClick={props.backClickCallback} aria-label="Previous step">
                    <ChevronLeftIcon size={48} fill="#4A7CE2" />
                </button>
                <button form="distancing-form" type="submit" className="btn next-btn" aria-label="Next step">
                    <ChevronRightIcon size={48} fill="#4A7CE2" />
                </button>
            </div>
        </div>
    );

}

function TalkingPage(props) {

    // Default to all unchecked
    let volumes = [
        { desc: "Not speaking", checked: false },
        { desc: "Speaking normally", checked: false },
        { desc: "Speaking loudly or shouting", checked: false }
    ];

    return (
        <div className="calc-step-container">
            <h1 className="calc-step-title">Speaking volume</h1>
            <h2 className="calc-step-desc">Risk is also calculated based on <span className="blue">movement of air </span>particles through <span className="blue">speaking</span></h2>
            <h2 className="calc-step-question">How loud will people be speaking during the activity?</h2>
            <img className="calc-img" src={speakingNormalImage} alt="Two people talking outdoors" />
            <Form id="talking-form" onSubmit={props.submitCallback}>
                <RadioOptions options={volumes} legend="" selection={props.selection} selectionCallback={props.selectionCallback} />
            </Form>
            <div className="prev-next-btns">
                <button className="btn prev-btn" onClick={props.backClickCallback} aria-label="Previous step">
                    <ChevronLeftIcon size={48} fill="#4A7CE2" />
                </button>
                <button form="talking-form" type="submit" className="btn next-btn" aria-label="Next step">
                    <ChevronRightIcon size={48} fill="#4A7CE2" />
                </button>
            </div>
        </div>
    );

}

function OwnMaskPage(props) {

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
            console.log("defaulted")
    }

    return (
        <div className="calc-step-container">
            <h1 className="calc-step-title">Your mask</h1>
            <h2 className="calc-step-desc">Different types of face masks have different levels of effectiveness in catching droplets from talking, sneezing, or coughing</h2>
            <h2 className="calc-subtext">What type of mask will you wear?</h2>
            <div className="container">
                <div className="row img-btn-row">
                    <div className="col-6">
                        <ImageButton image={noMaskImage} desc="No Mask" large selected={noMaskSelected} clickCallback={props.selectionCallback}/>
                    </div>
                    <div className="col-6">
                        <ImageButton image={cottonMaskImage} desc="Cotton Mask" large selected={cottonMaskSelected} clickCallback={props.selectionCallback}/>
                    </div>
                </div>
                <div className="row img-btn-row">
                    <div className="col-6">
                        <ImageButton image={surgicalMaskImage} desc="Surgical Mask" large selected={surgicalMaskSelected} clickCallback={props.selectionCallback}/>
                    </div>
                    <div className="col-6">
                        <ImageButton image={kn95MaskImage} desc="KN95 Mask" large selected={kn95MaskSelected} clickCallback={props.selectionCallback} />
                    </div>
                </div>
            </div>
            
            <div className="prev-next-btns">
                <button className="btn prev-btn" onClick={props.backClickCallback} aria-label="Previous step">
                    <ChevronLeftIcon size={48} fill="#4A7CE2" />
                </button>
                <button className="btn next-btn" onClick={props.nextClickCallback} aria-label="Next step">
                    <ChevronRightIcon size={48} fill="#4A7CE2" />
                </button>
            </div>

        </div>
    );

}

function OthersMaskPage(props) {

    // Default to all unchecked
    let maskTypes = [
        { desc: "Thick cotton mask", checked: false },
        { desc: "Surgical mask", checked: false },
        { desc: "KN95 mask", checked: false },
        { desc: "No mask", checked: false }
    ];

    return (
        <div className="calc-step-container">
            <h1 className="calc-step-title">What type of mask will others wear?</h1>
            <h2 className="calc-step-desc">Different types of face masks have different levels of effectiveness in catching droplets from talking, sneezing, or coughing</h2>
            <Form id="others-mask-form" onSubmit={props.formSubmitCallback}>
                <RadioOptions options={maskTypes} legend="Others masks" selection={props.radioSelection} selectionCallback={props.radioSelectionCallback} />
                <FormGroup>
                    <Label>
                        Proportion of others wearing masks:
                        <Input required type="number" name="percent" id="percent" min="0" max="100" className="w-auto"
                            defaultValue={props.percent} />
                    </Label>
                </FormGroup>
            </Form>
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
                    <img className="img-btn-image" src={props.image} alt={props.desc} />
                </div>
                <div className={textClass}>
                    {props.desc}
                </div>
            </div>
        </button>
    );
}
