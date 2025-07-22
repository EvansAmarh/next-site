"use client";

import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './button';
import { FolderOpen, PenBox } from 'lucide-react';
import UserMenu from '../user-menu';

const Header = () => {
  const { isSignedIn, user } = useUser();

  return (
    <header className="container mx-auto">
      <nav className="py-6 px-4 flex justify-between items-center">
        <Link href={"/"}>
          <Image
            src={"/likelogo.png"}
            alt="Gym logo"
            width={60}
            height={40}
            className="h-20 w-auto object-contain"
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
            <Button className="bg-pink-600 flex items-center gap-2">
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
