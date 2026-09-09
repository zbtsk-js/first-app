export const setAuthCookie = (res, refreshToken) => {
    // 30 дней
    const maxAge = 30 * 24 * 60 * 60 * 1000
    res.cookie('refreshToken', refreshToken, {

        httpOnly: true,
        maxAge: maxAge,
        sameSite: 'lax',
        // secure: true // включите, если используете HTTPS
    });
}
