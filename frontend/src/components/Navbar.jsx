import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Menu, Globe } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <nav className="fixed w-full z-50 bg-[#0f1014]/90 backdrop-blur-md border-b border-[#2e303a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img src="/99Globalcpy.png" alt="NINETY NINE" className="h-12 w-auto object-contain" />
              <span className="text-base sm:text-lg md:text-xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-white font-bold tracking-wider">
                NINETY NINE
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {['nav_home', 'nav_perfumes', 'nav_watches', 'nav_all_products'].map((key, index) => {
              const paths = ['/', '/products?category=Perfumes', '/products?category=Watches', '/products'];
              return (
                <motion.div key={key} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link to={paths[index]} className="text-sm uppercase tracking-widest hover:text-[#d4af37] transition-all">
                    {t(key)}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <motion.button 
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-gray-300 hover:text-[#d4af37] transition-colors font-medium text-sm"
              title="Toggle Language"
            >
              <Globe size={18} />
              <span className="uppercase">{language === 'en' ? 'عربي' : 'EN'}</span>
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="text-gray-300 hover:text-[#d4af37] transition-colors">
              <Search size={20} />
            </motion.button>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link to="/products" className="text-gray-300 hover:text-[#d4af37] transition-colors">
                <ShoppingBag size={20} />
              </Link>
            </motion.div>
          </div>

          <div className="md:hidden flex items-center space-x-4 rtl:space-x-reverse">
            <motion.button 
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="text-gray-300 hover:text-[#d4af37] transition-colors font-medium text-xs flex items-center gap-1"
            >
              <Globe size={16} />
              <span className="uppercase">{language === 'en' ? 'AR' : 'EN'}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-[#d4af37]"
            >
              <Menu size={24} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#16171d] border-b border-[#2e303a] overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['nav_home', 'nav_perfumes', 'nav_watches', 'nav_all_products'].map((key, index) => {
                const paths = ['/', '/products?category=Perfumes', '/products?category=Watches', '/products'];
                return (
                  <motion.div key={key} whileHover={{ x: language === 'ar' ? -5 : 5, color: "#d4af37" }} whileTap={{ scale: 0.98 }}>
                    <Link to={paths[index]} className="block px-3 py-2 text-base transition-colors" onClick={() => setIsMenuOpen(false)}>
                      {t(key)}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
