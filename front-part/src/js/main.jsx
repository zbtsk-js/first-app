import React from "react";
import ReactDOM from "react-dom/client";
import Mainroutes from "./Mainroutes.jsx";
import {CartProvider} from "./context/CartProvider";


ReactDOM.createRoot(document.getElementById("root")).render(
    <CartProvider>
        <Mainroutes/>
    </CartProvider>
);
