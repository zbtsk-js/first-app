
import { MapPin, Phone, Mail, Shield } from 'lucide-react';

const LegalInformation = () => {
    return (

        <div className="legal-information">
            <div className="container">
                <div className="legal-information__header">

                    <h1 className="legal-information__title">Om oss</h1>
                    <p className="legal-information__subtitle">
                        Important information about NORDBOX, our services, and your rights as a customer.
                    </p>
                </div>

                <div className="legal-information__content">
                    {/* Company Information */}
                    <div className="info-card info-card">
                        <div className="info-card__header">
                            <div className="info-card__icon">
                                <MapPin size={20} strokeWidth={2} />
                            </div>
                            <h3 className="info-card__title">Company Information</h3>
                        </div>

                        <div className="info-card__body">
                            <div className="info-row">
                                <span className="info-row__label">Legal Name:</span>
                                <span className="info-row__value">NORDBOX Scandinavia AB</span>
                            </div>
                            <div className="info-row">
                                <span className="info-row__label">Registration Number:</span>
                                <span className="info-row__value">559123-4567</span>
                            </div>
                            <div className="info-row">
                                <span className="info-row__label">VAT Number:</span>
                                <span className="info-row__value">SE559123456701</span>
                            </div>
                            
                        </div>
                    </div>


                    <div className="info-card">
                        <div className="info-card__header">
                            <div className="info-card__icon">
                                <Mail size={20} strokeWidth={2} />
                            </div>
                            <h3 className="info-card__title">Email Support</h3>
                        </div>

                        <div className="info-card__body">
                            <div className="info-row">
                                <span className="info-row__label">General:</span>
                                <span className="info-row__value">info@nordbox.se</span>
                            </div>
                            <div className="info-row">
                                <span className="info-row__label">Orders:</span>
                                <span className="info-row__value">orders@nordbox.se</span>
                            </div>
                            <div className="info-row">
                                <span className="info-row__label">Returns:</span>
                                <span className="info-row__value">returns@nordbox.se</span>
                            </div>

                            <div className="info-text">
                                <p>Response time: Within 24 hours</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Security */}
                    <div className="info-card info-card--full">
                        <div className="info-card__header">
                            <div className="info-card__icon">
                                <Shield size={20} strokeWidth={2} />
                            </div>
                            <h3 className="info-card__title">Payment Security</h3>
                        </div>

                        <div className="info-card__body">
                            <p className="info-card__description">
                                Your payment information is processed with the highest security standards. We use industry-leading encryption and security protocols to protect your data.
                            </p>

                            <div className="payment-info">
                                <div className="payment-info__column">
                                    <h4 className="payment-info__title">Secure Processing</h4>
                                    <ul className="payment-info__list">
                                        <li>256-bit SSL encryption for all transactions</li>
                                        <li>PCI DSS Level 1 compliant payment processing</li>
                                        <li>No card details stored on our servers</li>
                                        <li>3D Secure authentication for added protection</li>
                                    </ul>
                                </div>

                                <div className="payment-info__column">
                                    <h4 className="payment-info__title">Accepted Payment Methods</h4>
                                    <ul className="payment-info__list">
                                        <li>Visa, Mastercard, American Express</li>
                                        <li>Apple Pay and Google Pay</li>
                                        <li>PayPal</li>
                                        <li>Klarna (Pay Later & Installments)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalInformation;