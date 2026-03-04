import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./components/Layout/Cart.jsx";
import ProductDetails from "./components/Layout/Product/ProductDetails.jsx"
import LegalInformation from "./components/Layout/AboutUsInfo/AboutUs.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Hero from "./components/Layout/Hero/Hero.jsx";
import PaymentRedirect from "./pages/PaymentRedirect.jsx";
import Catalog from "./components/Layout/Catalog.jsx";
import PaymentForm from "./pages/PaymentForm.jsx";
function Mainroutes() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout/>}>
                <Route path="/" element={<Hero />} />
                <Route path="/cart" element={<CartPage/>} />
                    <Route path="/checkout" element={<PaymentForm/>} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path = "/product/:id" element={<ProductDetails />} />
                <Route path = "/om-snussbox-as" element={<LegalInformation/>} />
                    <Route path= "/success" element={ <PaymentRedirect/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default Mainroutes;
