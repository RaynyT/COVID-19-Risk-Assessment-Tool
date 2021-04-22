import { useState } from 'react';
import { ProgressBar } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@primer/octicons-react';

import '../App.css'
import './Tutorial.css'

import stepOneImage from '../images/demographic.svg';
import stepTwoImage from '../images/nature-fun.svg';
import stepThreeImage from '../images/risk-result.svg';
import stepFourImage from '../images/survey.svg';

export default function Tutorial() {

    const[step, setStep] = useState(1);

    let stepScreen = <div></div>;
    let progress = 25;
    
    const handleNextClick = () => {
        setStep(step + 1);
    }

    const handleBackClick = () => {
        setStep(step - 1);
    }

    switch(step) {
        case 1:
            stepScreen = <StepOne nextClickCallback={handleNextClick}/>;
            progress = 25;
            break;
        case 2:
            stepScreen = <StepTwo nextClickCallback={handleNextClick} backClickCallback={handleBackClick}/>;
            progress = 50;
            break;
        case 3:
            stepScreen = <StepThree nextClickCallback={handleNextClick}  backClickCallback={handleBackClick}/>;
            progress = 75;
            break;
        case 4:
            stepScreen = <StepFour  backClickCallback={handleBackClick}/>;
            progress = 100;
            break;
        default:
            stepScreen = <StepOne nextClickCallback={handleNextClick}/>;
            progress = 25;
    }

    return (
        <div className="outer">
            <div className="tutorial-main-container">
                <h1 className="heading-text">Get Started</h1>
                <h2 className="sub-heading-text">4 simple steps to get your risk results!</h2>
                    <ProgressBar now={progress} label={progress + "%"} srOnly />
                {stepScreen}
            </div>
        </div>
    );
}

function StepOne(props) {
    return (
        <div>
            <div className="step-content">
                <h1 className="step-title">Demographic</h1>
                <h2 className="sub-heading-text">Enter your basic demographic information</h2>
                <img className="tutorial-img" src={stepOneImage} alt="Drawing of a person sitting on a location pin"/>
            </div>
            <div className="tutorial-nav-controls">
                <div className="prev-next-btns">
                    <Link to="/" className="btn hidden" aria-label="Previous step">
                        <ChevronLeftIcon size={48} fill="#4A7CE2"/>
                    </Link>
                    <button type="button" className="btn" onClick={props.nextClickCallback} aria-label="Next step">
                        <ChevronRightIcon size={48} fill="#4A7CE2"/>
                    </button>
                </div>
                <div className="horizontal-center">
                    <Link to="/calculator" className="btn btn-outline-primary">
                        Skip Tutorial
                    </Link>
                </div>
            </div>
        </div>
    );
}

function StepTwo(props) {
    return (
        <div>
            <h1 className="step-title">Activity</h1>
            <h2 className="sub-heading-text">Enter information about one activity you are planning</h2>
            <img className="tutorial-img" src={stepTwoImage} alt="People enjoying a day outside by walking or skating"/>
            <div className="tutorial-nav-controls">
                <div className="prev-next-btns">
                    <button type="button" className="btn" onClick={props.backClickCallback} aria-label="Previous step">
                        <ChevronLeftIcon size={48} fill="#4A7CE2"/>
                    </button>                <button type="button" className="btn" onClick={props.nextClickCallback} aria-label="Next step">
                        <ChevronRightIcon size={48} fill="#4A7CE2"/>
                    </button>            
                </div>
                <div className="horizontal-center">
                    <Link to="/calculator" className="btn btn-outline-primary">
                        Skip Tutorial
                    </Link>
                </div>
            </div>
        </div>
    );
}

function StepThree(props) {
    return (
        <div>
            <h1 className="step-title">Get your risk result!</h1>
            <h2 className="sub-heading-text">A risk assessment for your activity, local demographic statistics, and risk mitigation suggestions will be available</h2>
            <img className="tutorial-img" src={stepThreeImage} alt="Drawing of people holding various graphs and charts"/>
            <div className="tutorial-nav-controls">
                <div className="prev-next-btns">
                    <button type="button" className="btn" onClick={props.backClickCallback} aria-label="Previous step">
                        <ChevronLeftIcon size={48} fill="#4A7CE2" />
                    </button>                
                    <button type="button" className="btn" onClick={props.nextClickCallback} aria-label="Next step">
                        <ChevronRightIcon size={48} fill="#4A7CE2" />
                    </button>
                </div>
                <div className="horizontal-center">
                    <Link to="/calculator" className="btn btn-outline-primary">
                        Skip Tutorial
                    </Link>
                </div>
            </div>
        </div>
    );
}

function StepFour(props) {
    return (
        <div>
            <h1 className="step-title">View Advice & Reduce Risk</h1>
            <h2 className="sub-heading-text">You are able lower your risk by implementing our suggestions and adjusting your activity </h2>
            <img className="tutorial-img" src={stepFourImage} alt="Graphic of a clipboard with checkboxes"/>
            <div className="tutorial-nav-controls">
                <div className="prev-next-btns">
                    <button type="button" className="btn" onClick={props.backClickCallback} aria-label="Previous step">
                        <ChevronLeftIcon size={48} fill="#4A7CE2" />
                    </button>
                    <button type="button" className="btn hidden" aria-label="Next step">
                        <ChevronRightIcon size={48} fill="#4A7CE2" />
                    </button>             
                </div>
                <div className="horizontal-center">
                    <Link to="/calculator" className="btn btn-primary">
                        Get Started!
                    </Link>
                </div>
            </div>
        </div>
    );
}




