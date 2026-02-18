import {useContext} from 'react';
import CartContext from '../context/cart-context.js'
export function useCart() {
    return useContext(CartContext);
}