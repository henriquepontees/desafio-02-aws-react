import '../styles/Cart.css';
import { useState } from 'react';

const products = [
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
    price: 39.99,
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/122x170',
    title: 'Produto 4',
    price: 24.99,
  },
];

export const Cart = () => {

  const [quantities, setQuantities] = useState(Array(products.length).fill(1));
  
  const handleIncrement = (index:number) => {
    const newQuantities = [...quantities];
    newQuantities[index]++;
    setQuantities(newQuantities);
  };

  const handleDecrement = (index:number) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index]--;
      setQuantities(newQuantities);
    }
  };

  return (
    <div className="cart-container">
      <header>
        <h1>Meu Carrinho</h1>
      </header>
      <main>
        {products.map((product, index) => (
          <article key={product.id} className="card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h2 className="product-title">{product.title}</h2>
            <section className="quantity-control">
              <button className="decrement" onClick={() => handleDecrement(index)}>-</button>
              <span className="quantity">{quantities[index]}</span>
              <button className="increment" onClick={() => handleIncrement(index)}>+</button>
            </section>
            <p className="product-price">${product.price.toFixed(2)}</p>
          </article>
        ))}
      </main>
      <footer className="footer">
        <button className="buy-button">Comprar</button>
      </footer>
    </div>
  );
};
