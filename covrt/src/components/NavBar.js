import { NavLink } from 'react-router-dom';

import './NavBar.css';

export default function NavBar(props) {

    return (
        <div className="nav-link-container">
            <NavLink to="/dashboard" className="nav-link-inactive" activeClassName="nav-link-active">
                Risk Dashboard
            </NavLink>
            <NavLink to="/about" className="nav-link-inactive" activeClassName="nav-link-active">
                About Us
            </NavLink>
            <NavLink to="/faq" className="nav-link-inactive" activeClassName="nav-link-active">
                FAQ
            </NavLink>
            <NavLink to="/contact-us" clasName="nav-link-inactive" activeClassName="nav-link-active">
                Contact Us
            </NavLink>
        </div>
    );
}