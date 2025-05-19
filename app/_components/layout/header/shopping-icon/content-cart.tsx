import { Button, Separator, SheetFooter } from '@/app/_components/ui';
import ProductCart from '@/app/_components/ui/product-cards/product-cart';
import { useCartStore } from '@/app/store/cart-store';
import { IProduct } from '@/app/types/Product.type';
import { formatPrice } from '@/utils';

/* 
TODO:
- Handle shipping costs
- Handle discounts
- Handle taxes
*/

/**
 * ContentCart Component
 * 
 * Displays the shopping cart content including:
 * - List of products
 * - Subtotal calculation
 * - Shipping information
 * - Discount information
 * - Total price
 * - Checkout button
 * 
 * @param {Object} props
 * @param {IProduct[]} props.products - Array of products in the cart
 */
export default function ContentCart({ products }: { products: IProduct[] }) {
  const totalPrice = useCartStore((state) => state.totalPrice());

  return (
    <main 
      className="flex flex-col gap-4 h-full"
      aria-label="Shopping cart content">
      <ul 
        className="px-4"
        aria-label="Cart items">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCart product={product} />
          </li>
        ))}
      </ul>

      <aside className="mt-auto">
        <Separator className="my-4 data-[orientation=horizontal]:h-0.5 bg-card" />
        
        {/* Price Summary Section */}
        <div 
          className="flex items-center justify-between px-4 mb-2"
          role="group"
          aria-label="Price summary">
          <h2 className="text-xl font-bold">Subtotal</h2>
          <p 
            className="text-sm font-bold text-primary-dark"
            aria-label={`Subtotal: ${formatPrice(totalPrice)}`}>
            {formatPrice(totalPrice)}
          </p>
        </div>

        {/* Shipping Information */}
        <div 
          className="flex items-center justify-between px-4 text-sm"
          role="group"
          aria-label="Shipping information">
          <h3 className="text-sm font-medium">Shipping</h3>
          <p 
            className="text-primary"
            aria-label="Free shipping">
            Free
          </p>
        </div>

        {/* Discount Information */}
        <div 
          className="flex items-center justify-between px-4 text-sm"
          role="group"
          aria-label="Discount information">
          <h3 className="text-sm font-medium">Discount or Coupons Applied</h3>
          <span 
            className="text-primary"
            aria-label="No discounts applied">
            0€
          </span>
        </div>

        <Separator className="my-4 data-[orientation=horizontal]:h-0.5 bg-card" />

        {/* Checkout Footer */}
        <SheetFooter 
          className="space-y-4 sticky bottom-0 w-full bg-white pb-4"
          role="complementary"
          aria-label="Checkout summary">
          <div 
            className="flex items-center justify-between"
            role="group"
            aria-label="Total amount">
            <h2 className="text-xl font-extrabold">Total</h2>
            <p 
              className="text-primary-dark font-extrabold"
              aria-label={`Total amount: ${formatPrice(totalPrice)}`}>
              {formatPrice(totalPrice)}
            </p>
          </div>
          <Button 
            className="w-full" 
            size="lg"
            aria-label="Proceed to checkout">
            Go to Checkout
          </Button>
        </SheetFooter>
      </aside>
    </main>
  );
}
