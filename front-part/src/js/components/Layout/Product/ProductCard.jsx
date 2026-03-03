import {Link} from "react-router-dom";

const ProductCard = (product) => {
    const {
        id,
        title,
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


                    <div className="product-card__body">
                        <h3 className="product-card__title">{title}</h3>
                        <p className="product-card__price">{price} NOK</p>
                    </div>


            </div>
        </Link>
    );
};

export default ProductCard;
