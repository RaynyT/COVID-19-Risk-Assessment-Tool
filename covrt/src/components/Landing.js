
import moment from 'moment';
import { useState } from 'react';
import './Landing.css';
import finishLine from '../images/finish-line.svg'
import { Link } from 'react-router-dom';

import logoImage from '../images/covidAwareLogoNew.svg';

export default function Landing() {

    const[splashClicked, setSplashClicked] = useState(false);

    const handleSplashClick = () => {
        setSplashClicked(true);
    }

    if (splashClicked) {
        return (
            <HomePage />
        );
    } else {
        return (
            <Splash clickCallback={handleSplashClick} />
        );
    }

}

function Splash(props) {

    const covidStart = moment("01-21-2020", "MM-DD-YYYY");
    const today = moment();

    const daysSince = today.diff(covidStart, "days");

    return (
        <div className="container" onClick={props.clickCallback}>
            <div>
                <h1 className="blue landing-text">It has been</h1>
                <h1 className="blue landing-text large-text-shadow">{daysSince} days</h1>
                <h1 className="blue landing-text">since the USA's first COVID-19 case...</h1>
                <img src={finishLine} alt="Runner crossing finsih line" className="runner-img"/>
                <h1 className="blue landing-text large-text-shadow">Why catch it now?</h1>
            </div>
        </div>
    );

}

function HomePage() {
    return (
        <div className="container vertical-center">
            <div>
                <img src={logoImage} alt="Covid Aware logo" className="logo-img"/>
                <h1 className="landing-text">COVID Aware</h1>
                <p className="subheading-text">Your go-to COVID-19 risk calculator for planning activities</p>
                <div>
                    <div className="horizontal-center">
                        <Link to="/get-started" className="btn btn-primary get-started-btn">
                            Get Started
                        </Link>
                    </div>
                    <div className="horizontal-center learn-more-link">
                        <Link to="/about">
                            Learn more
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}