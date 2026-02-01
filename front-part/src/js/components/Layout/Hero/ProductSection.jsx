import React from "react";
import ProductCard from "./ProductCard";
import products from "./ProductData";
import useDebounce from "../../../hooks/useDebounce";
import {useState} from "react";

export default function ProductSection({ title, subtitle}) {
    const [search, setSearch] = useState('')
    const DeboundedSearch = useDebounce(search, 500)
    const SearchedValue =products.filter(p => p.title.toLowerCase().includes(DeboundedSearch.toLowerCase))
    return (
        <div id="collection" className="product-section container">

                <header className="product-section__header">
                    <h2>{title}</h2>
                    <p className="product-section__subtitle">{subtitle}</p>
                </header>
            <input type="search" value={search} onChange={e => setSearch(e.target.value)}/>
                <div className="bordered-grid bordered-grid--3cols" role="list">

                            {SearchedValue.map((product) => (
                                <div className="bordered-grid__item"  role="listitem">
                                <ProductCard {...product} />
                                </div>
                            ))}


                </div>

                <div className="product-section__button">
                    <a className="button button-primary" href="/catalog">View Full Catalog</a>
                </div>
            </div>
    );
}