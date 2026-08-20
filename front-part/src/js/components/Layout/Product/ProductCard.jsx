import { Link } from "react-router-dom";

const ProductCard = (product) => {
    const {
        _id,
        id,
        title,
        price,
        imageSrc,
        imageAlt,
    } = product;

    const productId = _id || id;

    return (
        // Убран лишний внутренний div. Теперь всё находится сразу в Link
        <Link to={`/product/${productId}`} className="product-card">
            <img
                className="product-card__image"
                src={imageSrc}
                alt={imageAlt ?? title}
                width="410"
                height="410"
            />
            <div className="product-card__body">
                <h3 className="product-card__title">{title}</h3>
                <p className="product-card__price">{price} NOK</p>
            </div>
        </Link>
    );
};

export default ProductCard;
