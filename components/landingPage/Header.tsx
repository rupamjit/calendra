"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { SquarePen, AlignJustify } from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center border px-4 sm:px-6 md:px-10 border-b-2 border-gray-500 h-auto sm:h-20 py-4 sm:py-0 sticky top-0 z-10 bg-white">
      {/* Logo */}
      <div className="flex justify-between items-center w-full sm:w-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center sm:text-left">
          <span className="text-blue-600">Calen</span>dra
        </h1>
        <button
          className="sm:hidden p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <AlignJustify className="w-6 h-6" />
        </button>
      </div>

      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } sm:flex flex-col sm:flex-row justify-center sm:justify-between gap-3 sm:gap-5 w-full sm:w-auto mt-4 sm:mt-0`}
      >
        <Button className="cursor-pointer flex items-center gap-2 text-sm sm:text-base px-3 sm:px-4 py-2">
          <SquarePen className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Create Event</span>
        </Button>
        <Button className="cursor-pointer text-sm sm:text-base px-3 sm:px-4 py-2">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Header;
