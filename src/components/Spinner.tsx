import React, { useEffect, useState } from 'react';
import '../styles/Spinner.css';
import spinnerGif from '../assets/R.gif';

const Spinner: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 6000); 

        return () => clearTimeout(timer); 
    }, []);

    if (!visible) return null; 

    return (
        <div className="spinner-container">
            <img src={spinnerGif} alt="Loading..." className="spinner" />
        </div>
    );
};

export default Spinner;
