import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./components/Cart/Cart.jsx";
import ProductDetails from "./components/Layout/Product/ProductDetails.jsx"
import LegalInformation from "./components/Layout/AboutUsInfo/AboutUs.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Hero from "./components/Layout/Hero/Hero.jsx";
import PaymentRedirect from "./pages/PaymentRedirect.jsx";
import Catalog from "./components/Layout/Catalog/Catalog.jsx";
import PaymentForm from "./pages/PaymentForm.jsx";
import Profile from "./components/Layout/Profile/Profile.jsx";
import AuthForm from "./pages/AuthForm.jsx";
import Signupform from "./pages/Signupform.jsx";
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
                    <Route path = "/success" element={ <PaymentRedirect/>}/>
                    <Route path = "/profile" element={<Profile />} />
                    <Route path = "/login" element={<Signupform />} />
                    <Route path = "/lazyregisterForm/:registrationToken" element={<AuthForm/>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default Mainroutes;
