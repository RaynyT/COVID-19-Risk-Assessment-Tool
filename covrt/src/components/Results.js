import riskMeterImage from '../images/risk-meter.svg'

import "./Results.css"
import { Button } from 'reactstrap'

export default function Results(props){

    // TODO
    // Should find a way to make these not dependent on the names of the selections
    // That way it will be easier to change if the wording of the questions change

    // TODO: Find a way to make fractions work in a JSON object

    const numericValues = {
        "Indoor": 1,
        "Outdoor": .05,
        "Less than 6 feet": 1,
        "6 feet": .5,
        "9 feet": .25,
        "More than 9 feet": .125,
        "Not speaking": .20,
        "Speaking normally": 1,
        "Speaking loudly or shouting": 5,
        "Thick cotton mask": .6666666666,
        "Surgical mask": .5,
        "K9N5 mask": .3333333333,
        "No mask": 1
    }

    const calculateRiskScore = () => {
        return (
            numericValues[props.activityBasicInfo.setting] * props.activityBasicInfo.attendees *
            (props.activityBasicInfo.hours + (props.activityBasicInfo.minutes / 60)) *
            numericValues[props.ownMask] * (numericValues[props.othersMask.type] * props.othersMask.percent) *
            numericValues[props.distancing] * numericValues[props.speakingVolume]
        );
    }

    return (
        <div>
            <div>
                <h1 className="risk-title">Risk Summary</h1>
                <h2 className="risk-level-text">Risk score: {calculateRiskScore()}</h2>
                <img className="risk-level-img" alt="Risk meter" src={riskMeterImage} />
            </div>
            <div className="horizontal-center">
                <div>
                    <h3 className="list-title">Activity</h3>
                    <ul className="selection-list">
                        <li className="selection-list-item">Activity Environment: <span className="blue">{props.activityBasicInfo.setting}</span></li>
                        <li className="selection-list-item">Duration: <span className="blue">{props.activityBasicInfo.hours}h {props.activityBasicInfo.minutes}m</span></li>
                        <li className="selection-list-item">Number of People: <span className="blue">{props.activityBasicInfo.attendees}</span></li>
                        <li className="selection-list-item">Physical Distancing: <span className="blue">{props.distancing}</span></li>
                        <li className="selection-list-item">Speaking Volume: <span className="blue">{props.activityBasicInfo.setting}</span></li>
                        <li className="selection-list-item">Your Mask: <span className="blue">{props.ownMask}</span></li>
                        <li className="selection-list-item">Others' Mask: <span className="blue">{props.othersMask.type}</span></li>
                        <li className="selection-list-item">Number of Others Wearing Masks: <span className="blue">{Math.round(props.othersMask.percent / 100 * props.activityBasicInfo.attendees)}</span></li>
                    </ul>
                    <h3 className="list-title">Demographic</h3>
                    <ul className="selection-list">
                        <li className="selection-list-item">State: <span className="blue">{props.location.state}</span></li>
                        <li className="selection-list-item">County: <span className="blue">{props.location.county}</span></li>
                        <li className="selection-list-item">Work Status: <span className="blue">{props.workStatus}</span></li>
                    </ul>
                </div>
            </div>
            <Button>How is my risk calculated?</Button>
        </div>
    );
}