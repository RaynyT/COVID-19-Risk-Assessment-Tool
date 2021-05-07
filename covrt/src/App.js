import './App.css';

import { useState } from 'react';
import ReactGA from 'react-ga';

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

	ReactGA.initialize("G-KM183KX3SB");

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

	const[surveyCompleted, setSurveyCompleted] = useLocalStorage("surveyCompleted", false);

	// Selections on the risk survey are saved as site-wide state variables as they are relevant
	// to both the risk calculator and the results screen and should be saved when navigating to other pages
	// Some default to certain selections, others like radio buttons default to none selected
	const [userLocation, setUserLocation] = useLocalStorage("userLocation", { stateCode: "WA", county: "Pierce" });
	const [vaccination, setVaccination] = useLocalStorage("vaccination", { type: "None", doseNumber: 0, effctiveDoseNumber: 0, twoWeeks: null});
	const [activityBasicInfo, setActivityBasicInfo] = useLocalStorage("activityBasicInfo", { setting: "none-selected", attendees: null, hours: null,  minutes: null});
	const [distancing, setDistancing] = useLocalStorage("distancing", "none-selected");
	const [speakingVolume, setSpeakingVolume] = useLocalStorage("speakingVolume", "none-selected");
	const [ownMask, setOwnMask] = useLocalStorage("ownMask", "none-selected");
	const [othersMask, setOthersMask] = useLocalStorage("othersMask", { type: "none-selected", numWearers: 100 });
	
	
	// This may be a cluttered way of handling this, but as of now I think having handler functions
	// for state variables is the reccomended method so that app state isn't exposed to child components
	
	const updateWithPreset = (preset) => {
		setActivityBasicInfo(preset.activityBasicInfo);
		setDistancing(preset.distancing);
		setSpeakingVolume(preset.volume);
		setOwnMask(preset.ownMask);
		setOthersMask(preset.othersMask);
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
		updateLocation: updateLocation,
		vaccination: vaccination,
		updateVaccination: updateVaccination,
		updateVaccineType: updateVaccineType,
		updateWithPreset: updateWithPreset,
		activityBasicInfo: activityBasicInfo,
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
			<Route exact path="/" render={(routerProps) => (
				<Landing {...routerProps} surveyCompleted={surveyCompleted} /> 
			)} />
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
			<Route path="/update" render={(routerProps) => (
				<Update {...routerProps} {...stateAndCallbacks} />
			)} />
		</div>
	);
}

export default App;
