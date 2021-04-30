import './App.css';

import { useState } from 'react';

import Landing from './components/Landing.js';
import { Route } from 'react-router-dom';
import Tutorial from './components/Tutorial.js';
import InfoPage from './components/InfoPage.js';
import Calculator from './components/Calculator.js';
import Results from './components/Results.js'
import ContactUs from './components/ContactUs';
import Dashboard from './components/Dashboard';
import About from './components/About';

function App() {

	const[surveyCompleted, setSurveyCompleted] = useState(false);

	// Selections on the risk survey are saved as site-wide state variables as they are relevant
	// to both the risk calculator and the results screen and should be saved when navigating to other pages
	// Some default to certain selections, others like radio buttons default to none selected
	const [userLocation, setUserLocation] = useState({ stateCode: "WA", county: "Pierce" });
	const [vaccination, setVaccination] = useState({ type: "No", doseNumber: 0, twoWeeks: null});
	const [activityBasicInfo, setActivityBasicInfo] = useState({ setting: "none-selected", attendees: null, hours: null,  minutes: null});
	const [distancing, setDistancing] = useState("6 feet");
	const [speakingVolume, setSpeakingVolume] = useState("Speaking normally");
	const [ownMask, setOwnMask] = useState("Cotton Mask");
	const [othersMask, setOthersMask] = useState({ type: "Cotton Mask", numWearers: 100 });
	
	
	// This may be a cluttered way of handling this, but as of now I think having handler functions
	// for state variables is the reccomended method so that app state isn't exposed to child components
	
	const updateWithPreset = (preset) => {
		setActivityBasicInfo(preset.activityBasicInfo);
		setDistancing(preset.distancing);
		setSpeakingVolume(preset.volume);
		setOwnMask(preset.ownMask);
		setOthersMask(preset.othersMask);
	}
	const updateStateSelection = (event) => {
		setUserLocation({stateCode: event.target.value, county: userLocation.county});
	}

	const updateCountySelection = (event) => {
		setUserLocation({stateCode: userLocation.state, county: event.target.value});
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

	const updateDistancing = (distance) => {
		setDistancing(distance);
	}

	const updateSpeakingVolume = (volume) => {
		setSpeakingVolume(volume);
	}

	const updateOwnMask = (maskType) => {
		setOwnMask(maskType);
	}

	const updateOthersMaskType = (maskType) => {
		setOthersMask({ type: maskType, numWearers: othersMask.numWearers });
	}

	const updateOthersMaskNumWearers = (numWearers) => {
		setOthersMask({type: othersMask.type, numWearers: numWearers})
	}

	const updateSurveryCompleted = (completed) => {
		setSurveyCompleted(completed);
	}

	// The vaccine selection is handled separate from the vaccine page submission
    // so that the state will change and re-render the form based on vaccine type
	const updateVaccineType = (vaccineType) => {
		setVaccination({type: vaccineType, doseNumber: vaccination.doseNumber, twoWeeks: vaccination.twoWeeks })
	}

	const updateVaccination = (vaccination) => {
		setVaccination(vaccination);
	}
	
	
	let stateAndCallbacks = {
		userLocation: userLocation,
		updateStateSelection: updateStateSelection,
		updateCountySelection: updateCountySelection,
		vaccination: vaccination,
		updateVaccination: updateVaccination,
		updateVaccineType: updateVaccineType,
		updateWithPreset: updateWithPreset,
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
		updateOthersMaskNumWearers: updateOthersMaskNumWearers,
		surveyCompleted: surveyCompleted,
		updateSurveryCompleted: updateSurveryCompleted		
	}

	return (
		<div className="App">
			<header className="App-header">
			</header>
			<Route exact path="/" component={Landing} />
			<Route path="/get-started" component={Tutorial} />
			<Route path="/faq" component={InfoPage} />
			<Route path="/contact-us" component={ContactUs} />
			<Route path="/dashboard" component={Dashboard} />
			<Route path="/about" component={About}/>
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
