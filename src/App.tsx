import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'; 
import LoginRegister from './pages/LoginRegister'; 
import { Cart } from './pages/Cart';
import { Characters } from './pages/Characters';
import { Register } from './components/LoginRegister/Register';
import { Login } from './components/LoginRegister/Login';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                {/* Renderizar o Header apenas se a rota não for '/login' ou '/register' ou '/' */}
                {window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/' && <Header />}
                
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/Characters" element={<Characters />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
