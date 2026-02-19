import React from "react";
export default function Heroheader() {
    return (
        <div className="hero__header">
            <div className="container">
                <div className="hero__header-inner">
                    <div className="hero__header-content">
                        <span className="badge">
                            Premium quality snus
                        </span>
                        <h1>
                            Premium Storage Solutions
                        </h1>
                        <p className="hero__description">
                            Elegantly crafted containers designed to preserve and protect. Minimalist Scandinavian aesthetics meet exceptional functionality.
                        </p>
                        <a
                            className="button button-primary hero__button"
                            href="#collection"
                        >
                            Explore Collection
                        </a>
                    </div>
                    <div className="hero__header-image">
                        <img src='/images/product-card.jpg' alt="Premium Snus Box" />
                    </div>
                </div>
            </div>
        </div>
    );
}