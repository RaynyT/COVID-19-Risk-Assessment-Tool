import './About.css';

import NavBar from './NavBar.js';
import { Collapse, Card, CardBody} from 'reactstrap'
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react';
import { useState } from 'react';

import chrisImage from '../images/chris.svg';
import dorisImage from '../images/doris.svg';
import raynaImage from '../images/rayna.svg';
import sandyImage from '../images/sandy.svg';

import publicHealthLogo from '../images/public-health-logo.svg';
import informaticsLogo from '../images/informatics-logo.svg';
import seattleLogo from '../images/seattle-logo.svg'


export default function About() {

    return (
        <div className="about-outer">
            <div className="about-main-container">
                <NavBar />
                <div className="info-container">
                <Dropdown 
                    title="About CovidAware" 
                    body={
                        <div>
                            <p>
                                CovidAware is your go-to COVID-19 risk assessment tool that calculates the probability of contracting the virus given the type of in-person social activity and the county the activity takes place in.
                            </p>
                            <p>
                                The application was designed and built by four Informatics students from the University of Washington as part of their senior capstone project, while the COVID-19 risk algorithm was created by a graduate student from the University of Washington School of Public Health. You can read more about our team below.
                            </p>
                        </div>
                    }
                />
                <Dropdown 
                    title="Our Mission" 
                    body=
                    {
                        <div>
                            <p>
                                Our mission is to help users make informed decisions when planning social activities and hopefully reduce the spread of COVID by providing our users with safer alternatives and adjustments to those activites.
                            </p>
                        </div>
                    }
                />
                </div>
                <div className="team-container">
                    <h1 className="about-title">Meet the Team</h1>
                    <div className="container">
                        <div className="row about-row">
                            <div className="col-6 d-flex justify-content-center">
                                <div>
                                    <img className="team-image" src={raynaImage} alt="Rayna"/>
                                    <h2 className="team-member-name">Rayna Tilley</h2>
                                    <p className="team-member-role">Technical Lead</p>
                                    <p className="team-member-role">Backend Developer</p>
                                    <p className="team-member-role">Database Administrator</p>
                                </div>
                            </div>
                            <div className="col-6 d-flex justify-content-center">
                                <div>
                                    <img className="team-image" src={chrisImage} alt="Chris"/>
                                    <h2 className="team-member-name">Chris Hogan</h2>
                                    <p className="team-member-role">Frontend Developer</p>
                                    <p className="team-member-role">UI/UX Consultant</p>
                                    <p className="team-member-role">Technical Consultant</p>
                                </div>
                            </div>
                        </div>
                        <div className="row about-row">
                            <div className="col-6 d-flex justify-content-center">
                                <div >
                                    <img className="team-image" src={sandyImage} alt="Sandy"/>
                                    <h2 className="team-member-name">Sandy Hsiao</h2>
                                    <p className="team-member-role">UI/UX Designer</p>
                                    <p className="team-member-role">Graphic Designer</p>
                                </div>
                            </div>
                            <div className="col-6 d-flex justify-content-center">
                                <div>
                                    <img className="team-image" src={dorisImage} alt="Doris"/>
                                    <h2 className="team-member-name">Doris Liu</h2>
                                    <p className="team-member-role">Data Scientist</p>
                                    <p className="team-member-role">Database Administrator</p>
                                </div>
                            </div>
                        </div>
                        <div className="row about-row">
                                <div className="col-12 d-flex justify-content-center">
                                    <div>
                                        <h2 className="team-member-name">Iris Jia</h2>
                                        <p className="team-member-role">Algorithm Designer</p>
                                        <p className="team-member-role">Public Health Liason</p>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="sponsor-container">
                    <h1 className="about-title">Our Sponsors</h1>
                    <h1 className="about-title">TESTING</h1>
                    <div className="container">
                        <div className="row about-row">
                            <div className="col-6">
                                <img className="sponsor-image" src={informaticsLogo} alt="University of Washington Informatics Logo" />
                            </div>
                            <div className="col-6">
                                <img className="sponsor-image" src={seattleLogo} alt="City of Seattle Logo" />
                            </div>
                        </div>
                        <div className="row about-row">
                            <div className="col-12">
                                <img className="sponsor-image" src={publicHealthLogo} alt="University of Washington Public Health Logo" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Dropdown(props) {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <button className="dropdown-btn" onClick={toggle}>
                <div className="chevron-container">
                    {isOpen
                        ? <ChevronUpIcon size={24} />
                        : <ChevronDownIcon size={24} />
                    }
                </div>
                {props.title}
            </button>
            <Collapse isOpen={isOpen}>
                <Card className="border-0">
                    <CardBody>
                        {props.body}
                    </CardBody>
                </Card>
            </Collapse>
            <hr className="info-hr" />
        </div>
    )
}