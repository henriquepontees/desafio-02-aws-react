import { useState } from 'react';
import { CartItem } from '../components/CartItem';
import { EmptyCart } from '../components/EmptyCart';
import '../styles/Cart.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialProducts = [
{
    id: 1,
    image: 'https://via.placeholder.com/122x170',
    title: 'Produto 1',
    price: 29.99,
},
{
    id: 2,
    image: 'https://via.placeholder.com/122x170',
    title: 'Produto 2',
    price: 19.99,
},
{
    id: 3,
    image: 'https://via.placeholder.com/122x170',
    title: 'Produto 3',
    price: 19.99,
},

];

export const Cart = () => {
    const [products, setProducts] = useState(initialProducts);
    const [quantities, setQuantities] = useState(Array(products.length).fill(1));

    const handleIncrement = (index: number) => {
        const newQuantities = [...quantities];
        newQuantities[index]++;
        setQuantities(newQuantities);
    };

    const handleDecrement = (index: number) => {
        const newQuantities = [...quantities];
            if (newQuantities[index] > 1) {
                newQuantities[index]--;
                setQuantities(newQuantities);
            }
    };

    const handleRemove = (id: number) => {
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);

        const updatedQuantities = quantities.filter((quantity, index) => products[index].id !== id);
        setQuantities(updatedQuantities);

        toast.success('Produto removido com sucesso!', {
            position: "top-right",
            autoClose: 3000, 
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
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
                <button className="buy-button">Comprar</button>
            </footer>
            <ToastContainer />
        </div>
    );
};
