// Show the list of toys from Firebase and have an “Add to Cart” button that adds the item using Zustand.

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/database";
import useCartStore from "../store/cartStore"; // Use Zustand store

const Home = () => {
  const [toys, setToys] = useState([]); // List of toys from Firebase.
  const [searchQuery, setSearchQuery] = useState(""); // User search value.
  const [sortOption, setSortOption] = useState(""); // Default empty to allow "-- Sort By --".

  const addToCart = useCartStore((state) => state.addToCart); // Get addToCart function from Zustand

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

  // Function for searching.
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function for sorting.
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Filter toys based on search input.
  const filteredToys = toys.filter((toy) =>
    toy.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort filtered toys based on selected option.
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

  // Add item to cart using Zustand.
  const handleAddToCart = (toy) => {
    addToCart(toy);
    console.log(`Added to cart: ${toy.name}`);
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
        {sortedToys.length === 0 ? (
          // Show message if cannot found product.
          <p className="no-result-text">No product found</p>
        ) : (
          sortedToys.map((toy) => (
            <div className="toy-card" key={toy.id}>
              {/* Check if image exists and is not empty */}
              {toy.image && toy.image.trim() !== "" ? (
                <img
                  src={toy.image}
                  alt={toy.alt || toy.name}
                  className="toy-image"
                />
              ) : (
                <div className="no-image">No image available</div>
              )}
              <h2>{toy.name}</h2>
              <p>{toy.description}</p>
              <p>Price: {toy.price} kr</p>

              {/* Add to cart button using Zustand */}
              <button
                className="add-to-cart"
                onClick={() => handleAddToCart(toy)}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default Home;
