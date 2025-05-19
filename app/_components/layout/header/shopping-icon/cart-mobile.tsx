import { useCartStore } from '@/app/store/cart-store';
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/app/_components/ui/sheet';
import ContentCart from './content-cart';

/**
 * CartMobile Component
 * 
 * Mobile version of the shopping cart that appears as a bottom sheet.
 * Displays the cart content in a slide-up panel optimized for mobile devices.
 * 
 * Features:
 * - Bottom sheet layout
 * - Scrollable content
 * - Fixed header
 * - Responsive height
 */
export default function CartMobile() {
  const products = useCartStore((state) => state.items);

  return (
    <SheetContent
      side="bottom"
      className="h-[70vh] rounded-t-2xl p-0 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart">
      <SheetHeader className="px-4 py-2">
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <main 
        className="flex-1 overflow-y-auto"
        role="main"
        aria-label="Cart content">
        <ContentCart products={products} />
      </main>
    </SheetContent>
  );
}
