'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '../dialog';
import { Heart, HeartOff } from 'lucide-react';
import { Button } from '../button';
import { authClient } from '@/infrastructure/better-auth/lib';
import Link from 'next/link';
import { cn } from '@/app/_lib';

interface FavoriteButtonProps {
  productId: string;
  className?: string;
}

export const FavoriteButton = ({
  productId,
  className,
}: FavoriteButtonProps) => {
  const { data: session } = authClient.useSession();
  const [showDialog, setShowDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    if (!session?.user) {
      setShowDialog(true);
      return;
    }
    console.log('add to favorite');
  };

  return (
    <>
      <Button
        aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        variant="ghost"
        size="icon"
        className={cn(
          'p-2 focus:ring-2 focus:ring-offset-2 focus:ring-primary text-gray-500 hover:text-white transition-all duration-300',
          className
        )}
        onClick={handleClick}>
        {isFavorite ? (
          <HeartOff size={20} className="text-red-500" />
        ) : (
          <Heart className=" size-5" />
        )}
      </Button>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogTitle>Connexion requise</DialogTitle>
          <p className="mb-4">
            Vous devez être connecté pour ajouter un produit à vos favoris.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Annuler
            </Button>
            <Button variant="default" asChild>
              <Link href="/auth/sign-in">Se connecter</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FavoriteButton;
