// Show the list of toys from Firebase and have an “Add to Cart” button that adds the item to context using
// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/database";
import { useCart } from "../context/useCart";
import "./Home.css";

const Home = () => {
  const [toys, setToys] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");  // User search value.
  const [sortOption, setSortOption] = useState("name-asc"); // Sorting options.
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const fetchToys = async () => {
      const querySnapshot = await getDocs(collection(db, "toys"));
      const toysList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setToys(toysList);
    };

    fetchToys();
  }, []);

  // Function for searching for toys.
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter toys by search terms.
  const filteredToys = toys.filter(toy =>
    toy.name && toy.name.toLowerCase().includes(searchQuery.toLowerCase()) // Check value of toy.name 
  );

  // Sort function. 
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Sort product.
  const sortedToys = filteredToys.sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return a.name.localeCompare(b.name);  // A-Z
      case "name-desc":
        return b.name.localeCompare(a.name);  // Z-A
      case "price-asc":
        return a.price - b.price;  // high-low
      case "price-desc":
        return b.price - a.price;  // low-high
      default:
        return 0;
    }
  });

  // Function add item to cart.
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

      {/* Search & Sort */}
      <div className="search-sort-container">
        <div className="search-box">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search"
            className="search-input"
          />
          <i className="search-icon">🔍</i>
        </div>

        <div className="sort-menu">
          <select value={sortOption} onChange={handleSortChange} className="sort-select">
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="price-asc">Price Low-High</option>
            <option value="price-desc">Price High-Low</option>
          </select>
        </div>
      </div>

      {/* Show products */}
      <section className="toys-grid">
        {sortedToys.map(toy => (
          <div className="toy-card" key={toy.id}>
            <img src={toy.image} alt={toy.alt} className="toy-image" />
            <h2>{toy.name}</h2>
            <p>{toy.description}</p>
            <p>Price: {toy.price} kr</p>
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


