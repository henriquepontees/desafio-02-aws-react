import { FiTrash2 } from 'react-icons/fi';

interface CartItemProps {
    product: {
        id: number;
        image: string;
        title: string;
        price: number;
    };
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
    onRemove: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({ product, quantity, onIncrement, onDecrement, onRemove }) => {
    return (
        <article key={product.id} className="card">
            <div className="trash-icon-container">
                <FiTrash2 className="trash-icon" onClick={onRemove} />
            </div>
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="desktop-container">
                <h2 className="product-title">{product.title}</h2>
                <section className="quantity-control">
                    <button
                    className="decrement"
                    onClick={onDecrement}
                    style={{
                        backgroundColor: quantity === 1 ? 'rgba(186, 186, 186, 1)' : 'rgba(255, 129, 0, 1)',
                    }}>
                -
                    </button>
                    <span className="quantity">{quantity}</span>
                    <button className="increment" onClick={onIncrement}>+</button>
                </section>
            </div>
            <p className="product-price">${product.price.toFixed(2)}</p>
        </article>
    );
};
