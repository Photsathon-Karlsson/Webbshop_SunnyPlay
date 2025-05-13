// src/pages/AdminEditor.jsx
// Admin can edit, remove, add items.

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../data/database";
import "./AdminEditor.css";

// Get info from firestore collection 'toys'.
// Keep info in state 'products'

// useState
const AdminEditor = () => {
  const [products, setProducts] = useState([]);
  // Create state for input info.
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  // Function to search product.
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to sort product.
  const [sortOption, setSortOption] = useState("");
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Function to edit & save product.
  const [editIndex, setEditIndex] = useState(null);

  // Function fetchProducts for upload item list.
  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "toys"));
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(list);
  };

  // Create fetchProducts when loading.
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to add product item.
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert("Please fill in all information.");
      return;
    }
    console.log("Adding product:", newProduct); // Check if added product.
    await addDoc(collection(db, "toys"), {
      ...newProduct,
      price: Number(newProduct.price),
    });

    setNewProduct({ name: "", description: "", price: "", image: "" });
    fetchProducts(); // Load new list.
  };

  // Function to remove product item.
  const handleDeleteProduct = async (id) => {
    await deleteDoc(doc(db, "toys", id));
    console.log("Deleted product with ID:", id); // Check if removed product.
    fetchProducts(); // Load new info afetr remove.
  };

  // Function to edit product item.
  const handleEditProduct = (index) => {
    setEditIndex(index);
    setNewProduct(products[index]); // Enter the selected values in the form.
    console.log("Editing product:", products[index]); // 🔍
  };

  // Function for recording product edits when the user clicks the “Edit” button and changes data in the form.
  const handleSaveProduct = async () => {
    const editingProduct = products[editIndex];
    const productRef = doc(db, "toys", editingProduct.id);
    await updateDoc(productRef, {
      ...newProduct,
      price: Number(newProduct.price),
    });
    console.log("Updated product:", editingProduct.id);
    setEditIndex(null);
    setNewProduct({ name: "", description: "", price: "", image: "" });
    fetchProducts();
  };

  return (
    <main>
      <h1>Admin Editor</h1>
      <p>Manage Products: Add, edit, or delete products in your store.</p>

      {/* Search product */}
      <div className="search-container">
        <i className="search-icon">🔍</i>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* Sort product */}
      <select value={sortOption} onChange={handleSortChange} className="sort-select">
        <option value="">-- Sort By --</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="name-asc">Name: A-Z</option>
        <option value="name-desc">Name: Z-A</option>
      </select>

      {/* Add form */}
      <div className="add-form">
        <h2>Add new product</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL image"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <button onClick={editIndex !== null ? handleSaveProduct : handleAddProduct}>
          {editIndex !== null ? "Save" : "Add Product"}
        </button>
      </div>

      {/* Product list */}
      <div className="product-list">
        <h2>Product List</h2>
        {products
          .filter((product) =>
            product.name?.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .sort((a, b) => {
            if (sortOption === "price-low") return a.price - b.price;
            if (sortOption === "price-high") return b.price - a.price;
            if (sortOption === "name-asc") return a.name.localeCompare(b.name);
            if (sortOption === "name-desc") return b.name.localeCompare(a.name);
            return 0;
          })
          .map((product, index) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <p>
                <strong>{product.name}</strong> — {product.price} kr
              </p>
              {/* Button remove with trash icon */}
              <button onClick={() => handleDeleteProduct(product.id)}>
                <img src="/images/trash-can.png" alt="Remove" />
              </button>
              {/* Button edit with pen icon */}
              <button onClick={() => handleEditProduct(index)}>
                <img src="/images/pen.png" alt="Edit" />
              </button>
            </div>
          ))}
      </div>
    </main>
  );
};

export default AdminEditor;
