import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'; 
import Login from './pages/Login'; 
import { Cart } from './pages/Cart';
import { Characters } from './pages/Characters';
import { Register } from './components/LoginRegister/Register';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                {/* Renderizar o Header apenas se a rota não for '/login' ou '/register' ou '/' */}
                {window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/' && <Header />}
                
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/Characters" element={<Characters />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
