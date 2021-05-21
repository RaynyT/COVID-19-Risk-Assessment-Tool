import { useState } from 'react';
import { FormGroup, Label, Input, Form } from 'reactstrap';
import { ChevronLeftIcon, ChevronRightIcon } from '@primer/octicons-react';
import axios from 'axios';
import moment from 'moment';
import CountyList from './CountyList';
import calculateRiskScore from './CalculateRiskScore.js';




import locationImage from '../images/space-search.svg';
import doctorsImage from '../images/doctors.svg'

import '../App.css';
import './Calculator.css';
import './Update.css';


export default function Update(props) {

    let startingPageNum = 1;

    const [pageNum, setPageNum] = useState(startingPageNum);

    const [userLocationSelection, setUserLocationSelection] = useState(props.userLocation);
    const [personRisk, setPersonRisk] = useState(props.personRisk);
	const [vaccinationSelection, setVaccinationSelection] = useState(props.vaccination);

    let pageScreen = <div></div>;

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
    // Determine how effective dose number based on twoWeeks variable, and complete survey
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
        completeSurvey();
    }

    const completeSurvey = () => {

        // Calculate and update risk score with new updates and old selections
        let riskScore = calculateRiskScore({            
            userLocation: userLocationSelection,
            vaccination: vaccinationSelection,
            activityBasicInfo: props.activityBasicInfo,
            distancing: props.distancing,
            speakingVolume: props.speakingVolume,
            ownMask: props.ownMask,
            othersMask: props.othersMask,
            personRisk: personRisk
        });
        console.log("updated risk score: ", riskScore);
        props.updateRiskScore(riskScore);

        // Update App state with new selections
        props.updateVaccination(vaccinationSelection);
        props.updateLocation(userLocationSelection.stateCode, userLocationSelection.county);

        let requestData = {
            userID: props.userID,
            userLocation: userLocationSelection,
            vaccination: vaccinationSelection,
            activityBasicInfo: props.activityBasicInfo,
            distancing: props.distancing,
            speakingVolume: props.speakingVolume,
            ownMask: props.ownMask,
            othersMask: props.othersMask,
            riskScore: riskScore,
            surveyCompleted: props.surveyCompleted,
        }

        axios.post('https://covidaware.ischool.uw.edu/insert_survey', requestData)
            .then(response => console.log(response))
            .catch(error => console.log(error));

        props.history.push('/dashboard');
    }

    switch (pageNum) {
        case 1:
            pageScreen = <LocationPage
                nextClickCallback={handleNextClick}
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
                    <button className="btn prev-btn hidden" onClick={props.backClickCallback} aria-label="Previous step">
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
        if (props.selection.type !== "johnsonAndJohnson") {
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