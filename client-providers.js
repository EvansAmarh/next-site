'use client';

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/ui/header";

export default function ClientProviders({ children }) {
  return (
    <ClerkProvider>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Toaster richColors />
    </ClerkProvider>
  );
}
