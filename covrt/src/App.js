import './App.css';

import { useState } from 'react';

import Landing from './components/Landing.js';
import { Route } from 'react-router-dom';
import Tutorial from './components/Tutorial.js';
import InfoPage from './components/InfoPage.js';
import Calculator from './components/Calculator.js';
import Results from './components/Results.js'

function App() {

	// Selections on the risk survey are saved as site-wide state variables as they are relevant
	// to both the risk calculator and the results screen and should be saved when navigating to other pages
	// Some default to certain selections, others like radio buttons default to none selected
	const [location, setLocation] = useState({ state: "WA", county: "Pierce" });
	const [workStatus, setWorkStatus] = useState("none-selected");
	const [activityBasicInfo, setActivityBasicInfo] = useState({ setting: "none-selected", attendees: null, hours: null,  minutes: null});
	const [distancing, setDistancing] = useState("none-selected");
	const [speakingVolume, setSpeakingVolume] = useState("none-selected");
	const [ownMask, setOwnMask] = useState("Cotton Mask");
	const [othersMask, setOthersMask] = useState({ type: "Cotton Mask", percent: 100 });


	// This may be a cluttered way of handling this, but as of now I think having handler functions
	// for state variables is the reccomended method so that app state isn't exposed to child components

	const updateStateSelection = (event) => {
		setLocation({state: event.target.value, county: location.county});
	}

	const updateCountySelection = (event) => {
		setLocation({state: location.state, county: event.target.value});
	}

	const updateWorkStatus = (event) => {
		setWorkStatus(event.target.value);
	}

	const updateActivitySetting = (event) => {
		setActivityBasicInfo({
			setting: event.target.value,
			attendees: activityBasicInfo.attendees,
			hours: activityBasicInfo.hours,
			minutes: activityBasicInfo.minutes
		});
	}

	const updateActivityBasicInfo = (attendees, hours, minutes) => {
		setActivityBasicInfo({
			setting: activityBasicInfo.setting,
			attendees: attendees,
			hours: hours,
			minutes: minutes
		});
	}

	const updateDistancing = (event) => {
		setDistancing(event.target.value);
	}

	const updateSpeakingVolume = (event) => {
		setSpeakingVolume(event.target.value);
	}

	const updateOwnMask = (maskType) => {
		setOwnMask(maskType);
	}

	const updateOthersMaskType = (maskType) => {
		setOthersMask({ type: maskType, percent: othersMask.percent });
	}

	const updateOthersMaskPercent = (percent) => {
		setOthersMask({type: othersMask.type, percent: percent})
	}

	let stateAndCallbacks = {
		location: location,
		updateStateSelection: updateStateSelection,
		updateCountySelection: updateCountySelection,
		workStatus: workStatus,
		updateWorkStatus: updateWorkStatus,
		activityBasicInfo: activityBasicInfo,
		updateActivitySetting: updateActivitySetting,
		updateActivityBasicInfo: updateActivityBasicInfo,
		distancing: distancing,
		updateDistancing: updateDistancing,
		speakingVolume: speakingVolume,
		updateSpeakingVolume: updateSpeakingVolume,
		ownMask: ownMask,
		updateOwnMask: updateOwnMask,
		othersMask: othersMask,
		updateOthersMaskType: updateOthersMaskType,
		updateOthersMaskPercent: updateOthersMaskPercent
	}

	return (
		<div className="App">
			<header className="App-header">
			</header>
			<Route exact path="/" component={Landing} />
			<Route path="/get-started" component={Tutorial} />
			<Route path="/about" component={InfoPage} />
			<Route path="/calculator" render={(routerProps) => (
				<Calculator {...routerProps} {...stateAndCallbacks} />
			)} />
			<Route path="/results" render={(routerProps) => (
				<Results {...routerProps} {...stateAndCallbacks} />
			)} />
		</div>
	);
}

export default App;
