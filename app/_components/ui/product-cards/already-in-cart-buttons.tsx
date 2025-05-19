import React from 'react';
import { Counter } from '../counter';
import { Button } from '../button';
import { Trash2 } from 'lucide-react';
import { useCartStore } from '@/app/store/cart-store';
import { IProduct } from '@/app/types/Product.type';
import { cn } from '@/app/_lib';
import { DisappearButton } from '../../animation';

/**
 * AlreadyInCartButtons Component
 *
 * Displays quantity controls and remove button for products already in cart.
 * Provides accessibility features for screen readers and keyboard navigation.
 *
 * @param {Object} props
 * @param {IProduct} props.product - The product to control
 */
interface AlreadyInCartButtonsProps {
  product: IProduct;
  className?: string;
}

export default function AlreadyInCartButtons({
  product,
  className,
}: AlreadyInCartButtonsProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const cartItem = useCartStore((state) =>
    state.items.find((item) => item.id === product.id)
  );

  const quantity = cartItem?.quantity || 0;
  const additionalIngredients = cartItem?.additionalIngredients || [];

  return (
    <div
      className={cn('grid grid-cols-2 gap-2 place-items-center', className)}
      role="group"
      aria-label={`Controls for ${product.name}`}>
      <Counter
        value={quantity}
        onValueChange={(newQuantity) =>
          updateQuantity(product.id, newQuantity, additionalIngredients)
        }
        min={1}
        max={10}
        aria-label={`Quantity of ${product.name}`}
      />
      <DisappearButton>
        <Button
          onClick={() => removeItem(product.id)}
          size="icon"
          variant="destructive"
          aria-label={`Remove ${product.name} from cart`}
          className="hover:scale-110 active:scale-90 transition-transform">
          <Trash2 className="w-5 h-5" aria-hidden="true" />
        </Button>
      </DisappearButton>
    </div>
  );
}
