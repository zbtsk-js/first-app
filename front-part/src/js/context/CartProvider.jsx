import { useState, useEffect } from "react";
import CartContext from "./cart-context.js";

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        return JSON.parse( localStorage.getItem("cart")) || []
    });

    // сохраняем в localStorage при изменении
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const CartPriceSummary = cart?.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const CartQuantitySummary = cart?.reduce((acc, item) => acc + item.quantity, 0);
    function addToCart(product, quantity) {
        setCart(prevCart => {
            const existing = prevCart.find(item => item.id === product.id);

            if (existing) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
//если элемент нет то идет возврат предыдущего состояния корзины и через запятую добавляем новый обьект который мы добавили
            return [...prevCart, { ...product, quantity: quantity }];
        });
    }
    function increment(id){
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    }
    function decrement(id) {
        setCart(prevCart =>
            prevCart
                .map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ))
    }
    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    }

  return (
      <CartContext.Provider value={ {cart, CartPriceSummary,CartQuantitySummary, addToCart, increment, decrement, removeFromCart}}>
          {children}
      </CartContext.Provider>
  )
    }

