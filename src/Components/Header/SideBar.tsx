import React from "react";
import { FiLogOut } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';


export interface SideBarProps  {
    isOpen: boolean;
    toggleCallback: () => void;
}

const SideBar : React.FC<SideBarProps> = ({isOpen, toggleCallback}) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
        <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={toggleCallback}>
                    <IoClose />
                </button>
                <h2>Páginas</h2>
                <div className="sidebar-links">
                    <Link to="/comics" className={location.pathname === '/comics' ? 'active' : ''}>Quadrinhos</Link>
                    <Link to="/characters" className={location.pathname === '/characters' ? 'active' : ''}>Personagens</Link>
                </div>
                <button className="logout-btn" onClick={() => navigate('/login')}>
                    <FiLogOut style={{ marginRight: '8px' }} /> Sair
                </button>
            </nav>
        </>
    )
}

export default SideBar;