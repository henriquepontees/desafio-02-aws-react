import { useState, useEffect } from 'react';
import { CartItem } from '../Components/Cart/CartItem';
import { EmptyCart } from '../Components/Cart/EmptyCart';
import '../styles/Cart.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const [products, setProducts] = useState<{ id: number, image: string, title: string, price: number }[]>([]);
    const [quantities, setQuantities] = useState<number[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            setProducts(parsedCart.products);
            setQuantities(parsedCart.quantities);
        }
    }, []);

    const updateLocalStorage = (updatedProducts: any[], updatedQuantities: number[]) => {
        localStorage.setItem('cart', JSON.stringify({
            products: updatedProducts,
            quantities: updatedQuantities,
        }));
    };

    const handleIncrement = (index: number) => {
        const newQuantities = [...quantities];
        newQuantities[index]++;
        setQuantities(newQuantities);
        updateLocalStorage(products, newQuantities);
    };

    const handleDecrement = (index: number) => {
        const newQuantities = [...quantities];
        if (newQuantities[index] > 1) {
            newQuantities[index]--;
            setQuantities(newQuantities);
            updateLocalStorage(products, newQuantities);
        }
    };

    const handleRemove = (id: number) => {
        const updatedProducts = products.filter(product => product.id !== id);
        const updatedQuantities = quantities.filter((quantity, index) => products[index].id !== id);

        setProducts(updatedProducts);
        setQuantities(updatedQuantities);
        updateLocalStorage(updatedProducts, updatedQuantities);

        toast.success('Produto removido com sucesso!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            progressStyle: { backgroundColor: '#ff8100' }
        });
    };

    const handleBuy = () => {
        navigate('/Buy');
    };

    if (products.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div className="cart-container">
            <header>
                <h1 className='h1-cart-title'>Meu Carrinho</h1>
            </header>
            <main>
                {products.map((product, index) => (
                    <CartItem
                        key={product.id}
                        product={product}
                        quantity={quantities[index]}
                        onIncrement={() => handleIncrement(index)}
                        onDecrement={() => handleDecrement(index)}
                        onRemove={() => handleRemove(product.id)}
                    />
                ))}
            </main>
            <footer className="footer">
                <button className="buy-button" onClick={handleBuy} >Comprar</button>
            </footer>
            <ToastContainer />
        </div>
    );
};
