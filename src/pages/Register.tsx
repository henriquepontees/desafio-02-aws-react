import React, { useState } from 'react';
import '../styles/LoginRegister.css';
import logo from '../assets/logo-uol-comics.svg';
import { GoPerson } from "react-icons/go";
import { MdOutlinePassword, MdOutlineLock } from "react-icons/md";
import { LuAtSign } from "react-icons/lu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RegisterProps {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const Register: React.FC = () => {
    const [userData, setUserData] = useState<RegisterProps>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(userData.email)) {
            toast.error('Por favor, insira um e-mail válido!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                progressStyle: { backgroundColor: '#ff8100' }
            });
            return;
        }

        if (userData.password !== userData.confirmPassword) {
            toast.warn('As duas senhas precisam ser iguais!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                progressStyle: { backgroundColor: '#ff8100' }
            });
            return;
        }

        sessionStorage.setItem('userData', JSON.stringify(userData));
        toast.success('Conta Criada com sucesso!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            progressStyle: { backgroundColor: '#ff8100' }
        });
        setUserData({ name: '', email: '', password: '', confirmPassword: '' });
    };

    return (
        <section className="desktop-section">
            <div className="left-section"></div>
            <section className="main-section">
                <img src={logo} alt="logo" className="logo-image" />
                <div className="form-card">
                    <h1 className="form-title1">Crie seu herói</h1>
                    <form onSubmit={handleRegister}>
                        <div className="form-fields">
                            <div className="input-icon">
                                <GoPerson className="icon" />
                                <input
                                    type="text"
                                    placeholder="Nome Completo"
                                    className="form-input"
                                    value={userData.name}
                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="input-icon">
                                <LuAtSign className="icon" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="form-input"
                                    value={userData.email}
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="input-icon">
                                <MdOutlineLock className="icon" />
                                <input
                                    type="password"
                                    placeholder="Senha"
                                    className="form-input"
                                    value={userData.password}
                                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="input-icon">
                                <MdOutlinePassword className="icon" />
                                <input
                                    type="password"
                                    placeholder="Confirme a Senha"
                                    className="form-input"
                                    value={userData.confirmPassword}
                                    onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="submit-button">Criar Conta</button>
                    </form>
                    <p className="next-login">Já tem uma conta? <a href="/login">Clique aqui!</a></p>
                </div>
            </section>
            <ToastContainer />
        </section>
    );
};
