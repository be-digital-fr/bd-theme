'use client';

// React and Next.js imports
import React, { PropsWithChildren } from 'react';
import Image from 'next/image';

// UI Components imports
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

// Types and Store imports
import { IProduct } from '@/app/types/Product.type';
import { useCartStore } from '@/app/store/cart-store';
import AlreadyInCartButtons from '../ui/product-cards/already-in-cart-buttons';

/**
 * Interface for tracking additional ingredients quantity
 */
interface ExtraQuantity {
  id: string;
  quantity: number;
}

/**
 * AddToCartButton Component
 *
 * A dialog component that allows users to customize their product before adding it to cart.
 * Features:
 * - Product image display
 * - Ingredient removal options
 * - Additional ingredients selection
 * - Special instructions input
 * - Price calculation
 *
 * @param {Object} props
 * @param {IProduct} props.product - The product to be added to cart
 * @param {React.ReactNode} props.children - The trigger element for the dialog
 */
export default function AddToCartButton({
  product,
  children,
}: PropsWithChildren<{ product: IProduct }>) {
  // Cart store integration
  const addItem = useCartStore((state) => state.addItem);
  const alreadyInCart = useCartStore((state) =>
    state.items.some((item) => item.id === product.id)
  );

  // State management
  const [isLoading, setIsLoading] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [removedIngredients, setRemovedIngredients] = React.useState<string[]>(
    []
  );
  const [additionalIngredients, setAdditionalIngredients] = React.useState<
    ExtraQuantity[]
  >([]);
  const [comment, setComment] = React.useState('');

  // Initialize loading state
  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  /**
   * Calculate total price including base price and additional ingredients
   */
  const totalPrice = React.useMemo(() => {
    const additionalPrice = additionalIngredients.reduce(
      (acc, { id, quantity }) => {
        const extra = product.extras?.find((e) => e.id === id);
        return acc + (extra?.price || 0) * quantity;
      },
      0
    );
    return product.price + additionalPrice;
  }, [additionalIngredients, product.price, product.extras]);

  /**
   * Handle quantity changes for additional ingredients
   */
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setAdditionalIngredients((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        );
      }
      return [...prev, { id, quantity: newQuantity }];
    });
  };

  /**
   * Toggle ingredient removal
   */
  const handleRemoveIngredient = (ingredient: string) => {
    removedIngredients.includes(ingredient)
      ? setRemovedIngredients((prev) => prev.filter((i) => i !== ingredient))
      : setRemovedIngredients((prev) => [...prev, ingredient]);
  };

  /**
   * Handle adding product to cart with customizations
   */
  const handleAddToCart = () => {
    const extras = additionalIngredients
      .filter(({ quantity }) => quantity > 0)
      .map(({ id, quantity }) => {
        const extra = product.extras?.find((e) => e.id === id);
        if (!extra) return null;
        return {
          id: extra.id,
          name: extra.name,
          price: extra.price,
          quantity,
        };
      })
      .filter((extra): extra is NonNullable<typeof extra> => extra !== null);

    addItem({
      ...product,
      quantity: 1,
      removeIngredients: removedIngredients,
      additionalIngredients: extras,
      comment,
    });

    // Reset form state
    setRemovedIngredients([]);
    setAdditionalIngredients([]);
    setComment('');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isLoading ? (
          <div className="opacity-0" aria-hidden="true">
            {children}
          </div>
        ) : alreadyInCart ? (
          <AlreadyInCartButtons className='w-max' product={product} />
        ) : (
          children
        )}
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-4xl max-h-[80vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle  className="sr-only">
            {product.name}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {product.shortDescription}
          </DialogDescription>
        </DialogHeader>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 md:mt-0">
          {/* Product Image Section */}
          <div
            className="bg-card h-min w-full p-4 rounded-full overflow-hidden flex items-center justify-center"
            role="img"
            aria-label={`${product.name} product image`}>
            <figure className="relative aspect-square w-full h-full">
              <Image
                src={product.image}
                alt={`${product.name} - Product image`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </figure>
          </div>

          {/* Product Details Section */}
          <section className="space-y-4" aria-labelledby="product-details">
            <header className="space-y-3">
              <h2
                id="product-details"
                className="text-xl font-semibold text-primary">
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
            {product.ingredients && product.ingredients.length > 0 && (
              <>
                <section>
                  <h3 className="font-medium mb-2" id="removable-ingredients">
                    Remove Ingredients
                  </h3>
                  <div
                    className="space-y-2"
                    role="group"
                    aria-labelledby="removable-ingredients">
                    {product.ingredients.map((ingredient) => (
                      <label
                        key={ingredient}
                        className="flex items-center space-x-2">
                        <Checkbox
                          checked={removedIngredients.includes(ingredient)}
                          onCheckedChange={() =>
                            handleRemoveIngredient(ingredient)
                          }
                          aria-label={`Remove ${ingredient}`}
                        />
                        <span className="text-sm">{ingredient}</span>
                      </label>
                    ))}
                  </div>
                </section>
                <Separator />
              </>
            )}

            {/* Additional Ingredients Section */}
            {product.extras && product.extras.length > 0 && (
              <>
                <section>
                  <h3 className="font-medium mb-2" id="additional-ingredients">
                    Additional Ingredients
                  </h3>
                  <div
                    className="space-y-4"
                    role="group"
                    aria-labelledby="additional-ingredients">
                    {product.extras.map((ingredient) => (
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
                            additionalIngredients.find(
                              (eq) => eq.id === ingredient.id
                            )?.quantity || 0
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
              </>
            )}

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

            <footer>
              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                aria-label={`Add to order - Total: ${totalPrice.toFixed(
                  2
                )} euros`}>
                Add to Order - {totalPrice.toFixed(2)}€
              </Button>
            </footer>
          </section>
        </main>
      </DialogContent>
    </Dialog>
  );
}
