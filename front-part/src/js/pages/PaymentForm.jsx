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
        alert("Произошла ошибка при создании платежа. Пожалуйста, попробуйте позже.");
    }
}
    return (
        <div className="payment-form-page">
            <div className="payment-form-page__inner container">
                <form className="payment-form-page__left"  id="payment-form" onSubmit={handleSubmit(onSubmit)} >
                    <h1 className="payment-form-page__title">Оформление заказа</h1>

                    <div className="payment-form-page__group">
                        <label htmlFor="email">Электронная почта</label>
                        <input
                            type="email"
                            id="email"
                            className="payment-form-page__input"
                            placeholder="example@mail.com"
                            {...register('email', {
                                required: 'Введите email'
                            })}
                        />
                        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                    </div>

                    <div className="payment-form-page__shipping-section">
                        <h2 className="payment-form-page__section-title">Адрес доставки</h2>
                        <div className="payment-form-page__row">
                            <div className="payment-form-page__group">
                                <label htmlFor="firstName">Имя</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="payment-form-page__input"
                                    placeholder="Иван"
                                    {...register('firstName', {
                                        required: 'Введите имя',
                                        minLength: { value: 2, message: 'Имя слишком короткое' },
                                        maxLength: { value: 50, message: 'Имя слишком длинное' }
                                    })}
                                />
                                {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName.message}</p>}
                            </div>

                            <div className="payment-form-page__group">
                                <label htmlFor="lastName">Фамилия</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="payment-form-page__input"
                                    placeholder="Иванов"
                                    {...register('lastName', {
                                        required: 'Введите фамилию',
                                        minLength: { value: 2, message: 'Фамилия слишком короткая' },
                                        maxLength: { value: 50, message: 'Фамилия слишком длинная' },
                                    })}
                                />
                                {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName.message}</p>}
                            </div>
                        </div>

                        <div className="payment-form-page__group">
                            <label htmlFor="address">Адрес</label>
                            <input
                                type="text"
                                id="address"
                                className="payment-form-page__input"
                                placeholder="Улица, дом, квартира"
                                {...register('address', {
                                    required: 'Введите адрес',
                                    minLength: { value: 5, message: 'Адрес слишком короткий' },
                                    maxLength: { value: 100, message: 'Адрес слишком длинный' },
                                })}
                            />
                            {errors.address && <p style={{ color: 'red' }}>{errors.address.message}</p>}
                        </div>

                        <div className="payment-form-page__row">
                            <div className="payment-form-page__group">
                                <label htmlFor="city">Город</label>
                                <input
                                    type="text"
                                    id="city"
                                    className="payment-form-page__input"
                                    placeholder="Oslo"
                                    {...register('city', {
                                        required: 'Введите город',
                                        minLength: { value: 2, message: 'Название города слишком короткое' },
                                        maxLength: { value: 50, message: 'Название города слишком длинное' },
                                    })}
                                />
                                {errors.city && <p style={{ color: 'red' }}>{errors.city.message}</p>}
                            </div>

                            <div className="payment-form-page__group">
                                <label htmlFor="postcode">Почтовый индекс</label>
                                <input
                                    type="text"
                                    id="postcode"
                                    className="payment-form-page__input"
                                    placeholder="101000"
                                    {...register('postcode', {
                                        required: 'Введите почтовый индекс',
                                        minLength: { value: 4, message: 'Почтовый индекс должен быть минимум 4 цифры' },
                                        maxLength: { value: 10, message: 'Почтовый индекс слишком длинный' },
                                        pattern: { value: /^[0-9]+$/, message: 'Только цифры допустимы' },
                                        valueAsNumber: true
                                    })}
                                />
                                {errors.postcode && <p style={{ color: 'red' }}>{errors.postcode.message}</p>}
                            </div>
                        </div>

                        <div className="payment-form-page__group">
                            <label htmlFor="country">Страна</label>
                            <Select id="country" className="payment-form-page__input" options={Countries}/>
                        </div>
                    </div>

                    <div className="payment-form-page__payment-section">
                        <h2 className="payment-form-page__section-title">Способ оплаты</h2>
                        <div className="payment-form-page__methods">
                            <div className="payment-form-page__method payment-form-page__method--active">
                                <div className="payment-form-page__method-icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M1 10H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div className="payment-form-page__method-info">
                                    <span className="payment-form-page__method-name">Кредитная карта</span>
                                    <span className="payment-form-page__method-desc">Visa, MasterCard</span>
                                </div>
                                <div className="payment-form-page__method-radio"></div>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="payment-form-page__right">
                    <h2 className="payment-form-page__section-title">Ваш заказ</h2>
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
                            <span>Подытог</span>
                            <span>{CartPriceSummary} NOK</span>
                        </div>
                        <div className="payment-form-page__summary-row">
                            <span>Доставка</span>
                            <span>Бесплатно</span>
                        </div>
                        <div className="payment-form-page__summary-row payment-form-page__summary-row--total">
                            <span>Итого</span>
                            <span>{CartPriceSummary} NOK</span>
                        </div>
                    </div>

                    <button className="payment-form-page__submit button-dark" disabled={isSubmitting} type="submit" form="payment-form">
                        {isSubmitting ? 'Sending...' : `Betale ${CartPriceSummary} NOK`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;