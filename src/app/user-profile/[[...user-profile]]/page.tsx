"use client";

import { UserProfile } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const UserProfilePage = () => {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      {/* Header */}
      <header className="border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/explore">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="neon-panel rounded-2xl p-8">
          <UserProfile
            appearance={{
              elements: {
                card: "bg-transparent shadow-none",
                navbar: "rounded-lg bg-[var(--surface-raised)]",
                navbarButton: "text-[var(--ink-muted)] hover:bg-[var(--surface)] hover:text-[var(--ink)]",
                navbarButtonIcon: "text-[var(--ink-faint)]",
                pageScrollBox: "bg-transparent",
                formButtonPrimary: "bg-[var(--neon-blue)] text-[var(--ink)] hover:bg-[var(--neon-blue)]",
              },
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default UserProfilePage;
