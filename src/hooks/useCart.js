import {useEffect, useMemo, useState} from "react";
import {db} from "../data/data.js";

export const useCart = () => {
    const [data] = useState(db)
    const [cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
    const itemsLimit = 5;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (item) => {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem.id === item.id && cartItem.quantity < itemsLimit ? {
                    ...cartItem,
                    quantity: cartItem.quantity + 1
                } : cartItem
            ));
        } else {
            setCart([...cart, {...item, quantity: 1}]);
        }
    }

    const removeItem = (item) => setCart(cart.filter(cartItem => cartItem.id !== item.id));

    const incrementQuantity = (item) => {
        setCart(cart.map(cartItem =>
            cartItem.id === item.id && cartItem.quantity < itemsLimit ? {
                ...cartItem,
                quantity: cartItem.quantity + 1
            } : cartItem
        ));
    }

    const decrementQuantity = (item) => {
        if (item.quantity > 1) {
            setCart(cart.map(cartItem =>
                cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
            ));
        } else {
            removeItem(item);
        }
    }

    const clearCart = () => setCart([]);

    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const total = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);

    return {data, cart, addToCart, removeItem, incrementQuantity, decrementQuantity, clearCart, isEmpty, total};
}
