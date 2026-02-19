import React from "react";
import Heroheader from "./Hero-header.jsx";
import ProductSection from "../Product/ProductSection.jsx";



export default function Hero() {
    return (
            <main className="main">
                <section className="hero">
                    <Heroheader/>
                    <ProductSection title="Featured Collection"
                                    subtitle="Precision-engineered storage boxes combining form and function. Each piece is crafted to protect while elevating your everyday experience."/>
                    </section>
            </main>
);
}