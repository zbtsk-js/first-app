import ProductCard from "./ProductCard.jsx";
import ProductStore from "../../../stores/ProductStore.js";
import {observer} from "mobx-react-lite";


const ProductSection = observer(({ title, subtitle}) => {

    return (
        <div id="collection" className="product-section container">

                <header className="product-section__header">
                    <h2>{title}</h2>
                    <p className="product-section__subtitle">{subtitle}</p>
                </header>
                <ul
                    className="bordered-grid bordered-grid--3cols" 
                    role="list"
                >

                    {ProductStore.products.map(product => (
                            <li 
                                key={product._id || product.id}
                                className="bordered-grid__item" 
                                role="listitem"
                            >

                                <ProductCard {...product}  />  </li>
                        ))}



                </ul>

                <div className="product-section__button">
                    <a className="button button-primary" href="/catalog">View Full Catalog</a>
                </div>
            </div>
    );
});

export default ProductSection;