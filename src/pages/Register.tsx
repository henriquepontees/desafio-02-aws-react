import '../styles/LoginRegister.css'
import logo from '../assets/logo-uol-comics.svg'
import { GoPerson } from "react-icons/go"
import { MdOutlinePassword } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { LuAtSign } from "react-icons/lu";


export const Register = () => {
    return (
        <section className="desktop-section">
            <div className="left-section"></div>
            <section className="main-section">
                <img src={logo} alt="logo"  className="logo-image" />
                <div className="form-card">
                    <h1 className="form-title1">Crie seu herói</h1>
                    <form>
                        <div className="form-fields">
                            <div className="input-icon">
                                <GoPerson className="icon" />
                                <input type="text" placeholder="Nome Completo" className="form-input"/>
                            </div>
                            <div className="input-icon">
                                <LuAtSign className="icon" />
                                <input type="email" placeholder="Email" className="form-input"/>
                            </div>
                            <div className="input-icon">
                                <MdOutlineLock className="icon" />
                                <input type="password" placeholder="Senha" className="form-input"/>
                            </div>
                            <div className="input-icon">
                                <MdOutlinePassword className="icon" />
                                <input type="password" placeholder="Confirme a Senha" className="form-input"/>
                            </div>
                        </div>    
                        <button type="submit" className="submit-button">Criar Conta</button>
                    </form>
                    <p className="next-login">Já tem uma conta? <a href="/login">Clique aqui!</a></p>
                </div>
            </section>
        </section>
    );
};


