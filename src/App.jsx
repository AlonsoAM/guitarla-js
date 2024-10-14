import {Header} from "./components/Header.jsx";
import {Guitarra} from "./components/Guitarra.jsx";
import {useEffect, useState} from "react";
import {db} from "./data/data.js";


function App() {

    const [data, setData] = useState(db)
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {

        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem.id === item.id ? {...cartItem, quantity: (cartItem.quantity || 1) + 1} : cartItem
            ));
        } else {
            setCart([...cart, {...item, quantity: 1}]);
        }

    }

    return (
        <>
            <Header/>

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>
                <div className="row mt-5">
                    {data.map((guitarra) => (
                        <Guitarra key={guitarra.id} guitarra={guitarra} addToCart={addToCart}/>
                    ))}
                </div>
            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>

        </>
    )
}

export default App
