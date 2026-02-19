import { useState } from 'react';
import { X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NavSidebar = ({navLinks}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
        document.body.classList.toggle('sidebar-open');
    };



    return (
        <>
            <button 
                className="header__burger-button burger-button" 
                onClick={toggleMenu}
                aria-label="Open navigation menu"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke= '#FFF'stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     className="lucide lucide-menu-icon lucide-menu">
                    <path d="M4 5h16"/>
                    <path d="M4 12h16"/>
                    <path d="M4 19h16"/>
                </svg>
            </button>

            <div
                className={`sidebar-menu__overlay ${isOpen ? 'is-active' : ''}`}
                onClick={toggleMenu}
            />

            <aside className={`sidebar-menu sidebar-menu--left ${isOpen ? 'is-open' : ''}`}>
                <div className="sidebar-menu__header">
                    <h2 className="sidebar-menu__title">Menu</h2>
                    <button className="sidebar-menu__close" onClick={toggleMenu}>
                        <X />
                    </button>
                </div>

                <div className="sidebar-menu__body">
                    <nav className="sidebar-menu__nav">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) => 
                                    `sidebar-menu__link ${isActive ? 'sidebar-menu__link--active' : ''}`
                                }
                                onClick={toggleMenu}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default NavSidebar;
