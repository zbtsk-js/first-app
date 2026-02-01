import React from "react";

export default function Heroheader() {
    return (
        <header className="hero__header container">
                    <div className="hero__header-inner">
                        <span className="badge">Scandinavian design</span>
                        <h1>Premium Storage Solutions</h1>
                        <p className="hero__description">
                            Elegantly crafted containers designed to preserve and protect. Minimalist Scandinavian aesthetics meet exceptional functionality.
                        </p>
                        <a className="button button-primary hero__button" href="#collection">Explore Collection</a>
                    </div>
        </header>
    );
}