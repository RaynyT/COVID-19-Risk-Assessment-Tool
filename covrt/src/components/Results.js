import { Button } from 'reactstrap';
import { useState } from 'react';

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
            numericValues[props.ownMask] * numericValues[props.othersMask.type] *
            numericValues[props.distancing] * numericValues[props.speakingVolume]
        );
    }

    return (
        <div>
            <h1>Risk score: {calculateRiskScore()}</h1>
        </div>
    );
}