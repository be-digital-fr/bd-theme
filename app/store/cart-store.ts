import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IProduct } from '../types/Product.type';

/**
 * CartItem Interface
 * Defines the structure of an item in the shopping cart
 */
export interface CartItem extends IProduct {
  quantity: number;
  comment: string;
}

/**
 * CartStore Interface
 * Defines the shape of the cart store including state and actions
 */
export interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number, additionalIngredients?: IProduct['additionalIngredients']) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

/**
 * Cart Store
 *
 * A Zustand store that manages the shopping cart state with persistence.
 * Uses the persist middleware to save cart state to localStorage.
 *
 * Features:
 * - Add items to cart (increments quantity if item exists)
 * - Remove items from cart
 * - Update item quantities
 * - Clear entire cart
 * - Calculate total items and price
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial empty cart state
      items: [],

      /**
       * Adds an item to the cart or increments its quantity if it exists
       * @param item - The item to add to the cart
       */
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }

          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },

      /**
       * Removes an item from the cart by its ID
       * @param id - The ID of the item to remove
       */
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      /**
       * Updates the quantity of an item in the cart
       * @param id - The ID of the item to update
       * @param quantity - The new quantity
       * @param additionalIngredients - Optional array of additional ingredients
       */
      updateQuantity: (id, quantity, additionalIngredients) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity, additionalIngredients: additionalIngredients || item.additionalIngredients } : item
          ),
        }));
      },

      /**
       * Clears all items from the cart
       */
      clearCart: () => {
        set({ items: [] });
      },

      /**
       * Calculates the total number of items in the cart
       * @returns The sum of all item quantities
       */
      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      /**
       * Calculates the total price of all items in the cart
       * @returns The sum of (price * quantity) for all items
       */
      totalPrice: () => {
        return get().items.reduce(
          (total, item) => {
            const basePrice = item.price * item.quantity;
            const extrasPrice = (item.additionalIngredients || []).reduce(
              (acc, extra) => acc + extra.price * extra.quantity,
              0
            );
            return total + basePrice + extrasPrice;
          },
          0
        );
      },
    }),
    {
      name: 'cart-storage', // Key used for localStorage
    }
  )
);
