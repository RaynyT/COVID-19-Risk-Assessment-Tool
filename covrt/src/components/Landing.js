
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
        <div onClick={props.clickCallback}>
            <h1 className="blue">It has been</h1>
            <h1 className="blue">{daysSince} days</h1>
            <h1 className="blue">since the US was exposed to COVID-19</h1>
            <img src={finishLine} alt="Runner crossing finsih line"/>
            <h1 className="blue">Why catch it now?</h1>
        </div>
    );

}

function HomePage() {
    return (
        <div>
            <img src={logoImage} />
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