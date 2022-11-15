import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeFromDb } from '../../utilities/fakedb';
import useProducts from '../../hooks/useProducts';
import useCart from '../../hooks/useCart';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import './Orders.css';

const Orders = () => {
    const [products, setProducts] = useProducts();
    const [cart, setCart] = useCart(products);
    const navigate = useNavigate();

    const handleRemoveProduct = product => {
        const rest = cart.filter(pd => pd.id !== product.id);
        setCart(rest);
        removeFromDb(product.id);
    }

    return (
        <div className='shop-container'>
            <div className="review-items-container">
                {
                    cart.map(product => <ReviewItem
                        key={product.id}
                        product={product}
                        handleRemoveProduct={handleRemoveProduct}
                    ></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={() => navigate('/shipment')}>Proceed Checkout </button>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;