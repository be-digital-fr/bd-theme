'use client';
import React, { PropsWithChildren } from 'react';
import Image from 'next/image';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/_components/ui/dialog';
import {
  Separator,
  Button,
  Checkbox,
  Counter,
  Textarea,
} from '@/app/_components/ui';
import { IProduct } from '@/app/types/Product.type';
import { useCartStore } from '@/app/store/cart-store';

// Interface for managing extra ingredient quantities
interface ExtraQuantity {
  id: string;
  quantity: number;
}

export default function AddToCartButton({
  product,
  children,
}: PropsWithChildren<{ product: IProduct }>) {
  const addItem = useCartStore((state) => state.addItem);
  const [isOpen, setIsOpen] = React.useState(false);

  // State management for removed ingredients, extra quantities, and special instructions
  const [removedIngredients, setRemovedIngredients] = React.useState<string[]>([]);
  const [extraQuantities, setExtraQuantities] = React.useState<ExtraQuantity[]>([]);
  const [comment, setComment] = React.useState('');

  // Calculate total price including base price and additional ingredients
  const totalPrice = React.useMemo(() => {
    const additionalPrice = extraQuantities.reduce((acc, { id, quantity }) => {
      const extra = product.extras?.find((e) => e.id === id);
      return acc + (extra?.price || 0) * quantity;
    }, 0);
    return product.price + additionalPrice;
  }, [extraQuantities, product.price, product.extras]);

  // Handle quantity changes for extra ingredients
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setExtraQuantities((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        );
      }
      return [...prev, { id, quantity: newQuantity }];
    });
  };

  const handleRemoveIngredient = (ingredient: string) => {
    removedIngredients.includes(ingredient)
      ? setRemovedIngredients((prev) => prev.filter((i) => i !== ingredient))
      : setRemovedIngredients((prev) => [...prev, ingredient]);
  };

  const handleAddToCart = () => {
    // Transform extraQuantities to match the CartItem interface
    const extras = extraQuantities.map(({ id, quantity }) => {
      const extra = product.extras?.find((e) => e.id === id);
      return {
        name: extra?.name || '',
        price: extra?.price || 0,
        quantity,
      };
    });

    // Add item to cart with all customizations
    addItem({
      ...product,
      quantity: 1,
      removedIngredients,
      extraQuantities: extras,
      comment,
    });

    // Reset form and close dialog
    setRemovedIngredients([]);
    setExtraQuantities([]);
    setComment('');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl" role="dialog" aria-modal="true">
        <DialogHeader>
          <DialogTitle aria-hidden="true" className="sr-only">
            {product.name}
          </DialogTitle>
          <DialogDescription aria-hidden="true" className="sr-only">
            {product.shortDescription}
          </DialogDescription>
        </DialogHeader>

        <main className="grid grid-cols-2 gap-6">
          {/* Product Image Section */}
          <figure className="relative aspect-square">
            <Image
              src={product.image}
              alt={`${product.name} - Product image`}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </figure>

          {/* Product Details Section */}
          <section className="space-y-4">
            <header className="space-y-3">
              <h2 className="text-xl font-semibold text-primary">
                {product.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
              <p
                className="text-xl font-bold mt-2 text-primary-dark"
                aria-label={`Base price: ${product.price} euros`}>
                {product.price}€
              </p>
            </header>

            <Separator />

            {/* Removable Ingredients Section */}
            <section>
              <h3 className="font-medium mb-2" id="removable-ingredients">
                Remove Ingredients
              </h3>
              <div
                className="space-y-2"
                role="group"
                aria-labelledby="removable-ingredients">
                {product.ingredients?.map((ingredient) => (
                  <label
                    key={ingredient}
                    className="flex items-center space-x-2">
                    <Checkbox
                      checked={removedIngredients.includes(ingredient)}
                      onCheckedChange={() => handleRemoveIngredient(ingredient)}
                      aria-label={`Remove ${ingredient}`}
                    />
                    <span className="text-sm">{ingredient}</span>
                  </label>
                ))}
              </div>
            </section>

            <Separator />

            {/* Additional Ingredients Section */}
            <section>
              <h3 className="font-medium mb-2" id="additional-ingredients">
                Additional Ingredients
              </h3>
              <div
                className="space-y-4"
                role="group"
                aria-labelledby="additional-ingredients">
                {product.extras?.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className="flex items-center justify-between">
                    <p className="text-sm">
                      {ingredient.name}{' '}
                      <span
                        className="text-sm font-semibold text-primary-dark"
                        aria-label={`Additional cost: ${ingredient.price} euros`}>
                        (+{ingredient.price.toFixed(2)}€)
                      </span>
                    </p>
                    <Counter
                      value={
                        extraQuantities.find((eq) => eq.id === ingredient.id)
                          ?.quantity || 0
                      }
                      onValueChange={(value) =>
                        handleQuantityChange(ingredient.id, value)
                      }
                      min={0}
                      max={10}
                      aria-label={`Quantity of ${ingredient.name}`}
                    />
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            {/* Special Instructions Section */}
            <section>
              <h3 className="font-medium mb-2" id="special-instructions">
                Special Instructions
              </h3>
              <Textarea
                placeholder="Add any special instructions or preferences..."
                className="min-h-[100px] resize-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                aria-labelledby="special-instructions"
              />
            </section>

            {/* Add to Order Button */}
            <footer>
              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                aria-label={`Add to order - Total: ${totalPrice.toFixed(2)} euros`}>
                Add to Order - {totalPrice.toFixed(2)}€
              </Button>
            </footer>
          </section>
        </main>
      </DialogContent>
    </Dialog>
  );
}
