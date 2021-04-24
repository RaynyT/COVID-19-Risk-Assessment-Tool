import './ContactUs.css';
import { MailIcon } from '@primer/octicons-react'


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
            </div>
        </div>
    );
}