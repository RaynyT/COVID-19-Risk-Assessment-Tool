import './App.css';

import { useState } from 'react';

import Landing from './components/Landing.js';
import {Route} from 'react-router-dom';
import Tutorial from './components/Tutorial.js';
import InfoPage from './components/InfoPage.js';
import Calculator from './components/Calculator.js';
import Results from './components/Results.js'

function App() {

  // Selections on the risk survey are saved as site-wide state variables as they are relevant
  // to both the risk calculator and the results screen and should be saved when navigating to other pages
  // Some default to certain selections, others like radio buttons default to none selected
  const[location, setLocation] = useState({ state: "WA", county: "Pierce"});
  const[workStatus, setWorkStatus] = useState("none-selected");
  const[activityBasicInfo, setActivityBasicInfo] = useState({setting: "none-selected", attendees: 10, duration: 10});
  const[distancing, setDistancing] = useState("none-selected");
  const[speakingVolume, setSpeakingVolume] = useState("none-selected");
  const[ownMask, setOwnMask] = useState("none-selected");
  const[othersMask, setOthersMask] = useState({type: "none-selected", percent: 100});


  // This may be a cluttered way of handling this, but as of now I think having handler functions
  // for state variables is the reccomended method so that app state isn't exposed to child components

  const updateWorkStatus = (event) => {
      console.log(event.target.name);
      setWorkStatus(event.target.value);
  }

  const updateActivitySetting = (event) => {
      setActivityBasicInfo({
          setting: event.target.value,
          attendees: activityBasicInfo.attendees,
          duration: activityBasicInfo.duration
      });
  }
  
  const updateDistancing = (event) => {
      setDistancing(event.target.value);
  }

  const updateSpeakingVolume = (event) => {
      setSpeakingVolume(event.target.value);
  }

  const updateOwnMask = (event) => {
      setOwnMask(event.target.value);
  }

  const updateOthersMaskType = (event) => {
      setOthersMask({type: event.target.value, percent: othersMask.percent});
  }

  let stateAndCallbacks = {
    location: location,
    workStatus: workStatus,
    updateWorkStatus: updateWorkStatus,
    activityBasicInfo: activityBasicInfo,
    updateActivitySetting: updateActivitySetting,
    distancing: distancing,
    updateDistancing: updateDistancing,
    speakingVolume: speakingVolume,
    updateSpeakingVolume: updateSpeakingVolume,
    ownMask: ownMask,
    updateOwnMask: updateOwnMask,
    othersMask: othersMask,
    updateOthersMaskType: updateOthersMaskType
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Route exact path="/" component={Landing}/>
      <Route path="/get-started" component={Tutorial}/>
      <Route path="/about" component={InfoPage}/>
      <Route path="/calculator" render={(routerProps) => (
        <Calculator {...routerProps} {...stateAndCallbacks} />
      )}/>
      <Route path="/results" render={(routerProps) => (
        <Results {...routerProps} {...stateAndCallbacks} />
      )}/>
    </div>
  );
}

export default App;
