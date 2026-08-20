import React, { useState } from 'react';
import { VisaIcon, MastercardIcon } from 'react-svg-credit-card-payment-icons';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmail('');
    };

    return (
        <footer className="footer" role="contentinfo">
            <div className="container footer__body">
                <div className="footer__main">
                    <div className="footer__main-body">
                        <p href="#" className="footer__logo-link" aria-label="NORDBOX">
                            BEDRIFTSNAVN
                        </p>
                        <div className="footer__main-description">
                            Handcrafted snus boxes built for everyday carry.<br />
                            Minimalist Scandinavian design meets premium protection.
                        </div>
                        <div className="footer__socials">
                            <a href="#" className="footer__socials-item" aria-label="Instagram">
                                <i className="ti ti-brand-instagram" aria-hidden="true"></i>
                            </a>
                            <a href="#" className="footer__socials-item" aria-label="TikTok">
                                <i className="ti ti-brand-tiktok" aria-hidden="true"></i>
                            </a>
                            <a href="#" className="footer__socials-item" aria-label="Snapchat">
                                <i className="ti ti-brand-snapchat" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <nav className="footer__menu" aria-label="Footer navigation">
                    <div className="footer__menu-column">
                        <h4 className="footer__menu-main-link">Shop</h4>
                        <ul className="footer__menu-list">
                            <li><a className="footer__menu-link" href="#">All products</a></li>
                            <li><a className="footer__menu-link" href="#">Matte Black</a></li>
                            <li><a className="footer__menu-link" href="#">Matte White</a></li>
                            <li><a className="footer__menu-link" href="#">Limited editions</a></li>
                        </ul>
                    </div>

                    <div className="footer__menu-column">
                        <h4 className="footer__menu-main-link">Om NORDBOX</h4>
                        <ul className="footer__menu-list">
                            <li><a className="footer__menu-link" href="#">About NORDBOX</a></li>
                            <li><a className="footer__menu-link" href="#">Personvern og cookies</a></li>
                            <li><a className="footer__menu-link" href="#">Salgsbetingelser</a></li>
                            <li><a className="footer__menu-link" href="#">Angrerett</a></li>
                        </ul>
                    </div>

                    <div className="footer__menu-column">
                        <h4 className="footer__menu-main-link">Kontakt</h4>
                        <ul className="footer__menu-list">
                            <li className="footer__contacts-item">
                                <i className="ti ti-map-pin" aria-hidden="true"></i>
                                <span>Norge</span>
                            </li>
                            <li className="footer__contacts-item">
                                <i className="ti ti-mail" aria-hidden="true"></i>
                                <a className="footer__menu-link" href="mailto:post@nordbox.no">post@nordbox.no</a>
                            </li>
                        </ul>
                        <div className="footer__newsletter">
                            <p className="footer__newsletter-label">Newsletter</p>
                            <form className="footer__newsletter-form" onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="din@epost.no"
                                    className="footer__newsletter-input"
                                    required
                                />
                                <button type="submit" className="footer__newsletter-btn">→</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;