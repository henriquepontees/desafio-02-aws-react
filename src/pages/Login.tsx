import '../styles/LoginRegister.css'
import logo from '../assets/logo-uol-comics.svg'
import { LuAtSign } from "react-icons/lu";
import { MdOutlineLock } from "react-icons/md"



export const Login = () => {
    return (
        <section className="desktop-section">
            <div className="left-section"></div>
            <section className="main-section">
                <img src={logo} alt="logo"  className="logo-image" />
                <div className="form-card">
                    <h1 className="form-title2">Escolha seu herói</h1>
                    <form>
                        <div className="form-fields">
                            <div className="input-icon">
                                <LuAtSign className="icon" />
                                <input type="email" placeholder="Email" className="form-input"/>
                            </div>
                            <div className="input-icon">
                            <MdOutlineLock className="icon" />
                                <input type="password" placeholder="Senha" className="form-input"/>
                            </div>
                        </div>  
                        <button type="submit" className="submit-button">Entrar</button>
                    </form>
                    <p className="next-login">Ainda não tem uma conta? <a href="/login">Clique aqui!</a></p>
                </div>
            </section>
        </section>
    );
};


