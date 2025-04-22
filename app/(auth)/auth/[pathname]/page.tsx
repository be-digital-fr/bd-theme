import { AuthCard } from "@daveyplate/better-auth-ui";
import { authViewPaths } from "@daveyplate/better-auth-ui/server";
import Image from "next/image";
import Link from "next/link";

export function generateStaticParams() {
  return Object.values(authViewPaths).map((pathname) => ({ pathname }));
}

export default async function AuthPage({ params }: { params: Promise<{ pathname: string }> }) {
  const { pathname } = await params;

  return (
    <main className="min-h-screen flex flex-col grow p-4 items-center justify-center">
      {/* Logo */}
      <Link href="/" className="w-44 h-44 relative">
        <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
      </Link>
      <AuthCard  pathname={pathname} />
    </main>
  );
}
