import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0f1014] border-t border-[#2e303a] py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img src="/99Globalcpy.png" alt="Ninty Nine Global" className="h-14 w-auto object-contain" />
            <p className="mt-4 text-sm text-gray-400">
              Premium luxury perfumes and watches. Elevate your presence with our exclusive collections.
            </p>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4 tracking-wider uppercase">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/products?category=Perfumes" className="hover:text-[#d4af37] transition-colors">Perfumes</Link></li>
              <li><Link to="/products?category=Watches" className="hover:text-[#d4af37] transition-colors">Watches</Link></li>
              <li><Link to="/products" className="hover:text-[#d4af37] transition-colors">All Collections</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4 tracking-wider uppercase">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>muhammadsadihq@gmail.com</li>
              <li className="flex items-center gap-2"><span>🇱🇰</span> +94 75 461 4546</li>
              <li className="flex items-center gap-2"><span>🇶🇦</span> +974 7099 8206</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#2e303a] text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Ninty Nine Global. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
