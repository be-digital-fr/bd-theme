import React from 'react';
import Image from 'next/image';
import { Counter } from '../counter';
import { IProduct } from '@/app/types/Product.type';
import { useCartStore } from '@/app/store/cart-store';
import { formatPrice } from '@/utils';

import AlreadyInCartButtons from './already-in-cart-buttons';
import Link from 'next/link';
import slugify from 'slugify';
import { DisappearContent } from '../../animation';

/**
 * ProductCart Component
 *
 * Displays a product in the shopping cart with:
 * - Product image
 * - Product details (name, price)
 * - Extra ingredients selection
 * - Quantity controls
 *
 * @param {Object} props
 * @param {IProduct} props.product - The product to display
 */
interface ProductCartProps {
  product: IProduct;
}

export default function ProductCart({ product }: ProductCartProps) {
  const { updateQuantity } = useCartStore();
  const cartItem = useCartStore((state) =>
    state.items.find((item) => item.id === product.id)
  );

  const quantity = cartItem?.quantity || 0;
  const additionalIngredients = cartItem?.additionalIngredients || [];

  // Calculate total price including additional ingredients
  const additionalIngredientsPrice = additionalIngredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );
  const totalPrice = (product.price + additionalIngredientsPrice) * quantity;

  /**
   * Handles quantity changes for extra ingredients
   * @param {string} extraName - Name of the extra ingredient
   * @param {number} newQuantity - New quantity to set
   */
  const handleExtraQuantityChange = (
    extraName: string,
    newQuantity: number
  ) => {
    const currentAdditionalIngredients = cartItem?.additionalIngredients || [];
    const updatedAdditionalIngredients = currentAdditionalIngredients.filter(
      (eq) => eq.name !== extraName
    );
    if (newQuantity > 0) {
      const extra = product.extras?.find((e) => e.name === extraName);
      if (extra) {
        updatedAdditionalIngredients.push({
          id: extra.id,
          name: extra.name,
          price: extra.price,
          quantity: newQuantity,
        });
      }
    }
    updateQuantity(product.id, quantity, updatedAdditionalIngredients);
  };

  return (
    <DisappearContent
      as="article"
      className="flex gap-4 p-4 border-b last:border-b-0 border-card"
      aria-label={`Product: ${product.name}`}>
      {/* Image Section */}
      <div
        className="bg-card h-min w-min rounded-full overflow-hidden"
        role="img"
        aria-label={`Image of ${product.name}`}>
        <div className="relative w-24 h-24 flex-shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-md"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Details Section */}
      <div className="flex-1 space-y-4 md:space-y-6">
        <div className="flex">
          <div>
            <Link href={`/products/${slugify(product.name)}`} className="font-bold">
              {product.name}
            </Link>
            <p
              className="text-sm font-bold"
              aria-label={`Total price: ${formatPrice(totalPrice)}`}>
              {formatPrice(totalPrice)}
            </p>
          </div>
        </div>

        {/* Extras Section */}
        {product.extras && product.extras.length > 0 && (
          <section className="space-y-2" aria-label="Selected extras">
            <h3 className="font-medium">Selected Extras</h3>
            <div
              className="mt-2 space-y-0.5"
              role="list"
              aria-label="List of available extras">
              {product.extras.map((extra) => {
                const extraQuantity =
                  additionalIngredients.find((eq) => eq.name === extra.name)
                    ?.quantity || 0;
                return (
                  <div
                    key={extra.id}
                    className="flex items-center justify-between text-sm"
                    role="listitem">
                    <p className="flex items-center gap-2">
                      {extra.name}
                      <span
                        className="text-sm font-medium text-primary-dark"
                        aria-label={`Additional cost: ${extra.price} euros`}>
                        (+{extra.price.toFixed(2)}€)
                      </span>
                    </p>

                    <div
                      className="flex items-center gap-2"
                      role="group"
                      aria-label={`Quantity controls for ${extra.name}`}>
                      <Counter
                        value={extraQuantity}
                        onValueChange={(newQuantity) =>
                          handleExtraQuantityChange(extra.name, newQuantity)
                        }
                        min={0}
                        className="scale-75"
                        aria-label={`Select quantity of ${extra.name}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Controls Section */}
        <div
          className="mt-4 flex items-center justify-between"
          role="group"
          aria-label="Product quantity controls">
          <AlreadyInCartButtons product={product} />
        </div>
      </div>
    </DisappearContent>
  );
}
