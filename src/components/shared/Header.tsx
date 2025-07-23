import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Newspaper } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import UserProfile from "../UserProfile";

const Header = () => {
  return (
    <div>
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Newspaper className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-blue-600 bg-clip-text text-transparent">
                NewsGist
              </span>
            </div>
            <div className="flex items-center gap-4">
              <SignedOut>
                <Link href="/sign-in">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/explore">
                  <Button className="bg-blue-600 cursor-pointer hover:bg-blue-700">
                    Go to Dashboard
                  </Button>
                </Link>
                <div className="flex items-center gap-6">
                  <UserProfile />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
