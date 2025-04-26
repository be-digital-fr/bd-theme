"use client";

// External dependencies
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import { BiMenuAltRight } from "react-icons/bi";
// Internal UI components
import {
  Button,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui";

// Utils
import { cn } from "@/app/_lib/utils";

// Types
import type { NavigationLinks } from "./types";

/**
 * Social media links configuration
 * Each link includes href, label and icon component
 */
const socialLinks = [
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: FiInstagram,
  },
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: FiFacebook,
  },
  {
    href: "https://twitter.com",
    label: "Twitter",
    icon: FiTwitter,
  },
] as const;

interface MobileNavigationProps {
  links: NavigationLinks;
}

/**
 * Mobile navigation component with slide-out menu
 * Includes main navigation links and social media links
 * Fully accessible with ARIA labels and roles
 */
export function MobileNavigation({ links }: MobileNavigationProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden bg-primary text-primary-foreground hover:bg-primary/80 rounded-full"
          aria-label="Ouvrir le menu de navigation"
          aria-expanded={open}
        >
          <BiMenuAltRight className="size-6" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[400px] lg:hidden"
        role="dialog"
        aria-label="Menu de navigation principal"
      >
        <SheetHeader>
          <SheetTitle className="text-left mb-4">
            <div>
              <Image
                src="/images/logo.png"
                alt="Logo du restaurant"
                width={140}
                height={140}
                className="object-contain"
                sizes="140px"
                priority
              />
            </div>
          </SheetTitle>
          <SheetDescription className="sr-only">Menu de navigation mobile</SheetDescription>
        </SheetHeader>

        <nav className="mt-8" aria-label="Navigation principale">
          <ul className="space-y-2" role="menu">
            {links.map((link) => (
              <li key={link.href} role="none" className="px-2">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === link.href ? "page" : undefined}
                  title={link.description}
                  role="menuitem"
                  className={cn(
                    "block w-full p-4 rounded-lg transition-colors duration-200",
                    pathname === link.href
                      ? "bg-primary text-primary-foreground font-medium"
                      : "hover:bg-primary/10"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-8 left-6 right-6">
          <Separator />
          <div
            className="flex items-center justify-around gap-4 py-4"
            role="navigation"
            aria-label="Liens vers nos réseaux sociaux"
          >
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visitez notre page ${label}`}
                className="text-foreground/80 hover:text-foreground transition-colors p-2"
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
