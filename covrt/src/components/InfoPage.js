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
                <h1 className="info-title">Frequently Asked Questions</h1>
                <div>
                    <Dropdown title="What is CovidAware?" body="Test"/>
                    <Dropdown title="Does CovidAware share my information with a third party?" body="Test"/>
                    <Dropdown title="What is CovidAware?" body="Test"/>
                    <Dropdown title="What is CovidAware?" body="Test"/>
                    <Dropdown title="What is CovidAware?" body="Test"/>
                </div>
                <div className="horizontal-center">
                    <Link to="/contact-us" className="btn btn-outline-primary">
                        More questions? Contact us
                    </Link>
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