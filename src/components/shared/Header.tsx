"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import UserProfile from "../UserProfile";
import { BrandMark } from "./BrandMark";

const Header = () => {
  const pathname = usePathname();
  const isExplorePage = pathname === "/explore";
  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" aria-label="NewsGist home">
          <BrandMark />
        </Link>
        <div className="flex items-center gap-2">
          {!isExplorePage && (
            <nav
              className="hidden items-center gap-7 text-sm font-medium text-[var(--ink-muted)] md:flex"
              aria-label="Main navigation"
            >
              <SignedIn>
                <Link
                  className="nav-link flex justify-center items-center neon-button h-12 rounded-full px-4 py-2"
                  href="/explore"
                >
                  Explore
                </Link>
              </SignedIn>
            </nav>
          )}
          <SignedOut>
            {!isAuthPage && (
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="neon-button hidden rounded-full sm:inline-flex"
                >
                  Sign in
                </Button>
              </Link>
            )}
          </SignedOut>
          <SignedIn>
            <UserProfile />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
