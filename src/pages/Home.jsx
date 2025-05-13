// src/pages/Home.jsx
// Show the list of toys from Firebase and have an “Add to Cart” button that adds the item to context using

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/database";
import { useCart } from "../context/useCart";
import "./Home.css";

const Home = () => {
  const [toys, setToys] = useState([]); // List of toys from Firebase
  const [searchQuery, setSearchQuery] = useState(""); // User search value
  const [sortOption, setSortOption] = useState(""); // Default empty to allow "-- Sort By --"
  const { addToCart } = useCart(); // Cart context (we removed cartItems since it's unused)

  // Fetch toys from Firebase on load
  useEffect(() => {
    const fetchToys = async () => {
      const querySnapshot = await getDocs(collection(db, "toys"));
      const toysList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setToys(toysList);
    };

    fetchToys();
  }, []);

  // Function for searching
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function for sorting
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Filter toys based on search input
  const filteredToys = toys.filter((toy) =>
    toy.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort filtered toys
  const sortedToys = filteredToys.sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // Add item to cart
  const handleAddToCart = (toy) => {
    addToCart(toy);
  };

  return (
    <main className="home-container">
      {/* Intro message */}
      <section className="intro-text">
        <p>Here are all our amazing summer toys:</p>
      </section>

      {/* Search and Sort Section */}
      <div className="search-sort-wrapper">
        {/* Search box */}
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search"
            className="search-input"
          />
          <i className="search-icon">🔍</i>
        </div>

        {/* Sort dropdown */}
        <div className="sort-container">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="">-- Sort By --</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="price-asc">Price Low-High</option>
            <option value="price-desc">Price High-Low</option>
          </select>
        </div>
      </div>

      {/* Grid of toy cards */}
      <section className="toys-grid">
        {sortedToys.map((toy) => (
          <div className="toy-card" key={toy.id}>
            <img src={toy.image} alt={toy.alt || toy.name} className="toy-image" />
            <h2>{toy.name}</h2>
            <p>{toy.description}</p>
            <p>Price: {toy.price} kr</p>

            {/* Add to cart button */}
            <button
              className="add-to-cart"
              onClick={() => handleAddToCart(toy)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Home;
