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
    const [searchResults] = useState<any[]>([]);
    const [cartNotification] = useState<boolean>(true);
    const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true); 
    const location = useLocation();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    const handleCartClick = () => {
        navigate('/Cart');
    };

    useEffect(() => {
        setIsCartSelected(location.pathname === '/Cart');
    }, [location]);

    const getPlaceholder = () => {
        switch (location.pathname) {
            case '/comics':
                return '          Pesquisar por título...';
            case '/characters':
                return '          Pesquisar por nome...';
            default:
                return 'Pesquisar...';
        }
    };

    const handleSearch = async () => {
        if (searchQuery.trim() === '') return;
        navigate(`/characters?search=${encodeURIComponent(searchQuery)}`);
        setSearchQuery('');
    };

       const handleLogout = () => {
        setIsHeaderVisible(false); 
        navigate('/login'); 
    };

    
    if (isHeaderVisible && location.pathname !== '/login' && location.pathname !== '/register') {
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
                            {searchResults.length > 0 && (
                                <div className="search-results">
                                    {searchResults.map((character) => (
                                        <div key={character.id} className="search-result-item">
                                            <Link to={`/characters/${character.id}`}>
                                                {character.name}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div
                        className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}
                        onClick={toggleSidebar}
                    ></div>

                    <SideBar isOpen={isSidebarOpen} toggleCallback={toggleSidebar} handleLogout={handleLogout} /> 

                   
                    <div className="desktop-links">
                        <Link to="/comics" className={location.pathname === '/comics' ? 'active' : ''}>
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
