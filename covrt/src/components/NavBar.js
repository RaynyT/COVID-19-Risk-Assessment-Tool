import { NavLink } from 'react-router-dom';

import './NavBar.css';

export default function NavBar(props) {

    // If the user hasn't completed a survey yet
    // first link should go to "get started"
    // else, go to dashboard

    let firstLinkPath = "/get-started"
    let firstLinkText = "Get Started"
    if (props.surveyCompleted) {
        firstLinkPath = "/dashboard"
        firstLinkText = "Risk Dashboard"
    }

    return (
        <div className="nav-link-container">
            <NavLink to={firstLinkPath} className="nav-link-inactive" activeClassName="nav-link-active">
                {firstLinkText}
            </NavLink>
            <NavLink to="/about" className="nav-link-inactive" activeClassName="nav-link-active">
                About
            </NavLink>
            <NavLink to="/faq" className="nav-link-inactive" activeClassName="nav-link-active">
                FAQ
            </NavLink>
            <NavLink to="/contact-us" className="nav-link-inactive" activeClassName="nav-link-active">
                Contact Us
            </NavLink>
        </div>
    );
}