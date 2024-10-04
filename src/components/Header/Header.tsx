import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Header.css';
import logo from '../../assets/logo.png';
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { RxMagnifyingGlass } from "react-icons/rx";

const Header: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [isCartSelected, setIsCartSelected] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [cartNotification, setCartNotification] = useState<boolean>(true); // coloquei true pra bolinha aparecer ao carregar, tem que fazer a logica pra do cart
    const location = useLocation();

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    const handleCartClick = () => {
        window.location.href = '/Cart';
    };

    useEffect(() => {
        setIsCartSelected(location.pathname === '/Cart');
    }, [location]);

    const getPlaceholder = () => {
        if (location.pathname === '/comics') {
            return '           Pesquisar por título...';
        } else if (location.pathname === '/characters') {
            return '           Pesquisar por nome...';
        }
        return 'Pesquisar...';
    };

    const handleSearch = () => {
        const path = location.pathname;
        const apiUrl = `URL_DA_API/${path.slice(1)}?filter=${searchQuery}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
    };

    return (
        <header className="header">
            <div className="header-content">
                <img src={logo} alt="UOL Comics" className="logo" />
                <div className={`cart-icon ${isCartSelected ? 'selected' : ''}`} onClick={handleCartClick}>
                    <AiOutlineShoppingCart />
                    {cartNotification && <span className="notification-badge"></span>}
                </div>
                <div className="menu-icon" onClick={toggleSidebar}>
                    <AiOutlineMenu />
                </div>
            </div>

            {location.pathname !== '/Cart' && (
                <div className="search-container">
                    <RxMagnifyingGlass className="search-icon" onClick={handleSearch} />
                    <input
                        type="text"
                        placeholder={getPlaceholder()}
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />
                </div>
            )}

            <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}></div>

            <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={toggleSidebar}>
                    <IoClose />
                </button>
                <h2>Páginas</h2>
                <div className="sidebar-links">
                    <Link to="/comics" className={location.pathname === '/comics' ? 'active' : ''}>Quadrinhos</Link>
                    <Link to="/characters" className={location.pathname === '/Characters' ? 'active' : ''}>Personagens</Link>
                </div>
                <button className="logout-btn" onClick={() => window.location.href = '/login'}>
                    <FiLogOut style={{ marginRight: '8px' }} /> Sair
                </button>
            </nav>

            <div className="desktop-links">
                <Link to="/comics" className={location.pathname === '/comics' ? 'active' : ''}>Quadrinhos</Link>
                <Link to="/characters" className={location.pathname === '/characters' ? 'active' : ''}>Personagens</Link>
                <div className={`cart-icon-desktop ${isCartSelected ? 'selected' : ''}`} onClick={handleCartClick}>
                    <AiOutlineShoppingCart />
                    {cartNotification && <span className="notification-badge"></span>}
                </div>
                <button className="logout-btn-desktop" onClick={() => window.location.href = '/login'}>
                    <FiLogOut style={{ marginRight: '8px' }} /> Sair
                </button>
            </div>
        </header>
    );
};

export default Header;
