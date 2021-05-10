import './About.css'

import NavBar from './NavBar.js'

import chrisImage from '../images/chris.svg'
import dorisImage from '../images/doris.svg'
import raynaImage from '../images/rayna.svg'
import sandyImage from '../images/sandy.svg'


export default function About() {

    return (
        <div className="about-outer">
            <div className="about-main-container">
                <NavBar />
                <div className="team-container">
                    <h1 className="about-title">Meet the Team</h1>
                    <div className="container">
                        <div className="row team-row">
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
                        <div className="row team-row">
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

                </div>
            </div>
        </div>
    )
}