import React, { useState } from 'react';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: интегрировать реальную подписку
        console.log('Subscribe:', email);
        setEmail('');
    };

    return (
        <footer className="footer" role="contentinfo">
            <div className="container footer__body">
                {/* Левый блок: логотип, описание, контакты */}
                <div className="footer__main">
                    <div className="footer__main-body">
                        <a href="#" className="footer__logo-link" aria-label="NORDBOX">
                            <img src="/logo.png" alt="NORDBOX logo" className="footer__logo-image" />
                        </a>

                        <div className="footer__main-description">
                            Premium Scandinavian storage <br/> solutions crafted with precision and care.
                        </div>

                        <div className="footer__contacts">
                            <div className="footer__contacts-list">
                                <div className="footer__contacts-item">
                                    <i className="far fa-map-marker-alt" aria-hidden="true"></i>
                                    <span>Stockholm, Sweden</span>
                                </div>

                                <div className="footer__contacts-item">
                                    <i className="fas fa-phone-alt" aria-hidden="true"></i>
                                    <a className="footer__contacts-link" href="tel:+46812345678">+46 8 123 456 78</a>
                                </div>

                                <div className="footer__contacts-item">
                                    <i className="far fa-envelope" aria-hidden="true"></i>
                                    <a className="footer__contacts-link" href="mailto:info@nordbox.se">info@nordbox.se</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Правый блок: меню колонками */}
                <nav className="footer__menu" aria-label="Footer navigation">
                    <div className="footer__menu-column">
                        <h4 className="footer__menu-main-link">Shop</h4>
                        <ul className="footer__menu-list">
                            <li><a className="footer__menu-link" href="#">All products</a></li>
                            <li><a className="footer__menu-link" href="#">Featured Collection</a></li>
                            <li><a className="footer__menu-link" href="#">Essential series</a></li>
                            <li><a className="footer__menu-link" href="#">Premium series</a></li>
                            <li><a className="footer__menu-link" href="#">Limited Edition</a></li>
                        </ul>
                    </div>

                    <div className="footer__menu-column">
                        <h4 className="footer__menu-main-link">Customer Service</h4>
                        <ul className="footer__menu-list">
                            <li><a className="footer__menu-link" href="#">Shipping & Delivery</a></li>
                            <li><a className="footer__menu-link" href="#">Returns & Exchanges</a></li>
                            <li><a className="footer__menu-link" href="#">Warranty Information</a></li>
                            <li><a className="footer__menu-link" href="#">Care Guide</a></li>
                            <li><a className="footer__menu-link" href="#">Contact Us</a></li>
                        </ul>
                    </div>

                    <div className="footer__menu-column">
                        <h4 className="footer__menu-main-link">Company</h4>
                        <ul className="footer__menu-list">
                            <li><a className="footer__menu-link" href="#">About NORDBOX</a></li>
                            <li><a className="footer__menu-link" href="#">Terms & Conditions</a></li>
                            <li><a className="footer__menu-link" href="#">Privacy Policy</a></li>
                            <li><a className="footer__menu-link" href="#">Payment Security</a></li>
                            <li><a className="footer__menu-link" href="#">Sustainability</a></li>
                        </ul>
                    </div>
                </nav>
            </div>

            {/* Нижняя полоса с копирайтом, меню и иконками платёжных систем */}
            <div className="container footer__extra">
                <div className="footer__extra-left">
                    <p className="footer__copyright">
                        © 2025 NORDBOX Scandinavia AB. All rights reserved.
                    </p>
                </div>

                <div className="footer__extra-menu">
                    <ul className="footer__extra-menu-list">
                        <li className="footer__extra-menu-item"><a href="#">Secure Payment</a></li>
                        <li className="footer__extra-menu-item"><a href="#">Privacy</a></li>
                    </ul>
                </div>

                <div className="footer__payments" aria-hidden="true">
                    <span className="payment-badge">VISA</span>
                    <span className="payment-badge">MC</span>
                    <span className="payment-badge">AMEX</span>
                    <span className="payment-badge">PayPal</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;