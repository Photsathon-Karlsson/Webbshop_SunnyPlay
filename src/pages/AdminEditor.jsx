// Admin can edit, remove, add items.

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../data/database";
import IconTrashCan from '../assets/trash-can.png';
import IconPen from '../assets/pen.png';

const AdminEditor = () => {
  // Store all products from Firebase.
  const [products, setProducts] = useState([]);

  // Store values when adding/editing a product.
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  // Store input validation error messages.
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  // Store search & sort options.
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Track the product being edited.
  const [editIndex, setEditIndex] = useState(null);

  // Track active button for hover effect.
  const [activeButton, setActiveButton] = useState(null);

  // Get all products from Firebase.
  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "toys"));
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(list);
  };

  // Load product list on first render.
  useEffect(() => {
    fetchProducts();
  }, []);

  // Check each field for correct format.
  const validateField = (field, value) => {
    switch (field) {
      case "name":
      case "description":
        if (!/^[A-Za-zÅÄÖåäö\s]*$/.test(value)) {
          return "Only letters are allowed.";
        }
        break;
      case "price":
        if (!/^\d*(\.\d{0,2})?$/.test(value)) {
          return "Only numeric values are allowed.";
        }
        break;
      case "image":
        if (value.trim() === "") {
          console.log("no image update");
          return "";
        }
        if (!/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/.test(value)) {
          return "If provided, image must be a valid URL ending with .jpg, .jpeg, .png, .webp, or .gif";
        }
        break;
      default:
        return "";
    }
    return "";
  };

  // Update form input & run validation on change.
  const handleInputChange = (field, value) => {
    setNewProduct({ ...newProduct, [field]: value });
    const errorMsg = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  // Validate all fields before add or save.
  const validateProduct = () => {
    const newErrors = {
      name: validateField("name", newProduct.name),
      description: validateField("description", newProduct.description),
      price: validateField("price", newProduct.price),
      image: validateField("image", newProduct.image),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((msg) => msg === "");
  };

  // Add new product to Firebase.
  const handleAddProduct = async () => {
    if (!validateProduct()) return;
    await addDoc(collection(db, "toys"), {
      ...newProduct,
      price: Number(newProduct.price),
    });
    setNewProduct({ name: "", description: "", price: "", image: "" });
    setErrors({});
    fetchProducts();
  };

  // Delete product from Firebase.
  const handleDeleteProduct = async (id) => {
    await deleteDoc(doc(db, "toys", id));
    console.log("delete item");
    setActiveButton(id + "-delete");
    fetchProducts();
  };

  // Edit function — this will show only the selected product.
  const handleEditProduct = (id) => {
    const productToEdit = products.find((p) => p.id === id);
    setEditIndex(id);
    setNewProduct(productToEdit);
    setErrors({});
    console.log("edit item");
    setActiveButton(id + "-edit");
  };

  // Save changes to edited product.
  const handleSaveProduct = async () => {
    if (!validateProduct()) return;
    const productRef = doc(db, "toys", editIndex);
    await updateDoc(productRef, {
      ...newProduct,
      price: Number(newProduct.price),
    });
    console.log("Updated product:", editIndex);
    setEditIndex(null);
    setNewProduct({ name: "", description: "", price: "", image: "" });
    setErrors({});
    setActiveButton(null);
    fetchProducts();
  };

  return (
    <main>
      <h1>Admin Editor</h1>
      <p className="subheading">Manage Products: Add, edit, or delete products in your store.</p>
      <div className="editor-layout">
        {/* Left panel for input and form */}
        <div className="editor-left">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <i className="search-icon">🔍</i>
          </div>

          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="sort-select">
            <option value="">-- Sort By --</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </select>

          <div className="add-form">
            <h2>{editIndex !== null ? "Edit product" : "Add new product"}</h2>

            <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            <small className="helper-text">Enter product name using letters only.</small>
            {errors.name === "" && newProduct.name && <p className="success-message">✔️ Passed!</p>}
            {errors.name && <p className="error-message">{errors.name}</p>}

            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
            <small className="helper-text">Enter product description using letters only.</small>
            {errors.description === "" && newProduct.description && <p className="success-message">✔️ Passed!</p>}
            {errors.description && <p className="error-message">{errors.description}</p>}

            <input
              type="text"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
            />
            <small className="helper-text">Enter product price using numbers only.</small>
            {errors.price === "" && newProduct.price && <p className="success-message">✔️ Passed!</p>}
            {errors.price && <p className="error-message">{errors.price}</p>}

            <input
              type="text"
              placeholder="Image URL (optional)"
              value={newProduct.image}
              onChange={(e) => handleInputChange("image", e.target.value)}
            />
            <small className="helper-text">Enter image URL (.jpg, .jpeg, or .png)</small>
            {errors.image === "" && newProduct.image && <p className="success-message">✔️ Passed!</p>}
            {errors.image && <p className="error-message">{errors.image}</p>}

            <div className="button-group">
              <button onClick={editIndex !== null ? handleSaveProduct : handleAddProduct}>
                {editIndex !== null ? "Save" : "Add Product"}
              </button>
              {editIndex !== null && (
                <button onClick={() => {
                  setEditIndex(null);
                  setNewProduct({ name: "", description: "", price: "", image: "" });
                  setErrors({});
                  setActiveButton(null);
                }}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right panel for product list */}
        <div className="editor-right">
          <div className="product-list-container">
            <h2>Product List</h2>
            <div className="product-list">
              {products
                .filter((product) => product.name?.toLowerCase().includes(searchQuery.toLowerCase()))
                .sort((a, b) => {
                  if (sortOption === "price-low") return a.price - b.price;
                  if (sortOption === "price-high") return b.price - a.price;
                  if (sortOption === "name-asc") return a.name.localeCompare(b.name);
                  if (sortOption === "name-desc") return b.name.localeCompare(a.name);
                  return 0;
                })
                .map((product) => {
                  // Show only the selected product in edit mode.
                  if (editIndex && editIndex !== product.id) return null;
                  return (
                    <div key={product.id} className="product-item">
                      {product.image && (
                        <img src={product.image} alt={product.name} className="product-image" />
                      )}
                      <p>
                        <strong>{product.name}</strong> — {product.price} kr
                      </p>
                      <button
                        onClick={() => {
                          console.log("delete item");
                          handleDeleteProduct(product.id);
                        }}
                        className={`icon-button ${activeButton === product.id + "-delete" ? "clicked" : ""}`}
                      >
                        <img src={IconTrashCan} alt="Remove" />
                      </button>
                      <button
                        onClick={() => {
                          console.log("edit item");
                          handleEditProduct(product.id);
                        }}
                        className={`icon-button ${activeButton === product.id + "-edit" ? "clicked" : ""}`}
                      >
                        <img src={IconPen} alt="Edit" />
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminEditor;
