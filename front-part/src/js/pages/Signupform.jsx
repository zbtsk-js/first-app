import React from 'react';
import { useForm } from 'react-hook-form';
import AuthStore from '../stores/AuthStore.js';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const Signupform = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm();

    const onSubmit = async (data) => {
        try {
            await AuthStore.login(data.email, data.password);
            navigate('/profile');
        } catch (e) {
            setError("email", { message: e.response?.data?.message || "Login failed" });
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            await AuthStore.googleLogin(credentialResponse.credential);
            navigate('/profile');
        } catch (e) {
            console.error('Google login error:', e);
            setError("email", { message: e.response?.data?.message });
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-tabs">
                    <button className="auth-tab">Вход</button>
                </div>
                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="example@mail.com"
                            {...register("email", { required: "Введите email" })}
                        />
                        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            {...register("password", { required: "Введите пароль" })}
                        />
                        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                    </div>
                    <button className="button-primary" disabled={isSubmitting} type="submit">
                        {isSubmitting ? 'Вход...' : 'Войти'}
                    </button>
                </form>

                <div className="google-login-wrapper" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Signupform;