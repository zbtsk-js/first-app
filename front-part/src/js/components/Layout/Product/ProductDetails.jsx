import {useParams} from "react-router-dom";
import {useCart} from "../../../hooks/useCart";
import {useState} from "react";
import { Truck, Package, Star } from 'lucide-react';
import ProductStore from "../../../stores/ProductStore.js";
import {observer} from "mobx-react-lite";

const ProductDetails = observer(() => {
    const {id} = useParams()
    const product = ProductStore.products.find(p => p._id === id || p.id == id)
    console.log({...product})
    const [quantity, setQuantity] = useState(1)

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    const {addToCart}= useCart()

    if (!product) {
        return <div className="container">Product not found</div>
    }

    return (
        <section className="product-details">
            <div className="product-details__container container">
                <div className="product-details__media">
                    <div className="product-details__image-wrapper">
                        <img
                            src={product.imageSrc}
                            alt={product.imageAlt || product.title}
                            className="product-details__image"
                        />
                    </div>
                </div>

                <div className="product-details__content">


                    <h1 className="product-details__title">{product.title}</h1>

                    <div className="product-details__price-wrapper">
                        <span className="product-details__price">{product.price} KR</span>
                        <span className="product-details__vat">Inkl. mva.</span>
                    </div>

                    <div className="product-details__info-badges">
                        <div className="info-badge">
                            <span className="info-badge__icon"><Truck size={20}/></span>
                            <span className="info-badge__text">Gratis frakt over 349 kr</span>
                        </div>
                        <div className="info-badge">
                            <span className="info-badge__icon"><Package size={20}/> </span>
                            <span className="info-badge__text">1–3 virkedager levering</span>
                        </div>
                        <div className="info-badge">
                            <span className="info-badge__icon"><Star size={20}/></span>
                            <span className="info-badge__text">14 dagers åpent kjøp</span>
                        </div>
                    </div>

                    <div className="product-details__description">
                        <p>
                            {product.description || "Inspirert av tidløs design og laget med fokus på detaljer. Dette produktet kombinerer funksjonalitet med et moderne estetisk uttrykk."}
                        </p>
                        {product.capacity && (
                            <p className="product-details__spec">
                            </p>
                        )}
                        <p className="product-details__spec">
                            <strong>Materiale:</strong> {product.material || "925 sterling sølv"}
                        </p>
                    </div>

                    <div className="product-details__actions">
                        <div className="quantity-selector">
                            <label className="quantity-selector__label">Antall</label>
                            <div className="quantity-selector__controls">
                                <button
                                    className="quantity-selector__btn"
                                    onClick={decrementQuantity}
                                    aria-label="Decrease quantity"
                                >
                                    −
                                </button>
                                <span className="quantity-selector__value">{quantity}</span>
                                <button
                                    className="quantity-selector__btn"
                                    onClick={incrementQuantity}
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button
                            className="product-details__add-btn"
                            onClick={() => addToCart({...product}, quantity)}
                        >
                            LEGG I HANDLEVOGN
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
});

export default ProductDetails;
