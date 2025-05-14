import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white px-4 py-4 text-center text-sm text-[#4B5563]">
      <p>&copy; {new Date().getFullYear()} ScoreOracle. All rights reserved.</p>
    </footer>
  )
}

export default Footer
