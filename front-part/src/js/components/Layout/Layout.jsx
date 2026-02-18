import HeaderElement from './Header/Header'
import Footer from './Footer/Footer'
import {Outlet} from 'react-router-dom'
import '/front-part/src/scss/main.scss'
const Layout = () => {
    return (
        <>
            <HeaderElement/>
            <Outlet/>
            <Footer/>
        </>

    )
}
export default Layout
