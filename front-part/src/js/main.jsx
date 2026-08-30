import React, { createContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Mainroutes from "./Mainroutes.jsx";
import { CartProvider } from "./context/CartProvider";
import AuthStore from "./stores/AuthStore.js";
import { GoogleOAuthProvider } from '@react-oauth/google';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export const AuthContext = createContext({ AuthStore });
const queryClient = new QueryClient()

function App() {
    useEffect(() => {
        AuthStore.checkAuth()
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <AuthContext.Provider value={{ AuthStore }}>
                <CartProvider>
                    <Mainroutes />
                </CartProvider>
            </AuthContext.Provider>
        </GoogleOAuthProvider>
        </QueryClientProvider>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);