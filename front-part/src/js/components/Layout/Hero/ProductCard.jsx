import {Link} from "react-router-dom";

const ProductCard = (product) => {
    const {
        id,
        title,
        subtitle,
        price,
        imageSrc,
        imageAlt,
    } = product;

    return (
        <Link to={`/product/${id}`} className="product-card">
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
                        <div className="product-card__price-wrapper">
                            <div className="product-card__price">{price} NOK</div>
                        </div>

                        <button
                            className="product-card__buy-btn"
                            type="button"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;