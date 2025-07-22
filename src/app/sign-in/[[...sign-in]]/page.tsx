"use client"

import { SignIn } from "@clerk/nextjs"
import { Newspaper, Sparkles, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding & Features */}
        <div className="text-center lg:text-left">
          <Link href="/landing" className="inline-flex items-center gap-3 mb-8 group">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <Newspaper className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI News Summarizer
            </span>
          </Link>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to the Future of
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              News Consumption
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Join thousands of users who stay informed with AI-powered news summaries from trusted sources worldwide.
          </p>

          {/* Features List */}
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <span className="font-semibold text-gray-800 text-lg">What you'll get:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "AI-powered news summaries",
                "Real-time updates from 50+ sources",
                "Personalized news categories",
                "Mobile-friendly experience",
                "Advanced search capabilities",
                "Bookmark favorite articles",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="flex justify-center lg:justify-end">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20">
            <SignIn
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm normal-case",
                  card: "bg-transparent shadow-none",
                  headerTitle: "text-2xl font-bold text-gray-900",
                  headerSubtitle: "text-gray-600",
                  socialButtonsBlockButton:
                    "border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50",
                  formFieldInput: "border-2 border-gray-200 focus:border-blue-500 rounded-lg",
                  footerActionLink: "text-blue-600 hover:text-blue-700 font-semibold",
                },
              }}
              redirectUrl="/"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
