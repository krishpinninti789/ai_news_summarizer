"use client"

import { SignUp } from "@clerk/nextjs"
import { Newspaper, Star } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Business Analyst",
      content: "This app saves me hours every day. The AI summaries are incredibly accurate!",
      rating: 5,
    },
    {
      name: "Mike Rodriguez",
      role: "Tech Journalist",
      content: "Finally, a news app that understands what I need. The categorization is perfect.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Sign Up Form */}
        <div className="flex justify-center lg:justify-start order-2 lg:order-1">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20">
            <SignUp
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

        {/* Right Side - Branding & Social Proof */}
        <div className="text-center lg:text-left order-1 lg:order-2">
          <Link href="/landing" className="inline-flex items-center gap-3 mb-8 group">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <Newspaper className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              NewsGist
            </span>
          </Link>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Join Thousands of
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Smart Readers
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Create your account and start experiencing the future of news consumption with AI-powered insights.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">10K+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">50+</div>
              <div className="text-sm text-gray-600">News Sources</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">95%</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <div className="flex mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm italic mb-2">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
