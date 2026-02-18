import React from "react";
import ReactDOM from "react-dom/client";
import Mainroutes from "./components/Mainroutes";
import {CartProvider} from "./context/CartProvider";


ReactDOM.createRoot(document.getElementById("root")).render(
    <CartProvider>
        <Mainroutes/>
    </CartProvider>
);
