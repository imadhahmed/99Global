import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0f1014] border-t border-[#2e303a] py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <img src="/99Globalcpy.png" alt="NINETY NINE" className="h-14 w-auto object-contain" />
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
              <li>
                <a href="mailto:muhammadsadihq@gmail.com" className="hover:text-[#d4af37] transition-colors">muhammadsadihq@gmail.com</a>
              </li>
              <li>
                <a href="https://wa.me/94754614546" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#d4af37] transition-colors"><span>🇱🇰</span> +94 75 461 4546</a>
              </li>
              <li>
                <a href="https://wa.me/97470998206" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#d4af37] transition-colors"><span>🇶🇦</span> +974 7099 8206</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4 tracking-wider uppercase">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61589552362517&sfnsn=wa" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#d4af37] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://www.instagram.com/99_ninety_nine_global_?igsh=N2lrbDJxbGpiOXll" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#d4af37] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#2e303a] text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} NINETY NINE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
