import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { RxMagnifyingGlass } from 'react-icons/rx';

const SearchBar: React.FC<{ type: 'characters' | 'comics' }> = ({ type }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = async () => {
        if (searchQuery.trim() === '') return;

        // Navega para a rota de busca correspondente
        navigate(`/${type}?search=${encodeURIComponent(searchQuery)}`);
        setSearchQuery('');
    };

    return (
        location.pathname !== '/Cart' && (
            <div className="search-container">
                <RxMagnifyingGlass className="search-icon" onClick={handleSearch} />
                <input
                    type="text"
                    placeholder={`Buscar ${type === 'characters' ? 'personagens' : 'quadrinhos'}`}
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
        )
    );
};

export default SearchBar;
