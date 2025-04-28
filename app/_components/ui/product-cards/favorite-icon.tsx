'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '../dialog';
import { Heart, HeartHandshake, HeartOff } from 'lucide-react';
import { Button } from '../button';
import { authClient } from '@/infrastructure/better-auth/lib';
import Link from 'next/link';
import { cn } from '@/app/_lib';
import { toggleFavorite, checkFavorite } from '@/app/action/favorite';

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

  useEffect(() => {
    const checkInitialFavorite = async () => {
      if (session?.user) {
        const { isFavorite } = await checkFavorite(productId);
        setIsFavorite(isFavorite);
      }
    };
    checkInitialFavorite();
  }, [session?.user, productId]);

  const handleClick = async () => {
    if (!session?.user) {
      setShowDialog(true);
      return;
    }
    const res = await toggleFavorite({ productId, isFavorite: isFavorite });
    if (res.success) {
      setIsFavorite(res.isFavorite);
    }
  };

  return (
    <>
      <Button
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        variant="ghost"
        size="icon"
        className={cn(
          'p-2 focus:ring-2 focus:ring-offset-2 focus:ring-primary text-gray-500 hover:text-white transition-all duration-300',
          className
        )}
        onClick={handleClick}>
        {isFavorite ? (
          <HeartHandshake fill="red" className="text-red-500 size-5" />
        ) : (
          <Heart className="size-5" />
        )}
      </Button>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogTitle>Connection required</DialogTitle>
          <p className="mb-4">
            You must be connected to add a product to your favorites.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button variant="default" asChild>
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FavoriteButton;
