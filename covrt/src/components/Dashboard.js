import './Dashboard.css'

import { Link } from 'react-router-dom'
import NavBar from './NavBar.js'

import riskSummaryIcon from '../images/risk-summary-icon.svg'
import tipsIcon from '../images/tips-icon.svg'
import updateIcon from '../images/update-icon.svg'
import shareIcon from '../images/share-icon.svg'
import vaccineIcon from '../images/vaccine-icon.svg'
import startNewIcon from '../images/start-new-icon.svg'
import dataIcon from '../images/data-icon.svg'

export default function Dashboard() {
    
    let tipsLink = {pathname: "/results", fromTipsButton: true}

    return (
        <div className="dashboard-outer">
            <div className="dashboard-main-container">
                <NavBar />
                <h1 className="dashboard-title">Risk Dashboard</h1>
                <div className="container">
                    <div className="row img-link-row">
                        <div className="col-6 d-flex justify-content-center">
                            <RouterImageLink link="/results" image={riskSummaryIcon} desc="Risk Summary" 
                            alt="Illustration of a piece of paper with graphs and charts" />
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <RouterImageLink link={tipsLink} image={tipsIcon} desc="Tips to lower risk" 
                            alt="Illustration of a lightbulb" />
                        </div>
                    </div>
                    <div className="row img-link-row">
                            <div className="col-6 d-flex justify-content-center">
                                <ExternalImageLink link="https://www.doh.wa.gov/Emergencies/COVID19/vaccine" image={vaccineIcon} desc="Vaccine Information" 
                                alt="Illustration of a medical vial and syringe" />
                            </div>
                            <div className="col-6 d-flex justify-content-center">
                                <RouterImageLink link={tipsLink} image={tipsIcon} desc="Tips to lower risk" 
                                alt="Illustration of a lightbulb" />
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

function ImageLink(props) {
    return (
        <div className="img-link">
            <div className="img-link-content">
                <div className="img-link-image-container">
                    <img className="img-link-img" src={props.image} alt={props.alt} />
                </div>
                <div className="img-link-text">
                    {props.desc}
                </div>
            </div>
        </div>
    )
}

function RouterImageLink(props) {
    
    return(
        <Link to={props.link}>
            <ImageLink {...props} />
        </Link>
    );
}

function ExternalImageLink(props) {
    
    return(
        <a href={props.link}>
            <ImageLink {...props} />
        </a>
    );
}