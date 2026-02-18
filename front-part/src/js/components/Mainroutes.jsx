import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./Layout/Cart.jsx";
import CardDetails from "./Layout/Hero/CardDetails.jsx"
import LegalInformation from "./Layout/AboutUsInfo/AboutUs.jsx";
import Layout from "./Layout/Layout.jsx";
import Hero from "./Layout/Hero/Hero.jsx";
function Mainroutes() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout/>}>
                <Route path="/" element={<Hero />} />
                <Route path="/cart" element={<CartPage/>} />
                <Route path = "/product/:id" element={<CardDetails />} />
                <Route path = "/om-snussbox-as" element={<LegalInformation/>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default Mainroutes;
