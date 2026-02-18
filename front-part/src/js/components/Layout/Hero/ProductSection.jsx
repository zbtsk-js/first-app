import ProductCard from "./ProductCard.jsx";
import products from "./ProductData.js";
import useDebounce from "../../../hooks/useDebounce.js";
import {useState} from "react";
import SearchBar from "./SearchBar.jsx";


export default function ProductSection({ title, subtitle}) {
    const [search, setSearch] = useState('')
    const DebouncedSearch = useDebounce(search, 500)

    const ListofProducts = products.filter(p => p.title.toLowerCase().includes(DebouncedSearch.toLowerCase()))

    return (
        <div id="collection" className="product-section container">

                <header className="product-section__header">
                    <h2>{title}</h2>
                    <p className="product-section__subtitle">{subtitle}</p>
                </header>
            <SearchBar search={search} setSearch={setSearch}/>
                <ul 
                    className="bordered-grid bordered-grid--3cols" 
                    role="list"
                >

                    {ListofProducts.length ? (ListofProducts.map(product => (
                            <li 
                                key={product.id}
                                className="bordered-grid__item" 
                                role="listitem"
                            >

                                <ProductCard {...product}  />  </li>
                        ))) : (<div>doesnt exist</div>) }



                </ul>

                <div className="product-section__button">
                    <a className="button button-primary" href="/catalog">View Full Catalog</a>
                </div>
            </div>
    );
}