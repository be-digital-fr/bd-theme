'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { Minus, Plus, Trash2 } from 'lucide-react';

import { useCartStore, CartStore } from '@/app/store/cart-store';
import { catchError } from '@/utils';
import { Product } from './default-card';
import CustomLoader from '../custom-loader';
import { Button } from '../button';

/**
 * AddToCartButton Component
 *
 * A dynamic button component that handles product cart operations:
 * - Initial "Add to cart" state for products not in cart
 * - Quantity controls (+/-) and remove button for products in cart
 *
 * @param {Product} product - The product to be added/managed in cart
 * @returns {JSX.Element} Button or quantity controls based on cart state
 */
export default function AddToCartButton({ product }: Product) {
  // Cart store hooks for managing cart state
  const addItem = useCartStore((state: CartStore) => state.addItem);
  const removeItem = useCartStore((state: CartStore) => state.removeItem);
  const updateQuantity = useCartStore(
    (state: CartStore) => state.updateQuantity
  );
  const items = useCartStore((state: CartStore) => state.items);

  // Loading state for async operations
  const [isLoading, setIsLoading] = React.useState(false);

  // Check if product exists in cart and get its details
  const cartItem = items.find((item) => item.id === product.id);
  const isInCart = !!cartItem;

  /**
   * Handles initial product addition to cart
   * Uses addItem which will either:
   * - Add new product with quantity 1 if not in cart
   * - Increment quantity if product exists
   */
  const handleAddToCart = async () => {
    setIsLoading(true);
    const [error] = await catchError(
      Promise.resolve(addItem({ ...product, quantity: 1 }))
    );

    if (error) {
      toast.error('Error adding product to cart');
    } else {
      toast.success('Product added to cart');
    }
    setIsLoading(false);
  };

  /**
   * Removes product completely from cart
   * Uses removeItem to filter out the product
   */
  const handleRemoveFromCart = async () => {
    setIsLoading(true);
    const [error] = await catchError(Promise.resolve(removeItem(product.id)));

    if (error) {
      toast.error('Error removing product from cart');
    } else {
      toast.success('Product removed from cart');
    }
    setIsLoading(false);
  };

  /**
   * Decreases product quantity by 1
   * Only works if current quantity > 1
   * Uses updateQuantity to modify existing item
   */
  const handleDecreaseQuantity = async () => {
    if (!cartItem || cartItem.quantity <= 1) return;
    setIsLoading(true);
    const [error] = await catchError(
      Promise.resolve(updateQuantity(product.id, cartItem.quantity - 1))
    );

    if (error) {
      toast.error('Error updating quantity');
    }
    setIsLoading(false);
  };

  /**
   * Increases product quantity by 1
   * Uses addItem to increment existing item quantity
   * This maintains consistency with initial add behavior
   */
  const handleIncreaseQuantity = async () => {
    setIsLoading(true);
    const [error] = await catchError(
      Promise.resolve(addItem({ ...product, quantity: 1 }))
    );

    if (error) {
      toast.error('Error updating quantity');
    }
    setIsLoading(false);
  };

  // Render quantity controls if product is in cart
  if (isInCart) {
    return (
      <div className="flex items-center gap-2">
        <Button
          size={'icon'}
          variant={'tertiary'}
          className="rounded-full"
          onClick={handleDecreaseQuantity}
          disabled={isLoading || cartItem.quantity <= 1}>
          <Minus className="w-4 h-4" />
        </Button>

        <span className="text-sm font-medium min-w-[20px] text-center">
          {cartItem.quantity}
        </span>

        <Button
          size={'icon'}
          variant={'tertiary'}
          className="rounded-full"
          onClick={handleIncreaseQuantity}
          disabled={isLoading}>
          <Plus className="w-4 h-4" />
        </Button>

        <Button
          size={'icon'}
          variant={'destructive'}
          className="rounded-full"
          onClick={handleRemoveFromCart}
          disabled={isLoading}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  // Render add to cart button if product is not in cart
  return (
    <Button
      size={'sm'}
      className="rounded-full"
      onClick={handleAddToCart}
      disabled={isLoading}>
      {isLoading ? <CustomLoader /> : 'Add to cart'}
    </Button>
  );
}
