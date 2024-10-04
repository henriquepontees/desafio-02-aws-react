import cartImage from '../../assets/cart.svg'

export const EmptyCart = () => {
    return (
        <div className="cart-container">
            <header>
                <h1>Meu Carrinho</h1>
            </header>
            <main>
                <section className="empty-cart-container">
                    <img src={cartImage} alt="Carrinho Vazio" className="empty-cart-image" />
                    <p className="empty-cart">Carrinho vazio :(</p>
                    <p className="add-itens">Adicione alguns itens no seu carrinho!</p>
                </section>
            </main>
        </div>
    );
};
