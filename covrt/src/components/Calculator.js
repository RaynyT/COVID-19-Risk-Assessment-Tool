import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonToggle, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import workFromHomeImage from '../images/work-from-home.svg';
import sixFeetImage from '../images/six-feet-bed.svg';
import speakingNormalImage from '../images/speaking-normal.svg';

import '../App.css';


export default function Calculator() {

    const[pageNum, setPageNum] = useState(1);

    let pageScreen = <div></div>
    
    const handleNextClick = () => {
        setPageNum(pageNum + 1);
    }

    const handleBackClick = () => {
        setPageNum(pageNum - 1);
    }

    switch(pageNum) {
        case 1:
            pageScreen = <DisclaimerPage nextClickCallback={handleNextClick}/>;
            break;
        case 2:
            pageScreen = <LocationPage nextClickCallback={handleNextClick} backClickCallback={handleBackClick}/>;
            break;
        case 3:
            pageScreen = <WorkStatusPage nextClickCallback={handleNextClick} backClickCallback={handleBackClick}/>;            
            break;
        case 4:
            pageScreen = <PresetPage nextClickCallback={handleNextClick} backClickCallback={handleBackClick}/>;
            break;
        case 5:
            pageScreen = <ActivityPage nextClickCallback={handleNextClick} backClickCallback={handleBackClick}/>;
            break;
        case 6:
            pageScreen = <SocialDistancePage nextClickCallback={handleNextClick} backClickCallback={handleBackClick}/>;
            break;
        case 7:
            pageScreen = <TalkingPage nextClickCallback={handleNextClick} backClickCallback={handleBackClick}/>;
            break;
        case 8:
            pageScreen = <OwnMaskPage nextClickCallback={handleNextClick} backClickCallback={handleBackClick}/>;
            break;
        case 9:
            pageScreen = <OthersMaskPage backClickCallback={handleBackClick}/>;
    }

    return (
        <div>
            {pageScreen}
        </div>
    );
}

function DisclaimerPage(props) {

    const[buttonDisabled, setButtonDisabled] = useState(true);

    const handleCheckbox = () => {
        setButtonDisabled(!buttonDisabled);
    }

    return (
        <div>
            <div>
                <h1>Agreement & Regulations</h1>
                <p>
                    CovidAware has been designed specifically for use in the United States. The use of this tool is subject to the Terms of Use.
                </p>
                <p>
                    Be aware that the information provided by this tool 
                    <span className="red"> IS NOT a replacement for medical advice and cannot be used to diagnose or treat medical conditions. </span>
                    If you would like more information regarding this, please visit our FAQ.
                </p>
                <p>
                    The COVID-19 related data utilized in this app is updated weekly:
                </p>
                <p>
                    Last updated: <span className="blue">Mar 11, 2021</span>
                </p>
            </div>
            <FormGroup check>
                <Label check>
                    <Input type="checkbox" onChange={handleCheckbox}/>{' '}
                    I have read and agreed all the rules and regulations in the agreement
                </Label>
            </FormGroup>
            <Button color="primary" disabled={buttonDisabled} onClick={props.nextClickCallback}>
                Calculate my risk!
            </Button>
            <div>
                <Link to="/about">
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
                    <Input type="select" name="state" className="w-auto">
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
                    <Input type="select" name="county" className="w-auto">
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

    return (
        <div>
            <h1>Your work status</h1>
            <h2>Your occupation impacts your potential exposure to COVID-19</h2>
            <h2>What is your occupation?</h2>
            <img src={workFromHomeImage}/>
            <FormGroup tag="fieldset">
                <FormGroup check>
                <Label check>
                    <Input type="radio" name="radio1" />{' '}
                    Not working
                </Label>
                </FormGroup>
                <FormGroup check>
                <Label check>
                    <Input type="radio" name="radio1" />{' '}
                    Working from home
                </Label>
                </FormGroup>
                <FormGroup check>
                <Label check>
                    <Input type="radio" name="radio1" />{' '}
                    Healthcare worker
                </Label>
                </FormGroup>
                <FormGroup check>
                <Label check>
                    <Input type="radio" name="radio1" />{' '}
                    Non-healthcare essential worker
                </Label>
                </FormGroup>
            </FormGroup>
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

    return (
        <div>
            <h1>Basic information</h1>
            <h2>Calculate the risk for your planned activity</h2>
        <FormGroup>
            <FormGroup tag="fieldset">
                <legend>Where will the activity be held?</legend>
                <FormGroup check>
                <Label check>
                    <Input type="radio" name="radio1" />{' '}
                    Indoors
                </Label>
                </FormGroup>
                <FormGroup check>
                <Label check>
                    <Input type="radio" name="radio1" />{' '}
                    Outdoors
                </Label>
                </FormGroup>
            </FormGroup>
            <FormGroup tag="fieldset">
                <legend>How many people will attend?</legend>
                <Input type="number" name="people" id="people" min="0" className="w-auto" />
            </FormGroup>
            <FormGroup tag="fieldset" className="form-inline">
                    <legend>Estimated duration of event</legend>
                    <Label>Hours
                        <Input type="number" name="hours" id="hours" min="0" max="24" className="w-auto" />
                    </Label>
                    <Label>Minutes
                        <Input type="number" name="minutes" id="minutes" min="0" max="59" className="w-auto" />
                    </Label>          
            </FormGroup>
        </FormGroup>
            <div>
                <Button onClick={props.backClickCallback}>Back</Button>
                <Button onClick={props.nextClickCallback}>Next</Button>
            </div>            
        </div>
    );

}

function SocialDistancePage(props) {

    return (
        <div>
            <h1>Physical Distancing</h1>
            <h2>Maintain a safe distance between yourself and other people who are not from your household</h2>
            <h2>What is the distance between you and others during the activity?</h2>
            <img src={sixFeetImage}/>
            <FormGroup tag="fieldset">
                <FormGroup check>
                <Label check>
                    <Input type="radio" name="radio1" />{' '}
                    Less than 6 feet
                </Label>
                </FormGroup>
                <FormGroup check>
                <Label check>
                    <Input type="radio" name="radio1" />{' '}
                    6 feet
                </Label>
                </FormGroup>
                <FormGroup check>
                <Label check>
                    <Input type="radio" name="radio1" />{' '}
                    9 feet
                </Label>
                </FormGroup>
                <FormGroup check>
                <Label check>
                    <Input type="radio" name="radio1" />{' '}
                    More than 9 feet
                </Label>
                </FormGroup>
            </FormGroup>

            <div>
                <Button onClick={props.backClickCallback}>Back</Button>
                <Button onClick={props.nextClickCallback}>Next</Button>
            </div>
        </div>
    );

}

function TalkingPage(props) {

    return (
        <div>
            <h1>Speaking volume</h1>
            <h2>Risk is also calculated based on <span className="blue">movement of air </span>particles through <span className="blue">speaking</span></h2>
            <h2>How loud will people be speaking during the activity?</h2>
            <img src={speakingNormalImage} />
            <FormGroup>
                <FormGroup check>
                <Label check>
                    <Input type="radio" name="radio1" />{' '}
                    Not speaking
                </Label>
                </FormGroup>
                <FormGroup check>
                <Label check>
                    <Input type="radio" name="radio1" />{' '}
                    Speaking normally
                </Label>
                </FormGroup>
                <FormGroup check>
                <Label check>
                    <Input type="radio" name="radio1" />{' '}
                    Speaking loudly or shouting
                </Label>
                </FormGroup>
            </FormGroup>
            <div>
                <Button onClick={props.backClickCallback}>Back</Button>
                <Button onClick={props.nextClickCallback}>Next</Button>
            </div>
        </div>
    );

}

function OwnMaskPage(props) {

    return (
        <div>
            <h1>What type of mask will you be wearing?</h1>
            <h2>Different types of face masks have different levels of effectiveness in catching droplets from talking, sneezing, or coughing</h2>
            <FormGroup tag="fieldset">
                <legend>Your mask (worn properly):</legend>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                    Thick cotton mask
                </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                    Surgical mask
                </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                        Fabric mask with PM2.5 Filter
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                        KN95 Mask
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                    Medical-grade N95 mask
                </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                    No mask
                </Label>
                </FormGroup>
            </FormGroup>
            <div>
                <Button onClick={props.backClickCallback}>Back</Button>
                <Button onClick={props.nextClickCallback}>Next</Button>
            </div>
        </div>
    );

}

function OthersMaskPage(props) {

    return (
        <div>
            <h1>What type of mask will others be wearing?</h1>
            <h2>Different types of face masks have different levels of effectiveness in catching droplets from talking, sneezing, or coughing</h2>
            <FormGroup tag="fieldset">
                <legend>Others masks (in general):</legend>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                        Thick cotton mask
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                        Surgical mask
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                        Fabric mask with PM2.5 Filter
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                        KN95 Mask
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                        Medical-grade N95 mask
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                        No mask
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Proportion of others wearing masks:
                        <Input type="number" name="percent" id="percent" min="0" max="100" className="w-auto" />
                    </Label>
                </FormGroup>
            </FormGroup>
            <div>
                <Button onClick={props.backClickCallback}>Back</Button>
                <Link to="/results">
                    <Button>Get my risk Score</Button>
                </Link>
            </div>
        </div>
    );

}

