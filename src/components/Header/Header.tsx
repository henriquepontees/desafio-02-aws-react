import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/Header.css';
import logo from '../../assets/logo-uol-comics.svg';
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { RxMagnifyingGlass } from "react-icons/rx";
import SideBar from './SideBar';
 
export interface HeaderProps {
    enabled: boolean;
}
 
const Header: React.FC<HeaderProps> = ({ enabled = false }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [isCartSelected, setIsCartSelected] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [cartNotification] = useState<boolean>(true);
    const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(true);
    const location = useLocation();
    const navigate = useNavigate();
    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
 
    const handleCartClick = () => navigate('/cart');
 
    useEffect(() => {
        const isCartPage = location.pathname === '/cart';
        const isBuyPage = location.pathname === '/buy';
        const isCharacterPage = location.pathname.toLowerCase().startsWith('/characters/');
        const isComicPage = location.pathname.toLowerCase().startsWith('/comic/');
        
        setIsCartSelected(isCartPage);
        
        setIsSearchVisible(!isCartPage && !isBuyPage && !isCharacterPage && !isComicPage);
    }, [location]);
   
 
    const getPlaceholder = () => {
        switch (location.pathname) {
            case '/comic':
                return '              Pesquisar por título...';
            case '/characters':
                return '              Pesquisar por nome...';
            default:
                return 'Pesquisar...';
        }
    };
 
    const handleSearch = () => {
        if (searchQuery.trim() === '') return;
 
        const path = location.pathname === '/comic' ? '/comic' : '/characters';
        navigate(`${path}?search=${encodeURIComponent(searchQuery)}`);
        setSearchQuery('');
    };
 
   
    const handleLogout = () => {
        setIsHeaderVisible(false);
        navigate('/login');
    };
 
    if (isHeaderVisible && location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/' ) {
        return (
            <>
                <header className="header">
                    <div className="header-content-mobile">
                        <img src={logo} alt="UOL Comics" className="logo" />
                        <div
                            className={`cart-icon ${isCartSelected ? 'selected' : ''}`}
                            onClick={handleCartClick}
                        >
                            <AiOutlineShoppingCart />
                            {cartNotification && <span className="notification-badge"></span>}
                        </div>
                        <div className="menu-icon" onClick={toggleSidebar}>
                            <AiOutlineMenu />
                        </div>
                    </div>

                    {isSearchVisible && (
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
 
                    <div
                        className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}
                        onClick={toggleSidebar}
                    ></div>
 
                    <SideBar
                        isOpen={isSidebarOpen}
                        toggleCallback={toggleSidebar}
                        handleLogout={handleLogout}
                    />
 
                    <div className="desktop-links">
                        <Link to="/comic" className={location.pathname === '/comic' ? 'active' : ''}>
                            Quadrinhos
                        </Link>
                        <Link to="/characters" className={location.pathname === '/characters' ? 'active' : ''}>
                            Personagens
                        </Link>
                        <div
                            className={`cart-icon-desktop ${isCartSelected ? 'selected' : ''}`}
                            onClick={handleCartClick}
                        >
                            <AiOutlineShoppingCart />
                            {cartNotification && <span className="notification-badge"></span>}
                        </div>
                        <button className="logout-btn-desktop" onClick={handleLogout}>
                            <FiLogOut style={{ marginRight: '8px' }} /> Sair
                        </button>
                    </div>
                </header>
            </>
        );
    }
 
    return null;
};
 
export default Header;