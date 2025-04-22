import { Suspense } from 'react';
import { ProductSearch } from '@/features/search-product/components';
import CustomLoader from '@/app/_components/ui/custom-loader';

export default function SearchProductPage() {
  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<CustomLoader />}>
        <ProductSearch />
      </Suspense>
    </div>
  );
}
