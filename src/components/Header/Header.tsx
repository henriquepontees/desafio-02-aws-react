import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/Header.css';
import logo from '../../assets/logo.png';
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { RxMagnifyingGlass } from "react-icons/rx";
import axios from 'axios';
import { PUBLIC_KEY } from '../Commons';
import SideBar from './SideBar'


export interface HeaderProps {
    enabled: boolean;
}

const Header: React.FC<HeaderProps> = ({enabled = false}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [isCartSelected, setIsCartSelected] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults] = useState<any[]>([]); // Novo estado para os resultados da busca
    const [cartNotification] = useState<boolean>(true); 
    const [isEnabled] = useState<boolean>(enabled); 
    const location = useLocation();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    const handleCartClick = () => {
        navigate('/Cart');
    };

    useEffect(() => {
        setIsCartSelected(location.pathname === '/cart');
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

    const getCharactersByName = async (name: string) => {
        const apiUrl = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&apikey=${PUBLIC_KEY}`;
        try {
            const response = await axios.get(apiUrl);
            if (response.status === 200) {
                return response.data.data.results;
            }
        } catch (err) {
            console.error('Error fetching characters:', err);
            return null;
        }
    };
    const handleSearch = async () => {
        if (searchQuery.trim() === '') return;
    
        
        navigate(`/characters?search=${encodeURIComponent(searchQuery)}`);
        setSearchQuery(''); 
    };

    if(isEnabled)
    return (
        <>
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

            {location.pathname !== '/cart' && (
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
                            {searchResults.map(character => (
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

            <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}></div>
            <SideBar
             isOpen={isSidebarOpen}
             toggleCallback={toggleSidebar}
            />
            <div className="desktop-links">
                <Link to="/comics" className={location.pathname === '/comics' ? 'active' : ''}>Quadrinhos</Link>
                <Link to="/characters" className={location.pathname === '/characters' ? 'active' : ''}>Personagens</Link>
                <div className={`cart-icon-desktop ${isCartSelected ? 'selected' : ''}`} onClick={handleCartClick}>
                    <AiOutlineShoppingCart />
                    {cartNotification && <span className="notification-badge"></span>}
                </div>
                <button className="logout-btn-desktop" onClick={() => navigate('/login')}>
                    <FiLogOut style={{ marginRight: '8px' }} /> Sair
                </button>
            </div>
        </header>
        </>
    );
    else return (<></>) 
};

export default Header;
