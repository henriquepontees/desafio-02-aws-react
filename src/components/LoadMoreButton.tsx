import React from 'react';
import '../styles/LoadMoreButton.css';

interface LoadMoreButtonProps {
    onClick: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick }) => {
    return (
        <button id='button' onClick={onClick}>
            + Carregar mais
        </button>
    );
};

export default LoadMoreButton;
