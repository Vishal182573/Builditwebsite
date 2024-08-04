"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  FaHome,
  FaServicestack,
  FaBuilding,
  FaCouch,
  FaPhone,
  FaInfoCircle,
  FaUserCircle,
} from "react-icons/fa";

// Importing React Icons

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="text-3xl font-extrabold text-black">
              Build<span className="text-blue-600">It</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/">
              <FaHome />
              <span>Home</span>
            </NavLink>
            <NavLink href="/services">
              <FaServicestack />
              <span>Services</span>
            </NavLink>
            <NavLink href="/properties">
              <FaBuilding />
              <span>Properties</span>
            </NavLink>
            <NavLink href="/gallery-interior">
              <FaCouch />
              <span>Gallery</span>
            </NavLink>
            <NavLink href="/interior">
              <FaPhone />
              <span>Interior</span>
            </NavLink>
            <NavLink href="/about">
              <FaInfoCircle />
              <span>About</span>
            </NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={() => {
                router.push("/enquiry");
              }}
              className="flex items-center space-x-2 font-semibold"
            >
              <FaUserCircle size={20} />
              <span>Enquiry form</span>
            </Button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/">
              <FaHome />
              <span>Home</span>
            </MobileNavLink>
            <MobileNavLink href="/services">
              <FaServicestack />
              <span>Services</span>
            </MobileNavLink>
            <MobileNavLink href="/properties">
              <FaBuilding />
              <span>Properties</span>
            </MobileNavLink>
            <MobileNavLink href="/gallery-interior">
              <FaCouch />
              <span>Gallery</span>
            </MobileNavLink>
            <MobileNavLink href="/interior">
              <FaPhone />
              <span>Interior</span>
            </MobileNavLink>
            <MobileNavLink href="/about">
              <FaInfoCircle />
              <span>About</span>
            </MobileNavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <Button
                onClick={() => {
                  router.push("/enquiry");
                }}
                className="w-full font-semibold flex items-center justify-center space-x-2"
              >
                <FaUserCircle size={20} />
                <span>Enquiry form</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="flex items-center text-black hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out space-x-2"
  >
    {children}
  </Link>
);

const MobileNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="items-center text-black hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium space-x-2"
  >
    {children}
  </Link>
);

export default Navbar;
