import riskMeterImage from '../images/risk-meter.svg'

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
            numericValues[props.ownMask] * numericValues[props.othersMask.type] * props.othersMask.percent *
            numericValues[props.distancing] * numericValues[props.speakingVolume]
        );
    }

    return (
        <div>
            <div>
                <h1>Risk Summary</h1>
                <h2>Risk score: {calculateRiskScore()}</h2>
                <img alt="Risk meter" src={riskMeterImage} />
            </div>
            <div>
                <h2>Activity</h2>
                <ul>
                    <li>Activity Environment: {props.activityBasicInfo.setting}</li>
                    <li>Duration: {props.activityBasicInfo.hours}h {props.activityBasicInfo.minutes}m</li>
                    <li>Number of People: {props.activityBasicInfo.attendees}</li>
                    <li>Physical Distancing: {props.distancing}</li>
                    <li>Speaking Volume: {props.activityBasicInfo.setting}</li>
                    <li>Your Mask: {props.ownMask}</li>
                    <li>Others' Mask: {props.othersMask.type}</li>
                    <li>Number of Others Wearing Masks: {Math.round(props.othersMask.percent / 100 * props.activityBasicInfo.attendees)}</li>
                </ul>
            </div>
        </div>
    );
}