// Show items in cart + total price with quantity, checkout button, and receipt
import { useState } from "react";
import useCartStore from "../store/cartStore"; 

// Declares a Cart component
const Cart = () => {
  // Access cart state and actions from Zustand store
  const cart = useCartStore((state) => state.cart); // Current list of cart items with quantity
  const addToCart = useCartStore((state) => state.addToCart); // Function to increase quantity or add item
  const decreaseFromCart = useCartStore((state) => state.decreaseFromCart); // Function to decrease quantity or remove item
  const clearCart = useCartStore((state) => state.clearCart); // Function to clear all items from cart

  const [isCheckedOut, setIsCheckedOut] = useState(false); // Tracks checkout status
  const [receipt, setReceipt] = useState({ items: [], total: 0 }); // Stores receipt (items and total price)

  // No need to group manually anymore — Zustand cart already includes quantity
  const groupedItems = cart;

  // Calculate total price by multiplying price × quantity for each item
  const totalPrice = groupedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // When the user clicks the checkout button:
  // 1. Copy cart items to receipt
  // 2. Save the total price
  // 3. Set checkout status to true
  // 4. Clear the cart
  const handleCheckout = () => {
    const receiptItems = groupedItems.map((item) => ({ ...item }));
    const receiptTotal = totalPrice;
    setReceipt({ items: receiptItems, total: receiptTotal });
    setIsCheckedOut(true);
    clearCart();
  };

  return (
    <main className="cart-container">
      <h1>Your Shopping Cart</h1>

      {isCheckedOut ? (
        // Show receipt after checkout
        <section className="receipt">
          <h2 className="receipt-title">Receipt</h2>
          <ul className="receipt-list">
            {receipt.items.map((item) => (
              <li key={item.id} className="receipt-item">
                {item.name} x {item.quantity} = {item.price * item.quantity} kr
              </li>
            ))}
          </ul>
          <div className="receipt-total">Total Paid: {receipt.total} kr</div>
          <p className="receipt-thankyou">Thank you for your purchase!</p>
        </section>
      ) : groupedItems.length === 0 ? (
        // If cart is empty, show message
        <p>Your cart is empty.</p>
      ) : (
        <>
          {/* Show items in the cart */}
          <ul className="cart-list">
            {groupedItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.alt} width={100} />
                <div className="cart-details">
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <p>Price: {item.price} kr</p>
                  <div className="cart-actions">
                    {/* Quantity buttons */}
                    <button
                      className="quantity-button-minus"
                      onClick={() => decreaseFromCart(item.id)} // Decrease quantity by 1 (or remove if quantity = 1)
                    >
                      – {/* changed: replaced icon with text */}
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-button-plus"
                      onClick={() => addToCart(item)} // Increase quantity by 1
                    >
                      + {/* changed: replaced icon with text */}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Show total and checkout button */}
          <h2>Total: {totalPrice} kr</h2>
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}
    </main>
  );
};

export default Cart;
