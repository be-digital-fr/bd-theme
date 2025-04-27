import React from 'react';
import { Card, CardContent } from '../card';
import Image from 'next/image';
import FavoriteButton from './favorite-icon';

export default function DefaultCard() {
  return (
    <Card className="max-w-80 relative">
      <CardContent>
        <div>
          <Image
            src="/images/products/pizza.png"
            alt="Product 1"
            width={320}
            height={200}
          />
        </div>

        <FavoriteButton productId="1" className="absolute top-2 right-2" />
      </CardContent>
    </Card>
  );
}
