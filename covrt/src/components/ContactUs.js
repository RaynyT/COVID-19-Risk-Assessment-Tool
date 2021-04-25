import './ContactUs.css';
import { MailIcon } from '@primer/octicons-react'
import { useForm, ValidationError } from '@formspree/react';
import { Link } from 'react-router-dom';


import contactImage from '../images/contact-us.svg'


export default function ContactUs() {

    return (
        <div className="contact-outer">
            <div className="contact-main-container">
                <div className="contact-links-container">
                    <h1 className="contact-heading">Contact Us</h1>
                    <h2 className="contact-email">
                        <MailIcon className="mail-icon"/>
                        CovidAware.ischool@gmail.com
                    </h2>
                </div>
                <div className="questions-container">
                    <h1 className="questions-heading">Have questions?</h1>
                    <p className="questions-text">Visit our <Link to="/about">FAQ </Link> page</p>
                    <p className="questions-text">or fill out the form below!</p>
                    <img className="questions-image" alt="Person with speech bubbles" src={contactImage}/>
                </div>
                <div className="email-form-container">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}

function ContactForm() {
    const [state, handleSubmit] = useForm("xdoykrzz");
    if (state.succeeded) {
        return <h3 className="submission-response-text">Thanks for contacting us! We'll get back to you as soon as possible!</h3>;
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group ">
                <div className="horizontal-center">
                    <input className="contact-input" id="name" type="text" name="name" aria-label="Name" placeholder="Name"/>
                    <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                    />
                </div>
                <div className="horizontal-center">
                    <input className="contact-input" id="email" type="email" name="email" aria-label="Email" placeholder="Email"/>
                    <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                    />
                </div>
                <div className="horizontal-center">
                    <div className="message-form">
                        <label htmlFor="message" className="message-label">
                            Message
                        </label>                    
                        <textarea className="message-input" id="message" name="message" aria-label="Message" />
                        <ValidationError
                            prefix="Message"
                            field="message"
                            errors={state.errors}
                        />
                    </div>
                </div>
            </div>
            <div className="horizontal-center">
                <div className="submit-container">
                    <button className="btn btn-outline-primary" type="submit" disabled={state.submitting}>
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
  }
  