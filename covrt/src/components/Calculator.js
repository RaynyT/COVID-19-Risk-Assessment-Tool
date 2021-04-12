import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';

import workFromHomeImage from '../images/work-from-home.svg';
import sixFeetImage from '../images/six-feet-bed.svg';
import speakingNormalImage from '../images/speaking-normal.svg';

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

    const handleActivityPageSubmit = (event) => {
        event.preventDefault();
        props.updateActivityBasicInfo(
            event.target.attendees.value,
            event.target.hours.value,
            event.target.minutes.value
        );
        handleNextClick();
    }

    const handleOthersMaskPageSubmit = (event) => {
        console.log("Called the calculator one")
        event.preventDefault();
        props.updateOthersMaskPercent(event.target.percent.value);
    }


    switch (pageNum) {
        case 1:
            pageScreen = <DisclaimerPage nextClickCallback={handleNextClick} />;
            break;
        case 2:
            pageScreen = <LocationPage nextClickCallback={handleNextClick} backClickCallback={handleBackClick} stateSelectionCallback={props.updateStateSelection} countySelectionCallback={props.updateCountySelection} selection={props.location} />;
            break;
        case 3:
            pageScreen = <WorkStatusPage nextClickCallback={handleNextClick} backClickCallback={handleBackClick}
                selectionCallback={props.updateWorkStatus} selection={props.workStatus} />;
            break;
        case 4:
            pageScreen = <PresetPage nextClickCallback={handleNextClick} backClickCallback={handleBackClick} />;
            break;
        case 5:
            pageScreen = <ActivityPage
                nextClickCallback={handleNextClick}
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
            pageScreen = <SocialDistancePage nextClickCallback={handleNextClick} backClickCallback={handleBackClick}
                selectionCallback={props.updateDistancing} selection={props.distancing} />;
            break;
        case 7:
            pageScreen = <TalkingPage nextClickCallback={handleNextClick} backClickCallback={handleBackClick}
                selectionCallback={props.updateSpeakingVolume} selection={props.speakingVolume} />;
            break;
        case 8:
            pageScreen = <OwnMaskPage nextClickCallback={handleNextClick} backClickCallback={handleBackClick}
                selectionCallback={props.updateOwnMask} selection={props.ownMask} />;
            break;
        case 9:
            pageScreen = <OthersMaskPage backClickCallback={handleBackClick}
                radioSelectionCallback={props.updateOthersMaskType} radioSelection={props.othersMask.type}
                formSubmitCallback={handleOthersMaskPageSubmit} percent={props.othersMask.percent} />;
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

    const handleCheckbox = () => {
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
                    <Label check>
                        <Input type="checkbox" onChange={handleCheckbox} />{' '}
                        I have read the agreement and understand that this risk calculator is an estimate and is not a substitution for medical advice.
                    </Label>
                </FormGroup>
            </div>
            <div  className="calc-risk-btn-container horizontal-center">
                <Button color="primary" className="horizontal-center" disabled={buttonDisabled} onClick={props.nextClickCallback}>
                    Calculate my risk!
                </Button>
            </div>
            <div>
                <Link to="/about" className="horizontal-center">
                    Learn about the calculations
                </Link>
            </div>
        </div>
    );
}

function LocationPage(props) {

    return (
        <div>
            <h1>Your location</h1>
            <h2>
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
            <div>
                <Button onClick={props.backClickCallback}>Back</Button>
                <Button onClick={props.nextClickCallback}>Next</Button>
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
        <div>
            <h1>Your work status</h1>
            <h2>Your occupation impacts your potential exposure to COVID-19</h2>
            <h2>What is your occupation?</h2>
            <img src={workFromHomeImage} alt="Person working on a laptop" />
            <RadioOptions options={workTypes} legend="" selection={props.selection} selectionCallback={props.selectionCallback} />
            <div>
                <Button onClick={props.backClickCallback}>Back</Button>
                <Button onClick={props.nextClickCallback}>Next</Button>
            </div>
        </div>
    );

}

function PresetPage(props) {

    return (
        <div>
            <h1>What activity are you planning to do?</h1>
            <h2>Select an activity <span className="blue">or </span> build your own</h2>

            <Button color="info">Test</Button>

            <h2>Didn’t see an activity you want?</h2>
            <div>
                <Button color="primary" onClick={props.nextClickCallback}>Build my own activity!</Button>
            </div>
            <div>
                <Button onClick={props.backClickCallback}>Back</Button>
                <Button onClick={props.nextClickCallback}>Next</Button>
            </div>
        </div>
    );

}

function ActivityPage(props) {

    // TODO: Min/Max defaults can be caught by making this into a form and handling the <Form>'s onSubmit
    // To get the Form to submit, I will need to find a way to make the 'Next' button into an <Input type="submit">

    // Default to both unchecked
    let settingsTypes = [
        { desc: "Indoor", checked: false },
        { desc: "Outdoor", checked: false }
    ];

    return (
        <div>
            <h1>Basic information</h1>
            <h2>Calculate the risk for your planned activity</h2>
            <Form onSubmit={props.submitCallback}>
                <RadioOptions options={settingsTypes} legend="Where will the activity be held?"
                    selectionCallback={props.radioSelectionCallback} selection={props.radioSelection} />
                <FormGroup tag="fieldset">
                    <legend>How many people will attend?</legend>
                    <Input type="number" name="attendees" id="atendees" min="0" className="w-auto"
                        defaultValue={props.attendees} />
                </FormGroup>
                <FormGroup tag="fieldset" className="form-inline">
                    <legend>Estimated duration of event</legend>
                    <Label>Hours
                        <Input type="number" name="hours" id="hours" min="0" max="24" className="w-auto" defaultValue={props.hours} />
                    </Label>
                    <Label>Minutes
                        <Input type="number" name="minutes" id="minutes" min="0" max="59" className="w-auto"
                            defaultValue={props.minutes} />
                    </Label>
                </FormGroup>
                <div>
                    <Button onClick={props.backClickCallback}>Back</Button>
                    <Button type="submit">Next</Button>
                </div>
            </Form>
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
        <div>
            <h1>Physical Distancing</h1>
            <h2>Maintain a safe distance between yourself and other people who are not from your household</h2>
            <h2>What is the distance between you and others during the activity?</h2>
            <img src={sixFeetImage} alt="Cartoon of bed that is six feet long" />
            <RadioOptions options={distances} legend="" selection={props.selection} selectionCallback={props.selectionCallback} />
            <div>
                <Button onClick={props.backClickCallback}>Back</Button>
                <Button onClick={props.nextClickCallback}>Next</Button>
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
        <div>
            <h1>Speaking volume</h1>
            <h2>Risk is also calculated based on <span className="blue">movement of air </span>particles through <span className="blue">speaking</span></h2>
            <h2>How loud will people be speaking during the activity?</h2>
            <img src={speakingNormalImage} alt="Two people talking outdoors" />
            <RadioOptions options={volumes} legend="" selection={props.selection} selectionCallback={props.selectionCallback} />
            <div>
                <Button onClick={props.backClickCallback}>Back</Button>
                <Button onClick={props.nextClickCallback}>Next</Button>
            </div>
        </div>
    );

}

function OwnMaskPage(props) {

    // Default to all unchecked
    let maskTypes = [
        { desc: "Thick cotton mask", checked: false },
        { desc: "Surgical mask", checked: false },
        { desc: "KN95 mask", checked: false },
        { desc: "No mask", checked: false }
    ];

    return (
        <div>
            <h1>What type of mask will you be wearing?</h1>
            <h2>Different types of face masks have different levels of effectiveness in catching droplets from talking, sneezing, or coughing</h2>
            <RadioOptions options={maskTypes} legend="Your mask" selection={props.selection} selectionCallback={props.selectionCallback} />
            <div>
                <Button onClick={props.backClickCallback}>Back</Button>
                <Button onClick={props.nextClickCallback}>Next</Button>
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
        <div>
            <h1>What type of mask will others be wearing?</h1>
            <h2>Different types of face masks have different levels of effectiveness in catching droplets from talking, sneezing, or coughing</h2>
            <Form onSubmit={props.formSubmitCallback}>
                <RadioOptions options={maskTypes} legend="Others masks" selection={props.radioSelection} selectionCallback={props.radioSelectionCallback} />
                <FormGroup>
                    <Label>
                        Proportion of others wearing masks:
                        <Input type="number" name="percent" id="percent" min="0" max="100" className="w-auto"
                            defaultValue={props.percent} />
                    </Label>
                </FormGroup>
                <div>
                    <Button onClick={props.backClickCallback}>Back</Button>
                    <Link to="/results" className="btn btn-primary">
                        Get my risk score
                    </Link>
                </div>
            </Form>
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
            <FormGroup check key={option.desc}>
                <Label check>
                    <Input
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
