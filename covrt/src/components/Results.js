import { Button } from 'reactstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Results(){

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
    }

    return (
        <div>
            {tab}
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