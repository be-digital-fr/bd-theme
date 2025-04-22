import { Loader2 } from 'lucide-react';

/**
 * Loader Component
 * A spinning loader animation to indicate loading states
 * Accessible and animated loading indicator
 */
export default function Loader() {
  return (
    <Loader2
      className="w-4 h-4 animate-spin"
      role="progressbar"
      aria-label="Loading"
      aria-valuetext="Please wait while content loads"
    />
  );
}
