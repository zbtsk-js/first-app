import { useParams } from 'react-router-dom';
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthService from "../services/AuthService.js";
import AuthStore from "../stores/AuthStore.js";
import {useNavigate} from "react-router-dom";
const AuthForm = () => {
  const { registrationToken } = useParams();
  const navigate = useNavigate();
  const { register,setError, handleSubmit, reset, formState: { errors, isSubmitting }, watch } = useForm();
  const emailValue = watch("email");

  useEffect(() => {
    async function checkTokenAndGetEmail() {
        try {
        const requestEmail = await AuthService.getEmailbyTheLink(registrationToken);
        if (requestEmail) {
           reset({ email: requestEmail });
        }
    }catch (e) {
            setError("email", { message: `${e.response?.data?.message || 'Ссылка недействительна'}` });
        }}
      checkTokenAndGetEmail();
  }, [registrationToken, reset, setError]);

  const onSubmit = async (data) => {
      try {
          const response = await AuthService.LazyActivation(data.password, registrationToken)
          console.log(response)
          AuthStore.setAuth(true)
          AuthStore.setAccessToken(response.AccessToken)
          AuthStore.setUser(response.user)
          navigate('/profile')
      }
      catch (e) {
          setError( "password", { message: `${e.response?.data?.message || 'Ошибка активации'}` });
          console.log(e.response?.data)
      }
  };

  return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-tabs">
            <button className="auth-tab">
              Подтверждение профиля
            </button>
          </div>

          <p className="auth-description" style={{ marginBottom: '20px', textAlign: 'center', color: '#666' }}>
              {emailValue ? `Завершите регистрацию для ${emailValue}, установив пароль.` : 'Проверка токена...'}
          </p>

              <form className="auth-form" onSubmit={handleSubmit(onSubmit)} id="auth-form">
                <div className="form-group">
                  <label htmlFor="login-email">Email</label>
                  <input
                      type="email"
                      id="login-email"
                      disabled
                      placeholder="example@mail.com"
                      {...register("email", {
                        required: "Enter email"
                      })}
                  />
                  {errors.email && (
                      <p style={{ color: 'red' }}>{errors.email.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="login-password">Придумайте пароль</label>
                  <input
                      type="password"
                      id="login-password"
                      placeholder="••••••••"
                      {...register("password", {
                        required: "Введите пароль",
                        minLength: {
                          value: 6,
                          message: "Пароль должен быть не менее 6 символов"
                        }
                      })}
                  />
                  {errors.password && (
                      <p style={{ color: 'red' }}>{errors.password.message}</p>
                  )}
                </div>

                  <button className="button-primary" disabled={isSubmitting || !!errors.email} type="submit" form="auth-form">
                      {isSubmitting ? 'Сохранение...' : `Подтвердить профиль`}
                  </button>
              </form>

        </div>
      </div>
  );
};

export default AuthForm;