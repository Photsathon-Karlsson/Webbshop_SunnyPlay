// Show the list of toys from Firebase and have an “Add to Cart” button that adds the item to context using
// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/database";
import { useCart } from "../context/useCart";
import "./Home.css";

const Home = () => {
    const [toys, setToys] = useState([]);
    const { addToCart, cartItems } = useCart();
  
    useEffect(() => {
      const fetchToys = async () => {
        const querySnapshot = await getDocs(collection(db, "toys"));
        const toysList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setToys(toysList);
      };
  
      fetchToys();
    }, []);
  
    const handleAddToCart = (toy) => {
      addToCart(toy);
    };
  
    useEffect(() => {
      console.log("Cart items updated:", cartItems);
    }, [cartItems]);
  
    return (
      <main className="home-container">
        <section className="intro-text">
          <p>Here are all our amazing summer toys:</p>
        </section>
  
        <section className="toys-grid">
          {toys.map(toy => (
            <div className="toy-card" key={toy.id}>
              <img src={toy.image} alt={toy.alt} className="toy-image" />
              <h2>{toy.name}</h2>
              <p>{toy.description}</p>
              <p>Price: {toy.price} ฿</p>
              <button className="add-to-cart" onClick={() => handleAddToCart(toy)}>
                Add to Cart
              </button>
            </div>
          ))}
        </section>
      </main>
    );
  };
  

export default Home;

