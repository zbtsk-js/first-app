
 const SearchBar = ({search, setSearch}) => {
     return (
        <div className="searchbar">
            <input placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} type="search" className="searchbar__input" />
        </div> )

}
export default SearchBar