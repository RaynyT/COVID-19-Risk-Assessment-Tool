import { useState } from 'react';
import { FormGroup, Label, Input, Form } from 'reactstrap';
import { ChevronLeftIcon, ChevronRightIcon } from '@primer/octicons-react';
import axios from 'axios'
import CountyList from './CountyList';



import locationImage from '../images/space-search.svg';
import doctorsImage from '../images/doctors.svg'

import '../App.css';
import './Calculator.css';
import './Update.css';


export default function Update(props) {

    let startingPageNum = 1;

    const [pageNum, setPageNum] = useState(startingPageNum);

    let pageScreen = <div></div>;

    const handleNextClick = () => {
        setPageNum(pageNum + 1);
    }

    const handleBackClick = () => {
        setPageNum(pageNum - 1);
    }

    const handleStateCodeChange = (event) => {
        props.updateStateSelection(event.target.value);
    }

    const handleLocationPageSubmit = (event) => {
        event.preventDefault();
        props.updateLocation(
            event.target.state.value,
            event.target.county.value
        );

        axios.post('https://covidaware.ischool.uw.edu/retrieve_county_rates', props.userLocation)
        .then(response => console.log(response))
        .catch(error => console.log(error));

        handleNextClick();
    }

    // The vaccine selection is handled separate from the vaccine page submission
    // so that the state will change and re-render the form based on vaccine type
    const handleVaccineTypeChange = (event) => {
        props.updateVaccineType(event.target.value);
    }

    // Submit vaccine page and return to dashboard
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
        completeSurvey();
    }

    const calculateRiskScore = () => {
        
        const numericValues = {
            "indoors": 1,
            "outdoors": .05,
            "lessThanSixFeet": 1,
            "sixFeet": .5,
            "nineFeet": .25,
            "moreThanNineFeet": .125,
            "notSpeaking": .20,
            "normalSpeaking": 1,
            "loudSpeaking": 5,
            "cottonMask": .6666666666,
            "surgicalMask": .5,
            "kn95Mask": .3333333333,
            "noMask": 1
        }
        let percentOthersWearingMask = props.othersMask.numWearers / props.activityBasicInfo.attendees
        
        // Determine vaccine efficacy
        let vaccineEfficacy = 1;
        let doseInt = parseInt(props.vaccination.effectiveDoseNumber);
        if (doseInt === 1) {
            vaccineEfficacy = .56;
        } else if (doseInt === 2) {
            if (props.vaccination.type === "pfizer" || props.vaccination.type === "moderna") {
                vaccineEfficacy = .1;
            } else {
                vaccineEfficacy = .4;
            }
        }
        
        let score = (
            // Activity setting risk coefficient * Number of attendees
            numericValues[props.activityBasicInfo.setting] * props.activityBasicInfo.attendees *
            // * Duration in hours
            (props.activityBasicInfo.hours + (props.activityBasicInfo.minutes / 60)) *
            // * Own mask type risk coefficent
            numericValues[props.ownMask] * 
            // * (Others mask type risk * percent of others wearing mask + (100 - percent of others wearing mask))
            (numericValues[props.othersMask.type] * percentOthersWearingMask + (100 - percentOthersWearingMask)) *
            // * Distancing risk * Volume risk
            numericValues[props.distancing] * numericValues[props.speakingVolume] *
            // * Vaccine efficacy
            vaccineEfficacy
            );
        
        return score;
    }

    const completeSurvey = () => {

        props.updateRiskScore(calculateRiskScore());
        
        let surveyData = {
            userID: props.userID,
            userLocation: props.userLocation,
            vaccination: props.vaccination,
            activityBasicInfo: props.activityBasicInfo,
            distancing: props.distancing,
            speakingVolume: props.speakingVolume,
            ownMask: props.ownMask,
            othersMask: props.othersMask,
            riskScore: props.riskScore,
            surveyCompleted: props.surveyCompleted,
        }

        axios.post('https://covidaware.ischool.uw.edu/insert_survey', surveyData)
        .then(response => console.log(response))
        .catch(error => console.log(error));

        props.history.push('/dashboard');
    }

    switch (pageNum) {
        case 1:
            pageScreen = <LocationPage 
                nextClickCallback={handleNextClick} 
                backClickCallback={handleBackClick}
                stateSelectionCallback={handleStateCodeChange} 
                submitCallback={handleLocationPageSubmit}
                selection={props.userLocation} 
            />;
        break;
        case 2:
            pageScreen = <VaccinePage
                backClickCallback={handleBackClick}
                submitCallback={handleVaccinePageSubmit}
                vaccineTypeCallback={handleVaccineTypeChange}
                selection={props.vaccination}
             />;
        break;
        default:
            pageScreen = <LocationPage 
                nextClickCallback={handleNextClick} 
                backClickCallback={handleBackClick}
                stateSelectionCallback={handleStateCodeChange} 
                submitCallback={handleLocationPageSubmit}
                selection={props.userLocation} 
            />;  
        }

    return (
        <div className="calc-outer">
            <div className="calc-main-container">
                {pageScreen}
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
                    <button type="submit" form="vaccine-form" className="btn next-btn" aria-label="Submit">
                        <div className="submit-btn">
                            <p className="to-dashboard-text">Submit changes</p>
                            <ChevronRightIcon size={48} fill="#4A7CE2" />
                        </div>
                    </button>
                </div>
            </div>
            
        </div>
    );
}