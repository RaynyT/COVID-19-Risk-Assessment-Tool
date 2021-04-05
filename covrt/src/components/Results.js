import { Button } from 'reactstrap';
import { useState } from 'react';

export default function Results(props){


    // Should find a way to make these not dependent on the names of the selections
    // That way it will be easier to change if the wording of the questions change


    // Test that fractions work properly or else round to .6666 or something

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
        "Thick cotton mask": (2/3),
        "Surgical mask": .5,
        "K9N5 mask": (1/3),
        "No mask": 1
    }

    const calculateRiskScore = () => {
        return (
            numericValues[props.activityBasicInfo.setting] *
            numericValues[props.ownMask] * numericValues[props.othersMask.type] *
            numericValues[props.distancing] * numericValues[props.speakingVolume]
        );
    }


    const[tabChoice, setTabChoice] = useState(0);

    let tab = <div></div>;

    const switchToReduceTab = () => {
        setTabChoice(1);
    }

    const switchToResultsTab = () => {
        setTabChoice(0);
    }

    switch(tabChoice) {
        case 0:
            tab = <RiskSummary handleTabSwitch={switchToReduceTab} />;
            break;
        case 1:
            tab = <ReduceRisk handleTabSwitch={switchToResultsTab} />;
            break;
        default:
            tab = <RiskSummary handleTabSwitch={switchToResultsTab} />;
    }

    return (
        <div>
            <h1>Risk score: {calculateRiskScore()}</h1>
        </div>
    );
}

function RiskSummary(props){
    return (
        <div>
            <Button color="primary" disabled>Risk Summary</Button>
            <Button color="primary" onClick={props.handleTabSwitch}>Reduce my risk</Button>
        </div>
    );
}


function ReduceRisk(props){
    return (
        <div>
            <Button color="primary" onClick={props.handleTabSwitch}>Risk Summary</Button>
            <Button color="primary" disabled>Reduce my risk</Button>
        </div>
    );
}