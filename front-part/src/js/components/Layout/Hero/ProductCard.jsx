import React from "react";


const ProductCard = ({
                         title,
                         subtitle,
                         price,
                         imageSrc,
                         imageAlt
                     }) => (
    <div className="product-card">
        <img
            className="product-card__image"
            src={imageSrc}
            alt={imageAlt ?? title}
            width="410"
            height="410"
        />

        <div className="product-card__main">
            <div className="product-card__body">
                    <h3 className="product-card__title">{title}</h3>
                    <p className="product-card__subtitle">{subtitle}</p>

            </div>

            <div className="product-card__footer">
                <div className="product-card__price-wrapper price-wrapper">
                    <div className="product-card__price">{price}</div>
                </div>

                <button className="product-card__buy-btn" type="button">Add</button>
            </div>
        </div>
    </div>
);

export default ProductCard;