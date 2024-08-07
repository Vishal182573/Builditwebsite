//eslint-disable

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  FaHome,
  FaServicestack,
  FaBuilding,
  FaCouch,
  FaInfoCircle,
  FaUserCircle,
  FaBath,
  FaBox,
  FaBlog,
  FaEdit,
} from "react-icons/fa";

// Importing React Icons

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 100; // Adjust this value to control how quickly the effect occurs
      const progress = Math.min(scrollPosition / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const backgroundColor = `rgba(255, 255, 255, ${scrollProgress})`;
  const textColor = `rgb(${Math.round(
    255 - scrollProgress * 255
  )}, ${Math.round(255 - scrollProgress * 255)}, ${Math.round(
    255 - scrollProgress * 255
  )})`;

  return (
    <nav
      className="shadow-md fixed top-0 z-50 w-full transition-all duration-300 ease-in-out"
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  py-1">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className={`text-3xl font-extrabold transition-colors duration-300 ease-in-out`}
              style={{ color: textColor }}
            >
              Build<span className="text-blue-600">It</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-12 text-sm">
            <NavLink href="/" textColor={textColor}>
              <FaHome />
              <span>Home</span>
            </NavLink>
            <NavLink href="/services" textColor={textColor}>
              <FaServicestack />
              <span>Services</span>
            </NavLink>
            <NavLink href="/properties" textColor={textColor}>
              <FaBuilding />
              <span>Properties</span>
            </NavLink>
            <NavLink href="/gallery-interior" textColor={textColor}>
              <FaCouch />
              <span>Gallery</span>
            </NavLink>
            <NavLink href="/interiors" textColor={textColor}>
              <FaBath />
              <span>Interior</span>
            </NavLink>
            <NavLink href="/about" textColor={textColor}>
              <FaInfoCircle />
              <span>About</span>
            </NavLink>

            <NavLink href="/blog" textColor={textColor}>
              <FaBlog />
              <span>Blog</span>
            </NavLink>
          </div>
          {/* <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={() => {
                router.push("/enquiry");
              }}
              className="flex items-center space-x-2 font-semibold"
            >
              <FaUserCircle size={20} />
              <span>Enquiry form</span>
            </Button>
          </div> */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ color: textColor }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-black backdrop-blur-sm bg-opacity-40">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/" textColor={textColor}>
              <FaHome />
              <span>Home</span>
            </MobileNavLink>
            <MobileNavLink href="/services" textColor={textColor}>
              <FaServicestack />
              <span>Services</span>
            </MobileNavLink>
            <MobileNavLink href="/properties" textColor={textColor}>
              <FaBuilding />
              <span>Properties</span>
            </MobileNavLink>
            <MobileNavLink href="/gallery-interior" textColor={textColor}>
              <FaCouch />
              <span>Gallery</span>
            </MobileNavLink>
            <MobileNavLink href="/interiors" textColor={textColor}>
              <FaBath />
              <span>Interior</span>
            </MobileNavLink>
            <MobileNavLink href="/about" textColor={textColor}>
              <FaInfoCircle />
              <span>About</span>
            </MobileNavLink>
          </div>
          <MobileNavLink href="/blog" textColor={textColor}>
            <FaBlog />
            <span>Blog</span>
          </MobileNavLink>
          {/* <div className="pt-4 pb-3 border-t border-gray-200">
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
          </div> */}
        </div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  textColor: string;
}

const NavLink = ({
  href,

  children,
  textColor,
}: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-1 transition-colors duration-300 ease-in-out`}
      style={{ color: textColor }}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ href, children, textColor }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={`items-center text-black hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium space-x-2`}
      style={{ color: textColor }}
    >
      {children}
    </Link>
  );
};

export default Navbar;
