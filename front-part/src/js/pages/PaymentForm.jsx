import React from 'react';
import {useCart} from "/front-part/src/js/hooks/useCart.js";
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import PaymentService from "../services/PaymentService.js";
const PaymentForm = () => {
    const {cart, CartPriceSummary} = useCart();
    const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm();

    const Countries = [
        { value: 'Norway', label: 'Norway' },
        { value: 'Sweden', label: 'Sweden' },
        { value: 'Denmark', label: 'Denmark' }
    ];
const onSubmit = async (data) => {
    try {
        const payload = {
            "items": cart.map(item => ({
                productId: item.id,
                quantity: item.quantity
            })),
            "email": data.email
        }
        const res = await PaymentService.createPayment(payload)
        const PaymentLink = res.data.checkoutUrl
        window.location.href = PaymentLink;
    } catch (e) {
        console.error("Payment creation failed:", e);
        alert("An error occurred while creating the payment. Please try again later.");
    }
}
    return (
        <div className="payment-form-page">
            <div className="payment-form-page__inner container">
                <form className="payment-form-page__left"  id="payment-form" onSubmit={handleSubmit(onSubmit)} >
                    <h1 className="payment-form-page__title">Checkout</h1>

                    <div className="payment-form-page__group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            id="email"
                            className="payment-form-page__input"
                            placeholder="example@mail.com"
                            {...register('email', {
                                required: 'Enter email'
                            })}
                        />
                        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                    </div>

                    <div className="payment-form-page__shipping-section">
                        <h2 className="payment-form-page__section-title">Shipping Address</h2>
                        <div className="payment-form-page__row">
                            <div className="payment-form-page__group">
                                <label htmlFor="firstName">First name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="payment-form-page__input"
                                    placeholder="Ivan"
                                    {...register('firstName', {
                                        required: 'Enter first name',
                                        minLength: { value: 2, message: 'First name is too short' },
                                        maxLength: { value: 50, message: 'First name is too long' }
                                    })}
                                />
                                {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName.message}</p>}
                            </div>

                            <div className="payment-form-page__group">
                                <label htmlFor="lastName">Last name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="payment-form-page__input"
                                    placeholder="Ivanov"
                                    {...register('lastName', {
                                        required: 'Enter last name',
                                        minLength: { value: 2, message: 'Last name is too short' },
                                        maxLength: { value: 50, message: 'Last name is too long' },
                                    })}
                                />
                                {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName.message}</p>}
                            </div>
                        </div>

                        <div className="payment-form-page__group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                className="payment-form-page__input"
                                placeholder="Street, house, apartment"
                                {...register('address', {
                                    required: 'Enter address',
                                    minLength: { value: 5, message: 'Address is too short' },
                                    maxLength: { value: 100, message: 'Address is too long' },
                                })}
                            />
                            {errors.address && <p style={{ color: 'red' }}>{errors.address.message}</p>}
                        </div>

                        <div className="payment-form-page__row">
                            <div className="payment-form-page__group">
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    className="payment-form-page__input"
                                    placeholder="Oslo"
                                    {...register('city', {
                                        required: 'Enter city',
                                        minLength: { value: 2, message: 'City name is too short' },
                                        maxLength: { value: 50, message: 'City name is too long' },
                                    })}
                                />
                                {errors.city && <p style={{ color: 'red' }}>{errors.city.message}</p>}
                            </div>

                            <div className="payment-form-page__group">
                                <label htmlFor="postcode">Postal code</label>
                                <input
                                    type="text"
                                    id="postcode"
                                    className="payment-form-page__input"
                                    placeholder="101000"
                                    {...register('postcode', {
                                        required: 'Enter postal code',
                                        minLength: { value: 4, message: 'Postal code must be at least 4 digits' },
                                        maxLength: { value: 10, message: 'Postal code is too long' },
                                        pattern: { value: /^[0-9]+$/, message: 'Only digits are allowed' },
                                        valueAsNumber: true
                                    })}
                                />
                                {errors.postcode && <p style={{ color: 'red' }}>{errors.postcode.message}</p>}
                            </div>
                        </div>

                        <div className="payment-form-page__group">
                            <label htmlFor="country">Country</label>
                            <Select id="country" className="payment-form-page__input" options={Countries}/>
                        </div>
                    </div>

                    <div className="payment-form-page__payment-section">
                        <h2 className="payment-form-page__section-title">Payment Method</h2>
                        <div className="payment-form-page__methods">
                            <div className="payment-form-page__method payment-form-page__method--active">
                                <div className="payment-form-page__method-icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M1 10H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div className="payment-form-page__method-info">
                                    <span className="payment-form-page__method-name">Credit card</span>
                                    <span className="payment-form-page__method-desc">Visa, MasterCard</span>
                                </div>
                                <div className="payment-form-page__method-radio"></div>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="payment-form-page__right">
                    <h2 className="payment-form-page__section-title">Your order</h2>
                    <div className="payment-form-page__items-list">
                        {cart.map(item => (
                            <div key={item.id} className="payment-form-page__item">
                                <div className="payment-form-page__item-img-wrapper" data-count={item.quantity || 1}>
                                    <img src={item.imageSrc} alt={item.imageAlt} className="payment-form-page__item-img" />
                                </div>
                                <div className="payment-form-page__item-info">
                                    <h3 className="payment-form-page__item-title">{item.title}</h3>
                                </div>
                                <span className="payment-form-page__item-price">{item.price} NOK</span>
                            </div>
                        ))}
                    </div>

                    <div className="payment-form-page__summary">
                        <div className="payment-form-page__summary-row">
                            <span>Subtotal</span>
                            <span>{CartPriceSummary} NOK</span>
                        </div>
                        <div className="payment-form-page__summary-row">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="payment-form-page__summary-row payment-form-page__summary-row--total">
                            <span>Total</span>
                            <span>{CartPriceSummary} NOK</span>
                        </div>
                    </div>

                    <button className="payment-form-page__submit button-dark" disabled={isSubmitting} type="submit" form="payment-form">
                        {isSubmitting ? 'Sending...' : `Pay ${CartPriceSummary} NOK`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;