import './About.css'

import NavBar from './NavBar.js'
import ReactGA from 'react-ga';


export default function About() {
    ReactGA.pageview(window.location.pathname + window.location.search);


    return (
        <div className="about-outer">
            <div className="about-main-container">
                <NavBar />
            </div>
        </div>
    )
}