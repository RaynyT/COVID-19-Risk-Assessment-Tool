import './InfoPage.css'
import { Collapse, Card, CardBody} from 'reactstrap'
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react';
import { useState } from 'react';

export default function InfoPage() {

    return (
        <div className="outer">
            <div className="info-main-container">
                <h1 className="info-title">Frequently Asked Questions</h1>
                <div>
                    <Dropdown title="What is CovidAware?" body="Test"/>
                    <Dropdown title="What is CovidAware?" body="Test"/>
                    <Dropdown title="What is CovidAware?" body="Test"/>
                    <Dropdown title="What is CovidAware?" body="Test"/>
                    <Dropdown title="What is CovidAware?" body="Test"/>
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
                <div>{props.title}</div>
                {isOpen
                    ? <ChevronUpIcon />
                    : <ChevronDownIcon />
                }
            </button>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody>
                        {props.body}
                    </CardBody>
                </Card>
            </Collapse>
            <hr className="info-hr" />
        </div>
    )
}