import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-[#0f1014]/90 backdrop-blur-md border-b border-[#2e303a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img src="/99Globalcpy.png" alt="NINETY NINE" className="h-12 w-auto object-contain" />
              <span className="text-lg md:text-xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-white font-bold tracking-wider hidden sm:block">
                NINETY NINE
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm uppercase tracking-widest hover:text-[#d4af37] transition-colors">Home</Link>
            <Link to="/products?category=Perfumes" className="text-sm uppercase tracking-widest hover:text-[#d4af37] transition-colors">Perfumes</Link>
            <Link to="/products?category=Watches" className="text-sm uppercase tracking-widest hover:text-[#d4af37] transition-colors">Watches</Link>
            <Link to="/products" className="text-sm uppercase tracking-widest hover:text-[#d4af37] transition-colors">All Products</Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-300 hover:text-[#d4af37] transition-colors">
              <Search size={20} />
            </button>
            <Link to="/products" className="text-gray-300 hover:text-[#d4af37] transition-colors">
              <ShoppingBag size={20} />
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-[#d4af37]"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#16171d] border-b border-[#2e303a]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-base hover:text-[#d4af37]" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/products?category=Perfumes" className="block px-3 py-2 text-base hover:text-[#d4af37]" onClick={() => setIsMenuOpen(false)}>Perfumes</Link>
            <Link to="/products?category=Watches" className="block px-3 py-2 text-base hover:text-[#d4af37]" onClick={() => setIsMenuOpen(false)}>Watches</Link>
            <Link to="/products" className="block px-3 py-2 text-base hover:text-[#d4af37]" onClick={() => setIsMenuOpen(false)}>All Products</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
