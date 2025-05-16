import { create } from 'zustand';

// Create a Zustand store to manage cart-related state and actions
const useCartStore = create((set) => ({
  // Cart array to hold products. Each product has: id, name, price, quantity, etc.
  cart: [],

  // Adds a product to the cart or increases its quantity
  addToCart: (product) =>
    set((state) => {
      // Check if the product already exists in the cart
      const existing = state.cart.find((item) => item.id === product.id);

      // If it exists, increase quantity; otherwise, add it with quantity 1
      const updatedCart = existing
        ? state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cart, { ...product, quantity: 1 }];

      // Log total items in cart after update
      const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
      console.log(`Added ${product.name}. Now ${totalItems} item(s) in cart.`);

      // Update cart state
      return { cart: updatedCart };
    }),

  // Decreases the quantity of a product, or removes it if quantity becomes 0
  decreaseFromCart: (id) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === id);
      if (!existing) return { cart: state.cart }; // If not found, do nothing

      let updatedCart;

      // If quantity is 1 or less, remove the product from cart
      if (existing.quantity <= 1) {
        updatedCart = state.cart.filter((item) => item.id !== id);
        console.log(`Removed ${existing.name} from cart.`);
      } else {
        // Otherwise, decrease its quantity by 1
        updatedCart = state.cart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        console.log(`Decreased ${existing.name} to ${existing.quantity - 1}.`);
      }

      // Log total items in cart after update
      const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
      console.log(`Now ${totalItems} item(s) in cart.`);

      return { cart: updatedCart };
    }),

  // Completely removes a product from the cart (regardless of quantity)
  removeFromCart: (id) =>
    set((state) => {
      const removed = state.cart.find((item) => item.id === id);
      const updatedCart = state.cart.filter((item) => item.id !== id);

      const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
      console.log(`Removed ${removed?.name}. Now ${totalItems} item(s) in cart.`);

      return { cart: updatedCart };
    }),

  // Clears the entire cart
  clearCart: () => {
    console.log("Cart cleared. Now 0 items in cart.");
    set({ cart: [] });
  },
}));

// Export the store so it can be used in components
export default useCartStore;
