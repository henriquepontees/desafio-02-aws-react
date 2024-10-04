import '../../styles/LoginRegister.css'
import logo from '../../assets/logo-uol-comics.svg'


export const Register = () => {
    return (
        <section className="main-section">
            <img src={logo} alt="logo"  className="logo-image" />
            <div className="form-card">
                <h1 className="form-title">Crie seu herói</h1>
                <form>
                    <div className="form-fields">
                        <input type="text" placeholder="Nome Completo" className="form-input"/>
                        <input type="email" placeholder="Email" className="form-input"/>
                        <input type="password" placeholder="Senha" className="form-input"/>
                        <input type="password" placeholder="Confirme a Senha" className="form-input"/>
                    </div>  
                    <button type="submit" className="submit-button">Criar Conta</button>
                </form>
                <p className="next-login">Já tem uma conta? <a href="/login">Clique aqui!</a></p>
            </div>
        </section>
    );
};


