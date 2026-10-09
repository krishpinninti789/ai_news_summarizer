"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import UserProfile from "../UserProfile";
import { BrandMark } from "./BrandMark";

const Header = () => (
  <header className="site-header">
    <div className="site-header__inner">
      <Link href="/" aria-label="NewsGist home">
        <BrandMark />
      </Link>
      <nav className="hidden items-center gap-7 text-sm font-medium text-[var(--ink-muted)] md:flex" aria-label="Main navigation">
        <Link className="nav-link" href="/#how-it-works">How it works</Link>
        <Link className="nav-link" href="/#why-newsgist">Why NewsGist</Link>
        <SignedIn><Link className="nav-link" href="/explore">Explore</Link></SignedIn>
      </nav>
      <div className="flex items-center gap-2">
        <SignedOut>
          <Link href="/sign-in"><Button variant="ghost" className="hidden sm:inline-flex">Sign in</Button></Link>
          <Link href="/sign-up">
            <Button className="neon-button">
              Start reading <ArrowUpRight className="size-4" />
            </Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserProfile />
        </SignedIn>
      </div>
    </div>
  </header>
);

export default Header;
