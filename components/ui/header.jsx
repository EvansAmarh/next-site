"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import { FolderOpen, PenBox } from "lucide-react";
import UserMenu from "../user-menu";
import { supabase } from "@/lib/supabaseClient";

const Header = () => {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    const syncUserToSupabase = async () => {
      if (!user) return;

      try {
        const { data: existingUser, error: findError } = await supabase
          .from("users")
          .select("id")
          .eq("clerk_user_id", user.id)
          .single();

        if (!existingUser || findError?.code === "PGRST116") {
          const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();

          const { error: insertError } = await supabase.from("users").insert([
            {
              clerk_user_id: user.id,
              email: user.emailAddresses[0]?.emailAddress,
              name,
              image_url: user.imageUrl,
            },
          ]);

          if (insertError) throw insertError;
          console.log("✅ User synced to Supabase");
        }
      } catch (error) {
        console.error("❌ Error syncing user to Supabase:", error.message);
      }
    };

    if (isSignedIn) syncUserToSupabase();
  }, [isSignedIn, user]);

  return (
    <header className="container mx-auto">
      <nav className="py-6 px-4 flex justify-between items-center">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="Gym logo"
            width={1080}
            height={1000}
            className="h-32 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-4">
          {isSignedIn && (
            <Link href="/dashboard#collection">
              <Button variant="outline" className="flex items-center gap-2">
                <FolderOpen size={18} />
                <span className="hidden md:inline">Collection</span>
              </Button>
            </Link>
          )}

          <Link href="/journal/write">
            <Button className="bg-blue-600 flex items-center gap-2">
              <PenBox size={18} />
              <span className="hidden md:inline">Write New</span>
            </Button>
          </Link>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserMenu />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
