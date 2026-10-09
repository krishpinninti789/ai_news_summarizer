"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Crown } from "lucide-react";

const UserProfile = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-3">
        <Loader2 className="w-5 h-5 animate-spin text-[var(--neon-blue)]" />
        <div className="hidden sm:block">
          <div className="h-4 w-20 animate-pulse rounded bg-[var(--surface-raised)]"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex items-center gap-3">
      {/* User Info - Hidden on mobile */}
      <div className="hidden sm:block text-right">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-[var(--ink)]">
            {user.firstName} {user.lastName}
          </p>
          <Badge
            variant="outline"
            className="border-[var(--neon-blue)]/40 bg-[var(--neon-blue)]/10 text-[var(--neon-blue)]"
          >
            <Crown className="w-3 h-3 mr-1" />
            Pro
          </Badge>
        </div>
        <p className="text-xs text-[var(--ink-faint)]">
          {user.emailAddresses[0]?.emailAddress}
        </p>
      </div>

      {/* Custom Avatar with UserButton */}
      <div className="relative">
        <UserButton
          appearance={{
            elements: {
              avatarBox:
                "w-10 h-10 rounded-full ring-2 ring-[var(--neon-blue)]/40 hover:ring-[var(--neon-blue)] transition-all duration-200",
              userButtonPopoverCard:
                "bg-[var(--surface)] border border-[var(--line)] shadow-xl",
              userButtonPopoverActionButton: "hover:bg-[var(--surface-raised)] text-[var(--ink)]",
              userButtonPopoverActionButtonText: "text-sm",
              userButtonPopoverFooter: "hidden",
            },
          }}
          userProfileMode="navigation"
          userProfileUrl="/user-profile"
        />

        {/* Online Status Indicator */}
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[var(--paper)] bg-[var(--success)]"></div>
      </div>
    </div>
  );
};

export default UserProfile;
