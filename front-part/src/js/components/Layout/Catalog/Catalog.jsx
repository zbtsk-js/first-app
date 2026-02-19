import SearchBar from "../searchBar/SearchBar.jsx";
import {useState} from "react";

export default function Catalog() {
    const [search, setSearch] = useState()
return (
    <>
        <SearchBar search = {search} setSearch= {setSearch} />

    </>
    )


}