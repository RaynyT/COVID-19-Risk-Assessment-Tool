import './App.css';

import { useState } from 'react';

import Landing from './components/Landing.js';
import { Route } from 'react-router-dom';
import Tutorial from './components/Tutorial.js';
import InfoPage from './components/InfoPage.js';
import Calculator from './components/Calculator.js';
import Results from './components/Results.js'
import ContactUs from './components/ContactUs.js';
import Dashboard from './components/Dashboard.js';
import About from './components/About.js';
import Update from './components/Update.js'

function App() {

	// Hook from https://usehooks.com/useLocalStorage/
	function useLocalStorage(key, initialValue) {
		// State to store our value
		// Pass initial state function to useState so logic is only executed once
		const [storedValue, setStoredValue] = useState(() => {
			try {
				// Get from local storage by key
				const item = window.localStorage.getItem(key);
				// Parse stored json or if none return initialValue
				return item ? JSON.parse(item) : initialValue;
			} catch (error) {
				// If error also return initialValue
				console.log(error);
				return initialValue;
			}
		});
		// Return a wrapped version of useState's setter function that ...
		// ... persists the new value to localStorage.
		const setValue = (value) => {
			try {
				// Allow value to be a function so we have same API as useState
				const valueToStore =
					value instanceof Function ? value(storedValue) : value;
				// Save state
				setStoredValue(valueToStore);
				// Save to local storage
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			} catch (error) {
				// A more advanced implementation would handle the error case
				console.log(error);
			}
		};
		return [storedValue, setValue];
	}
	
	// Randomly generated and used to identify returning users on the backend
	const[userID, setUserID] = useLocalStorage("userID", null);

	// Distinguishes between first time users and users who have completed at least one survey
	const[surveyCompleted, setSurveyCompleted] = useLocalStorage("surveyCompleted", false);

	// Selections on the risk survey are saved as site-wide state variables as they are relevant
	// to both the risk calculator and the results screen and should be saved when navigating to other pages
	// Some default to certain selections, others like radio buttons default to none selected
	const [userLocation, setUserLocation] = useLocalStorage("userLocation", { stateCode: "WA", county: "King County" });
	const [vaccination, setVaccination] = useLocalStorage("vaccination", { type: "none", doseNumber: 0, effctiveDoseNumber: 0, twoWeeks: null});
	const [activityBasicInfo, setActivityBasicInfo] = useLocalStorage("activityBasicInfo", { setting: "none-selected", attendees: null, hours: null,  minutes: null});
	const [distancing, setDistancing] = useLocalStorage("distancing", "none-selected");
	const [speakingVolume, setSpeakingVolume] = useLocalStorage("speakingVolume", "none-selected");
	const [ownMask, setOwnMask] = useLocalStorage("ownMask", "none-selected");
	const [othersMask, setOthersMask] = useLocalStorage("othersMask", { type: "none-selected", numWearers: null });

	// Risk factor dependent on county covid levels
	const [personRisk, setPersonRisk] = useLocalStorage("personRisk", null);
	// County covid rates compared to national avg. Direction is a string of "higher" or "lower" for display purposes
	const [countyComparison, setCountyComparison] = useLocalStorage("countyComparison", {direction: null, rate: null});
	const [riskScore, setRiskScore] = useLocalStorage("riskScore", null);


	// Updates with all selections from a completed survey
	const updateAllSelections = (userLocation, vaccination, activityBasicInfo, distancing, speakingVolume, ownMask, othersMask) => {
		setUserLocation(userLocation);
		setVaccination(vaccination);
		setActivityBasicInfo(activityBasicInfo);
		setDistancing(distancing);
		setSpeakingVolume(speakingVolume);
		setOwnMask(ownMask);
		setOthersMask(othersMask);
	}	
	
	// This may be a cluttered way of handling this, but as of now I think having handler functions
	// for state variables is the reccomended method so that app state isn't exposed to child components
	
	const updateUserID = (userID) => {
		setUserID(userID)
	}

	const updateWithPreset = (preset) => {
		setActivityBasicInfo(preset.activityBasicInfo);
		setDistancing(preset.distancing);
		setSpeakingVolume(preset.volume);
		setOwnMask(preset.ownMask);
		setOthersMask(preset.othersMask);
	}

	const updateStateSelection = (stateCode) => {
		setUserLocation({stateCode: stateCode, county: userLocation.county});
	}

	const updateLocation = (stateCode, county) => {
		setUserLocation({stateCode: stateCode, county: county});
	}

	const updateActivityBasicInfo = (setting, attendees, hours, minutes) => {
		setActivityBasicInfo({
			setting: setting,
			attendees: attendees,
			hours: hours,
			minutes: minutes
		});
	}

	const updateActivitySetting = (setting) => {
		setActivityBasicInfo({
			setting: setting,
			attendees: activityBasicInfo.attendees,
			hours: activityBasicInfo.hours,
			minutes: activityBasicInfo.minutes
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

	const updateCountyComparison = (countyComparison) => {
		setCountyComparison(countyComparison);
	}

	const updatePersonRisk = (personRisk) => {
		setPersonRisk(personRisk);
	}

	const updateRiskScore = (riskScore) => {
		setRiskScore(riskScore);
	}
	
	let stateAndCallbacks = {
		userID: userID,
		updateUserID: updateUserID,
		userLocation: userLocation,
		updateStateSelection: updateStateSelection,
		updateLocation: updateLocation,
		vaccination: vaccination,
		updateVaccination: updateVaccination,
		updateVaccineType: updateVaccineType,
		updateWithPreset: updateWithPreset,
		activityBasicInfo: activityBasicInfo,
		updateActivityBasicInfo: updateActivityBasicInfo,
		updateActivitySetting: updateActivitySetting,
		distancing: distancing,
		updateDistancing: updateDistancing,
		speakingVolume: speakingVolume,
		updateSpeakingVolume: updateSpeakingVolume,
		ownMask: ownMask,
		updateOwnMask: updateOwnMask,
		othersMask: othersMask,
		updateOthersMaskType: updateOthersMaskType,
		updateOthersMaskNumWearers: updateOthersMaskNumWearers,
		updateAllSelections: updateAllSelections,
		countyComparison: countyComparison,
		updateCountyComparison: updateCountyComparison,
		personRisk: personRisk,
		updatePersonRisk: updatePersonRisk,
		riskScore: riskScore,
		updateRiskScore: updateRiskScore,
		surveyCompleted: surveyCompleted,
		updateSurveryCompleted: updateSurveryCompleted		
	}

	return (
		<div className="App">
			<header className="App-header">
			</header>
			<Route exact path="/" render={(routerProps) => (
				<Landing {...routerProps} surveyCompleted={surveyCompleted} /> 
			)} />
			<Route path="/get-started" component={Tutorial} />
			<Route path="/faq" render={(routerProps) => (
				<InfoPage {...routerProps} surveyCompleted={surveyCompleted} />
			)} />
			<Route path="/contact-us" render={(routerProps) => (
				<ContactUs {...routerProps} surveyCompleted={surveyCompleted} />
			)} />
			<Route path="/dashboard" render={(routerProps) => (
				<Dashboard {...routerProps} surveyCompleted={surveyCompleted} />
			)} />
			<Route path="/about" render={(routerProps) => (
				<About {...routerProps} surveyCompleted={surveyCompleted} />
			)} />
			<Route path="/calculator" render={(routerProps) => (
				<Calculator {...routerProps} {...stateAndCallbacks} />
			)} />
			<Route path="/results" render={(routerProps) => (
				<Results {...routerProps} {...stateAndCallbacks} />
			)} />
			<Route path="/update" render={(routerProps) => (
				<Update {...routerProps} {...stateAndCallbacks} />
			)} />
		</div>
	);
}

export default App;
