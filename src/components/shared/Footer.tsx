import { Newspaper } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Newspaper className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">NewsGist</span>
            </div>
            <div className="text-gray-400">© 2024 NewsGist. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer