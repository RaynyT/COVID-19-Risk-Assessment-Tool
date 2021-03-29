import { useState } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import '../App.css'

import stepOneImage from '../images/demographic.svg';
import stepTwoImage from '../images/nature-fun.svg';
import stepThreeImage from '../images/risk-result.svg';
import stepFourImage from '../images/survey.svg';

export default function Tutorial() {

    const[step, setStep] = useState(1);

    let stepScreen = <div></div>;
    
    const handleNextClick = () => {
        setStep(step + 1);
    }

    const handleBackClick = () => {
        setStep(step - 1);
    }

    switch(step) {
        case 1:
            stepScreen = <StepOne nextClickCallback={handleNextClick}/>;
            break;
        case 2:
            stepScreen = <StepTwo nextClickCallback={handleNextClick} backClickCallback={handleBackClick}/>;
            break;
        case 3:
            stepScreen = <StepThree nextClickCallback={handleNextClick}  backClickCallback={handleBackClick}/>;
            break;
        case 4:
            stepScreen = <StepFour  backClickCallback={handleBackClick}/>;
            break;
        default:
            stepScreen = <StepOne nextClickCallback={handleNextClick}/>;
    }

    return (
        <div>
            <h1>Get Started</h1>
            <h2>Four simple steps to get your risk results!</h2>
            {stepScreen}
        </div>
    );
}

function StepOne(props) {
    return (
        <div>
            <h1 className="blue">Demographic</h1>
            <h2>Enter your basic demographic information</h2>
            <img src={stepOneImage} alt="Drawing of a person sitting on a location pin"/>
            <div>
                <Button onClick={props.nextClickCallback}>Next Step</Button>
            </div>
            <div>
                <Link to="/calculator">
                <Button outline color="primary">Skip Tutorial</Button>
                </Link>
            </div>
        </div>
    );
}

function StepTwo(props) {
    return (
        <div>
            <h1 className="blue">Activity</h1>
            <h2>Enter information about one activity you plan to do</h2>
            <img src={stepTwoImage} alt="People enjoying a day outside by walking or skating"/>
            <div>
                <Button onClick={props.backClickCallback}>Previous Step</Button>
                <Button onClick={props.nextClickCallback}>Next Step</Button>
            </div>
            <div>
                <Link to="/calculator">
                    <Button outline color="primary">Skip Tutorial</Button>
                </Link>
            </div>
        </div>
    );
}

function StepThree(props) {
    return (
        <div>
            <h1 className="blue">Get your risk result!</h1>
            <h2>A risk assessment for your activity, local demographic statistics, and risk mitigation suggestions will be available. </h2>
            <img src={stepThreeImage} alt="Drawing of people holding various graphs and charts"/>
            <div>
                <Button onClick={props.backClickCallback}>Previous Step</Button>
                <Button onClick={props.nextClickCallback}>Next Step</Button>
            </div>
            <div>
                <Link to="/calculator">
                <Button outline color="primary">Skip Tutorial</Button>
                </Link>
            </div>
        </div>
    );
}

function StepFour(props) {
    return (
        <div>
            <h1 className="blue">View Advice & Reduce Risk</h1>
            <h2>You are able lower your risk by implementing our suggestions and adjusting your activity. </h2>
            <img src={stepFourImage} alt="Graphic of a clipboard with checkboxes"/>
            <div>
                <Button onClick={props.backClickCallback}>Previous Step</Button>
            </div>
            <div>
                <Link to="/calculator">
                    <Button color="primary">Calculate my risk</Button>
                </Link>
            </div>
        </div>
    );
}




