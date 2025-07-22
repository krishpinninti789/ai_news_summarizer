"use client"

import { UserButton, useUser } from "@clerk/nextjs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Crown } from "lucide-react"

export function UserProfile() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-3">
        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
        <div className="hidden sm:block">
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="flex items-center gap-3">
      {/* User Info - Hidden on mobile */}
      <div className="hidden sm:block text-right">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-900">
            {user.firstName} {user.lastName}
          </p>
          <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 text-blue-700">
            <Crown className="w-3 h-3 mr-1" />
            Pro
          </Badge>
        </div>
        <p className="text-xs text-gray-500">{user.emailAddresses[0]?.emailAddress}</p>
      </div>

      {/* Custom Avatar with UserButton */}
      <div className="relative">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-10 h-10 rounded-full ring-2 ring-blue-100 hover:ring-blue-200 transition-all duration-200",
              userButtonPopoverCard: "bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl",
              userButtonPopoverActionButton: "hover:bg-blue-50 text-gray-700",
              userButtonPopoverActionButtonText: "text-sm",
              userButtonPopoverFooter: "hidden",
            },
          }}
          userProfileMode="navigation"
          userProfileUrl="/user-profile"
        />

        {/* Online Status Indicator */}
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
      </div>
    </div>
  )
}
