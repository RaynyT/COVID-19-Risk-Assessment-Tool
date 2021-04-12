
import moment from 'moment';
import { useState } from 'react';
import './Landing.css';
import finishLine from '../images/finish-line.svg'
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import logoImage from '../images/covidAwareLogo.svg';

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
                <img src={finishLine} alt="Runner crossing finsih line"/>
                <h1 className="blue landing-text large-text-shadow">Why catch it now?</h1>
            </div>
        </div>
    );

}

function HomePage() {
    return (
        <div>
            <img src={logoImage} alt="Covid Aware logo"/>
            <p>Your go-to COVID-19 risk calculator for planning activities</p>
            <div>
                <Link to="/get-started">
                    <Button color="primary">Get Started</Button>
                </Link>
            </div>
            <div>
                <Link to="/about">
                    Learn more
                </Link>
            </div>
        </div>
    );
}