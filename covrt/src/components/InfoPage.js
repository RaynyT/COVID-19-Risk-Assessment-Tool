import './InfoPage.css'

import { Collapse, Card, CardBody} from 'reactstrap'
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar.js'


export default function InfoPage() {

    return (
        <div className="info-outer">
            <div className="info-main-container">
                <NavBar />
                <div className="info-content">
                    <h1 className="info-title">Frequently Asked Questions</h1>
                    <div>
                        <Dropdown title="What is CovidAware?" body="Test"/>
                        <Dropdown title="How do I use CovidAware?" body="Test"/>
                        <Dropdown 
                            title="Does CovidAware share my information with a third party?" 
                            body="All information that is entered into the risk calculator is kept anonymous and no identifying information is stored. High level summaries of the data gained from the project will be shared with our partners at the University of Washington Information School and the City of Seattle Innovation & Perfomance team, but individual calculator submissions will not be shared."
                        />
                        <Dropdown 
                            title="Does CovidAware track my location?" 
                            body="No. CovidAware does not track your location. The only information about your location that is gathered comes from the State and County input in the risk calculator. This location information is kept anonymous and not attached to any identifying information."
                        />
                        <Dropdown title="How does the algorithm work?" body="Test"/>
                        <Dropdown title="Why aren't other factors like health included in the survey algorithm?" body="Test"/>
                        <Dropdown title="How do I interpret my risk score?" body="Test"/>
                        <Dropdown title="Who should use CovidAware?" body="Test"/>
                    </div>
                    <div className="horizontal-center">
                        <Link to="/contact-us" className="btn btn-outline-primary">
                            More questions? Contact us
                        </Link>
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