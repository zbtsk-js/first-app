import React, { createContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Mainroutes from "./Mainroutes.jsx";
import { CartProvider } from "./context/CartProvider";
import AuthStore from "./stores/AuthStore.js";
import ProductStore from "./stores/ProductStore.js";
import { GoogleOAuthProvider } from '@react-oauth/google';

export const AuthContext = createContext({ AuthStore });

function App() {
    useEffect(() => {
        AuthStore.checkAuth()
    }, [])

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <AuthContext.Provider value={{ AuthStore, ProductStore }}>
                <CartProvider>
                    <Mainroutes />
                </CartProvider>
            </AuthContext.Provider>
        </GoogleOAuthProvider>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);