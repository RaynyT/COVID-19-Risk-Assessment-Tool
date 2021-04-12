import { useState } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import '../App.css'
import './Tutorial.css'

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
        <div className="container">
            <h1 className="heading-text">Get Started</h1>
            <h2 className="sub-heading-text">4 simple steps to get your risk results!</h2>
            {stepScreen}
        </div>
    );
}

function StepOne(props) {
    return (
        <div>
            <h1 className="step-title">Demographic</h1>
            <h2 className="sub-heading-text">Enter your basic demographic information</h2>
            <img src={stepOneImage} alt="Drawing of a person sitting on a location pin"/>
            <div className="prev-next-btns">
                <Button onClick={props.nextClickCallback} className="next-btn">Next Step</Button>
            </div>
            <div className="horizontal-center">
                <Link to="/calculator" className="btn btn-outline-primary">
                    Skip tutorial
                </Link>
            </div>
        </div>
    );
}

function StepTwo(props) {
    return (
        <div>
            <h1 className="step-title">Activity</h1>
            <h2 className="sub-heading-text">Enter information about one activity you plan to do</h2>
            <img src={stepTwoImage} alt="People enjoying a day outside by walking or skating"/>
            <div className="prev-next-btns">
                <Button onClick={props.backClickCallback} className="prev-btn">Previous Step</Button>
                <Button onClick={props.nextClickCallback} className="next-btn">Next Step</Button>
            </div>
            <div className="horizontal-center">
                <Link to="/calculator" className="btn btn-outline-primary">
                    Skip tutorial
                </Link>
            </div>
        </div>
    );
}

function StepThree(props) {
    return (
        <div>
            <h1 className="step-title">Get your risk result!</h1>
            <h2 className="sub-heading-text">A risk assessment for your activity, local demographic statistics, and risk mitigation suggestions will be available. </h2>
            <img src={stepThreeImage} alt="Drawing of people holding various graphs and charts"/>
            <div className="prev-next-btns">
                <Button onClick={props.backClickCallback} className="prev-btn">Previous Step</Button>
                <Button onClick={props.nextClickCallback} className="next-btn">Next Step</Button>
            </div>
            <div className="horizontal-center">
                <Link to="/calculator" className="btn btn-outline-primary">
                    Skip tutorial
                </Link>
            </div>
        </div>
    );
}

function StepFour(props) {
    return (
        <div>
            <h1 className="step-title">View Advice & Reduce Risk</h1>
            <h2 className="sub-heading-text">You are able lower your risk by implementing our suggestions and adjusting your activity. </h2>
            <img src={stepFourImage} alt="Graphic of a clipboard with checkboxes"/>
            <div className="prev-next-btns">
                <Button onClick={props.backClickCallback} className="prev-btn">Previous Step</Button>
            </div>
            <div className="horizontal-center">
                <Link to="/calculator" className="btn btn-primary">
                    Get started!
                </Link>
            </div>
        </div>
    );
}




