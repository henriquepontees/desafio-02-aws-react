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
    const location = useLocation();
    const navigate = useNavigate();

    // Função para alternar a visibilidade da sidebar
    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    // Função para lidar com o clique no carrinho
    const handleCartClick = () => navigate('/Cart');

    // Verifica se o carrinho está selecionado
    useEffect(() => {
        setIsCartSelected(location.pathname === '/Cart');
    }, [location]);

    // Placeholder dinâmico com base na rota atual
    const getPlaceholder = () => {
        switch (location.pathname) {
            case '/ComicsList':
                return '              Pesquisar por título...';
            case '/characters':
                return '              Pesquisar por nome...';
            default:
                return 'Pesquisar...';
        }
    };

    // Função para lidar com a pesquisa
    const handleSearch = () => {
        if (searchQuery.trim() === '') return;

        const path = location.pathname === '/ComicsList' ? '/ComicsList' : '/characters';
        navigate(`${path}?search=${encodeURIComponent(searchQuery)}`);
        setSearchQuery('');
    };

    // Função para realizar logout
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
                        <Link to="/ComicsList" className={location.pathname === '/ComicsList' ? 'active' : ''}>
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
