import React, { useState } from 'react';
import '../styles/LoginRegister.css';
import logo from '../assets/logo-uol-comics.svg';
import { LuAtSign } from "react-icons/lu";
import { MdOutlineLock } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LoginProps {
    email: string;
    password: string;
}

export const Login: React.FC = () => {
    const [loginData, setLoginData] = useState<LoginProps>({
        email: '',
        password: ''
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const userData = sessionStorage.getItem('userData');
        if (userData) {
            const { email: savedEmail, password: savedPassword } = JSON.parse(userData);
            if (loginData.email === savedEmail && loginData.password === savedPassword) {
              toast.success('Bem-vindo a Uol Comics', {
                position: "top-right",
                autoClose: 3000, 
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                progressStyle: { backgroundColor: '#ff8100' }
              });
            } else {
                toast.error('Senha ou e-mail incorretos.', {
                  position: "top-right",
                  autoClose: 3000, 
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  progressStyle: { backgroundColor: '#ff8100' }
                });
            }
        }
    };

    return (
        <section className="desktop-section">
            <div className="left-section"></div>
            <section className="main-section">
                <img src={logo} alt="logo" className="logo-image" />
                <div className="form-card">
                    <h1 className="form-title2">Escolha seu herói</h1>
                    <form onSubmit={handleLogin}>
                        <div className="form-fields">
                            <div className="input-icon">
                                <LuAtSign className="icon" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="form-input"
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="input-icon">
                                <MdOutlineLock className="icon" />
                                <input
                                    type="password"
                                    placeholder="Senha"
                                    className="form-input"
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="submit-button">Entrar</button>
                    </form>
                    <p className="next-login">Ainda não tem uma conta? <a href="/register">Clique aqui!</a></p>
                </div>
            </section>
            <ToastContainer/>
        </section>
    );
};
