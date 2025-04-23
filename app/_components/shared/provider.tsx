import React, { PropsWithChildren } from "react";
import { Toaster as ToasterReactHotToast } from "react-hot-toast";

// Components
import { Toaster } from "@/app/_components/ui";
import { AuthProvider } from "@/infrastructure/better-auth/provider";
import { ReactQueryProvider } from "@/infrastructure/react-query";

export default function Provider({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        {children}

        {/* Toaster */}
        <Toaster />
        <ToasterReactHotToast />
      </AuthProvider>
    </ReactQueryProvider>
  );
}
