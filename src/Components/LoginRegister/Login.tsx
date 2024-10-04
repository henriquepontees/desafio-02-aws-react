import '../../styles/LoginRegister.css'
import logo from '../../assets/logo-uol-comics.svg'


export const Login = () => {
    return (
        <section className="main-section">
            <img src={logo} alt="logo"  className="logo-image" />
            <div className="form-card">
                <h1 className="form-title">Crie seu herói</h1>
                <form>
                    <div className="form-fields">
                        <input type="email" placeholder="Email" className="form-input"/>
                        <input type="password" placeholder="Senha" className="form-input"/>
                    </div>  
                    <button type="submit" className="submit-button">Entrar</button>
                </form>
                <p className="next-login">Ainda não tem uma conta? <a href="/login">Clique aqui!</a></p>
            </div>
        </section>
    );
};


