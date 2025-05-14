// Show items in cart + total price with quantity, checkout button, and receipt
import { useState } from "react";
import useCart from "../components/useCart";

const Cart = () => {
  const { cartItems, removeFromCart, addToCart, clearCart } = useCart();
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [receipt, setReceipt] = useState({ items: [], total: 0 });

  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const totalPrice = groupedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const receiptItems = groupedItems.map(item => ({ ...item }));
    const receiptTotal = totalPrice;
    setReceipt({ items: receiptItems, total: receiptTotal });
    setIsCheckedOut(true);
    clearCart();
  };

  return (
    <main className="cart-container">
      <h1>Your Shopping Cart</h1>

      {isCheckedOut ? (
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
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {groupedItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.alt} width={100} />
                <div className="cart-details">
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <p>Price: {item.price} kr</p>
                  <div className="cart-actions">
                    {/* Use images for + and - buttons */}
                    <img
                      src="/images/minus.png"  // minus button
                      alt="minus"
                      className="quantity-button-minus"
                      onClick={() => removeFromCart(cartItems.findIndex(i => i.id === item.id))}
                    />
                    <span>{item.quantity}</span>
                    <img
                      src="/images/addition.png"  // addition button
                      alt="plus"
                      className="quantity-button-plus"
                      onClick={() => addToCart(item)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
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

