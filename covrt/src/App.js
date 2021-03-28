import './App.css';
import Landing from './components/Landing.js';
import {Route} from 'react-router-dom';
import Tutorial from './components/Tutorial.js';
import InfoPage from './components/InfoPage.js';
import Calculator from './components/Calculator.js';
import Results from './components/Results.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Route exact path="/" component={Landing}/>
      <Route path="/get-started" component={Tutorial}/>
      <Route path="/about" component={InfoPage}/>
      <Route path="/calculator" component={Calculator}/>
      <Route path="/results" component={Results} />
    </div>
  );
}

export default App;
