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
                        <Dropdown 
                            title="What is CovidAware?" 
                            body="CovidAware is your go-to COVID-19 risk assessment tool that calculates the probability of contracting the virus given the type of social activity and the county the activity takes place in."
                        />
                        <Dropdown 
                            title="How do I use CovidAware?" 
                            body=
                            {
                                <div>
                                    <p>
                                        To use CovidAware, simply complete the <Link to="/calculator">risk survey </Link>
                                        by giving a few details about an activity you are planning, or select an activity from one of our presets. Once the survey is completed you will recieve a risk score for your activity.
                                    </p>
                                    <p>
                                        For more help, check out our <Link to="/get-started">tutorial </Link>
                                    </p>
                                </div>
                            }
                        />
                        <Dropdown 
                            title="Does CovidAware share my information with a third party?" 
                            body={
                                <div>
                                    <p>
                                        All information that is entered into the risk calculator is kept anonymous and no identifying information is stored.
                                    </p> 
                                    <p>
                                        High level summaries of the data gained from the project will be shared with our partners at the University of Washington Information School and the City of Seattle Innovation & Perfomance team, but individual calculator submissions will not be shared.
                                    </p>
                                </div>
                            }
                        />
                        <Dropdown 
                            title="Does CovidAware track my location?" 
                            body= {
                                <div>
                                    <p>
                                        No. CovidAware does not track your location.
                                    </p> 
                                    <p>
                                        The only information about your location that is gathered comes from the State and County input in the risk calculator. This location information is kept anonymous and not attached to any identifying information.
                                    </p>
                                </div>
                            }
                        />
                        <Dropdown title="How does the algorithm work?" body="Test"/>
                        <Dropdown
                            title="Why aren't other factors like health included in the survey algorithm?" 
                            body={
                                <div>
                                    <p>
                                        CovidAware focuses on the risk factors in our survey to keep the tool more intuitive and simple without having to ask for personal health information.
                                    </p> 
                                    <p>
                                        If you have concerns about how your health affects your covid risk, please consult a healthcare professional.
                                    </p>
                                </div>
                            }
                        />
                        <Dropdown title="How do I interpret my risk score?" body="TBD"/>
                        <Dropdown 
                            title="Who should use CovidAware?" 
                            body=
                            {
                                <div>
                                    <p>
                                        Everyone is encouraged to use CovidAware.
                                    </p> 
                                    <p>
                                        We are piloting with Washington state right now. In the future, we plan to expand nationally with accurate data for all states in the United States
                                    </p>
                                </div>
                            }
                        />
                    </div>
                    <div className="horizontal-center more-questions-btn">
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