import './About.css';

import NavBar from './NavBar.js';

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
                <div className="team-container">
                    <h1 className="about-title">Meet the Team</h1>
                    <div className="container">
                        <div className="row about-row">
                            <div className="col-6 d-flex justify-content-center">
                                <div>
                                    <img className="team-image" src={raynaImage} alt="Rayna"/>
                                    <h2 className="team-member-name">Rayna Tilley</h2>
                                    <p className="team-member-role">Product Manager</p>
                                    <p className="team-member-role">Back-end Developer</p>
                                </div>
                            </div>
                            <div className="col-6 d-flex justify-content-center">
                                <div>
                                    <img className="team-image" src={chrisImage} alt="Chris"/>
                                    <h2 className="team-member-name">Chris Hogan</h2>
                                    <p className="team-member-role">Front-end Developer</p>
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
                                    <p className="team-member-role">Data Engineer</p>
                                    <p className="team-member-role">Back-end Developer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sponsor-container">
                    <h1 className="about-title">Our Sponsors</h1>
                    <div className="container">
                        <div className="row about-row">
                            <div className="col-6 d-flex justify-content-center">
                                <img src={informaticsLogo} alt="University of Washington Informatics Logo" />
                            </div>
                            <div className="col-6 d-flex justify-content-center">
                                <img src={seattleLogo} alt="City of Seattle Logo" />
                            </div>
                        </div>
                        <div className="row about-row bottom-row">
                            <div className="col-12 d-flex justify-content-center">
                                <img src={publicHealthLogo} alt="University of Washington Public Health Logo" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}