import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Use the first 3 products as featured
      setFeaturedProducts(productsData.slice(0, 3));
    }, (error) => {
      console.error("Error fetching featured products:", error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1615486171448-4fd13dbd7e97?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Background"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1014]/50 to-[#0f1014]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6 uppercase tracking-widest"
          >
            Redefine <span className="text-gradient">Luxury</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light"
          >
            Discover our exclusive collection of premium perfumes and masterfully crafted timepieces.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/products?category=Perfumes" className="px-8 py-4 bg-[#d4af37] text-black font-medium tracking-wider uppercase hover:bg-white transition-colors duration-300 w-full sm:w-auto text-center">
              Shop Perfumes
            </Link>
            <Link to="/products?category=Watches" className="px-8 py-4 bg-transparent border border-[#d4af37] text-[#d4af37] font-medium tracking-wider uppercase hover:bg-[#d4af37] hover:text-black transition-colors duration-300 w-full sm:w-auto text-center">
              Shop Watches
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-widest mb-2">Featured Collection</h2>
            <div className="h-1 w-24 bg-[#d4af37]"></div>
          </div>
          <Link to="/products" className="hidden md:flex items-center text-[#d4af37] hover:text-white transition-colors tracking-widest uppercase text-sm font-medium">
            View All <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 md:hidden flex justify-center">
          <Link to="/products" className="flex items-center text-[#d4af37] hover:text-white transition-colors tracking-widest uppercase text-sm font-medium">
            View All Collection <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-24 bg-[#16171d] border-y border-[#2e303a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=1000"
                alt="Brand Story"
                className="w-full h-[600px] object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-widest mb-6">The Art of <br /><span className="text-gradient">Elegance</span></h2>
              <p className="text-gray-400 mb-6 font-light leading-relaxed">
                At NINETY NINE, we believe that true luxury lies in the details. Every fragrance we curate and every timepiece we select represents the pinnacle of craftsmanship and design.
              </p>
              <p className="text-gray-400 mb-10 font-light leading-relaxed">
                Our collections are carefully sourced from around the world to bring you pieces that not only complement your style but also elevate your very presence. Experience the extraordinary.
              </p>
              <img src="/signature.png" alt="Signature" className="h-12 opacity-50 hidden" /> {/* Placeholder for signature */}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
