import React from "react";
import { FiLogOut } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Header.css';
 
export interface SideBarProps  {
    isOpen: boolean;
    toggleCallback: () => void;
    handleLogout: () => void;
}
 
const SideBar : React.FC<SideBarProps> = ({isOpen, toggleCallback, handleLogout}) => {
    const location = useLocation();
 
    return (
        <>
        <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={toggleCallback}>
                    <IoClose />
                </button>
                <h2 className="sidebar-title">Páginas</h2>
                <div className="sidebar-links">
                    <Link to="/ComicsList" className={location.pathname === '/ComicsList' ? 'active' : ''}>Quadrinhos</Link>
                    <Link to="/characters" className={location.pathname === '/characters' ? 'active' : ''}>Personagens</Link>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                    <FiLogOut style={{ marginRight: '8px' }} /> Sair
                </button>
            </nav>
        </>
    )
}
 
export default SideBar;