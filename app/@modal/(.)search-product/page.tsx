import { Suspense } from 'react';
import { ProductSearch } from '@/features/search-product/components';
import CustomLoader from '@/app/_components/ui/custom-loader';
import ModalDialogContainer from '../_components/dialog-container';

export default function SearchProductPage() {
  return (
    <Suspense fallback={<CustomLoader />}>
      <ModalDialogContainer
      
        ariaLabel="Recherche de produits"
        ariaDescription="Vous pouvez rechercher un produit par nom ou par description">
        <ProductSearch />
      </ModalDialogContainer>
    </Suspense>
  );
}
