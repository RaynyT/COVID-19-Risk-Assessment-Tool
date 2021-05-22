import './Dashboard.css'

import { Link } from 'react-router-dom'
import NavBar from './NavBar.js'

import riskSummaryIcon from '../images/risk-summary-icon.svg'
import updateIcon from '../images/update-icon.svg'
import vaccineIcon from '../images/vaccine-icon.svg'
import startNewIcon from '../images/start-new-icon.svg'


export default function Dashboard(props) {

    return (
        <div className="dashboard-outer">
            <div className="dashboard-main-container">
                <NavBar surveyCompleted={props.surveyCompleted} />
                <h1 className="dashboard-title">Risk Dashboard</h1>
                <div className="container dashboard-btn-container">
                    <div className="row img-link-row">
                        <div className="col-6 d-flex justify-content-center">
                            <RouterImageLink link={{pathname: "/results", fromDashboard: true}} image={riskSummaryIcon} desc="Risk Summary" 
                            alt="Illustration of a piece of paper with graphs and charts" colorClass="blue-link" />
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <ExternalImageLink link="https://www.vaccines.gov/" image={vaccineIcon} desc="Find a Vaccine" 
                            alt="Illustration of a medical vial and syringe" colorClass="green-link" />
                        </div>
                    </div>
                    <div className="row img-link-row">
                        <div className="col-6 d-flex justify-content-center">
                            <RouterImageLink link="/update" image={updateIcon} desc="Update location & vaccine status"
                            alt="Illustration of a checkmark" colorClass= "yellow-link" />
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <RouterImageLink link={{pathname: "/calculator", fromStartNewButton: true}} image={startNewIcon} desc="Start a new activity" 
                            alt="Illustration of a rocket ship" colorClass="orange-link" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ImageLink(props) {

    let linkClass = "img-link " + props.colorClass;

    return (
        <div className={linkClass}>
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