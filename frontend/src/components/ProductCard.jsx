import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ProductCard({ product }) {
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600'];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 1500);
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="glass-panel overflow-hidden group flex flex-col h-full"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#1f2028]">
        {images.map((img, idx) => (
          <img 
            key={idx}
            src={img} 
            alt={`${product.name} - ${idx + 1}`}
            className={`absolute inset-0 object-cover w-full h-full transition-all duration-700 ${
              idx === currentImageIndex ? 'opacity-100 scale-105 z-0' : 'opacity-0 scale-100 -z-10'
            }`}
          />
        ))}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded border border-[#2e303a] z-10">
          {product.itemCode}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-xs text-[#d4af37] uppercase tracking-widest mb-2">{product.category}</div>
        <h3 className="text-lg font-medium text-white mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-grow">{product.description}</p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#2e303a]">
          <div className="flex flex-col">
            <span className="text-lg font-serif text-white">🇱🇰 Rs. {Number(product.priceLKR).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            <span className="text-sm font-serif text-gray-400">🇶🇦 QAR {Number(product.priceQAR).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          </div>
          <Link 
            to={`/products/${product.id}`}
            className="text-sm uppercase tracking-wider text-white hover:text-[#d4af37] transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
