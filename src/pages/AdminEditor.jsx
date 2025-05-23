// Admin can edit, remove, add items.

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../data/database";
import IconTrashCan from '../assets/trash-can.png'
import IconPen from '../assets/pen.png'

// Get info from firestore collection 'toys'.
// Keep info in state 'products'

// UseState - a Hook that lets you manage data (state) inside a component to store all products (products) & Store the new product being added (newProduct).
const AdminEditor = () => {
  const [products, setProducts] = useState([]); // Creates a state products (starts empty). & Use setProducts to update it.
  // Create state for input info. This line sets up `newProduct` to hold new item info from the form.
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

  // Function to edit 
  // editIndex = which product to edit / fetchProducts = get all products from Firebase / Run fetchProducts when the page opens
  // 'editIndex' shows which item is being edited. 'null' means no edit. Use 'setEditIndex' to update it.
  const [editIndex, setEditIndex] = useState(null);
  // Function fetchProducts for upload item list.
  // This gets toy data from Firebase. It reads all items in the "toys" collection, turns them into objects with their IDs & saves them to the product list.
  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "toys"));
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(list);
  };
  // Create fetchProducts when loading. Use useEffect([]) to run fetchProducts() one time when the page loads.
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to add product item.
  // Create an async function called handleAddProduct to add products to the database.
  const handleAddProduct = async () => {
    // If name/price/image is missing, show a warning: 'Please fill in all information.' & stop the function.
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert("Please fill in all information.");
      return;
    }
    console.log("Adding product:", newProduct); // Check if added product.
    // Use addDoc to add newProduct to the "toys" collection. Change the price to a number with Number(newProduct.price).
    await addDoc(collection(db, "toys"), {
      ...newProduct,
      price: Number(newProduct.price),
    });
    // Clear form data, resetting all values to blank.
    setNewProduct({ name: "", description: "", price: "", image: "" });
    fetchProducts(); // Load new list.
  };

  // Function to remove product item.
  const handleDeleteProduct = async (id) => { // Define an async function handleDeleteProduct(id) to delete a product by its ID using await.
    await deleteDoc(doc(db, "toys", id)); // Use deleteDoc(doc(db, "toys", id)).
    console.log("Deleted product with ID:", id); // Check if removed product.
    fetchProducts(); // Load new info after remove.
  };

  // Function to edit product item.
  const handleEditProduct = (id) => {
    const productToEdit = products.find((p) => p.id === id);
    setEditIndex(id);
    setNewProduct(productToEdit);
    console.log("Editing product:", productToEdit);
  };

  // Function for recording product edits when the user clicks the “Edit” button and changes data in the form.
  const handleSaveProduct = async () => {
    const productRef = doc(db, "toys", editIndex);
    await updateDoc(productRef, {
      ...newProduct,
      price: Number(newProduct.price),
    });
    console.log("Updated product:", editIndex);
    setEditIndex(null);
    setNewProduct({ name: "", description: "", price: "", image: "" });
    fetchProducts();
  };

  return (
    <main>
      {/* Heading */}
      <h1>Admin Editor</h1>
      {/* Subheading */}
      <p className="subheading">Manage Products: Add, edit, or delete products in your store.</p>
      {/* Layout divided in two columns */}
      <div className="editor-layout">
        {/* Left column: search, sort, add product */}
        <div className="editor-left">
          {/* Search product */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <i className="search-icon">🔍</i>
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
        </div>

        {/* Right column: product list */}
        <div className="editor-right">
          {/* Product list container */}
          <div className="product-list-container">
            <h2>Product List</h2>
            <div className="product-list">
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
                .map((product) => (
                  <div key={product.id} className="product-item">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <p>
                      <strong>{product.name}</strong> — {product.price} kr
                    </p>
                    {/* Button remove with trash icon */}
                    <button onClick={() => handleDeleteProduct(product.id)}>
                      <img src={IconTrashCan} alt="Remove" />
                    </button>
                    {/* Button edit with pen icon */}
                    <button onClick={() => handleEditProduct(product.id)}>
                      <img src={IconPen} alt="Edit" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminEditor;
