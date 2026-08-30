import React, { useState} from "react";
import ProductCard from "../Product/ProductCard.jsx";
import SearchBar from "../searchBar/SearchBar.jsx";
import useDebounce from "../../../hooks/useDebounce.js";
import {useProducts} from "../../../hooks/useProducts.js";
import Loader from "../../UI/Loader.jsx";
import {observer} from "mobx-react-lite";

const Catalog = observer(() => {
  const { data: products, isLoading } = useProducts();
  const [search, setSearch] = useState("");
  const FilteredSearch = useDebounce(search, 50);

  if (isLoading) return <Loader />;

  const filteredProducts = products?.filter(p =>
      p.title?.includes(FilteredSearch)
  )
  return (
      <div className="catalog-page">
        <div className="catalog-content container">

          <main className="catalog-main">
            <header className="catalog-toolbar">
              <div className="catalog-stats">
                {filteredProducts.length} Items found
              </div>
              <SearchBar search={search} setSearch={setSearch}></SearchBar>
            </header>

            {filteredProducts.length > 0 ? (
                <div className="bordered-grid bordered-grid--3cols" role="list">
                  {filteredProducts.map((product) => (
                      <div key={product._id} className="bordered-grid__item" role="listitem">
                        <ProductCard {...product} />
                      </div>
                  ))}
                </div>
            ) : (
                <div className="catalog-empty">
                  <p>No products found matching your criteria.</p>
                  <button
                      className="catalog-filters__btn active"
                      onClick={() => { setActiveColor('all'); }}
                  >
                    Reset Filters
                  </button>
                </div>
            )}
          </main>
        </div>
      </div>
  );
});

export default Catalog;
