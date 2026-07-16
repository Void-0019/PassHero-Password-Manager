import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4 py-4">

        <div className="font-bold text-xl sm:text-2xl">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">Hero/&gt;</span>
        </div>

        <a
          href="https://github.com/void-0019"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="cursor-pointer">
            <img
              className="invert w-8 sm:w-10 hover:scale-110 transition-transform duration-200"
              src="icons/github.svg"
              alt="GitHub"
            />
          </button>
        </a>

      </div>
    </nav>
  )
}

export default Navbar