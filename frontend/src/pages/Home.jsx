import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Luxury3DElement from '../components/Luxury3DElement';
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t, language } = useLanguage();

  const heroImages = [
    "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&q=80&w=2000",
    "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=2000",
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=2000",
    "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=2000",
    "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=2000",
    "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=2000",
    "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=2000"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-[#0f1014]">
        <div className="absolute inset-0">
          <AnimatePresence initial={false}>
            <motion.img
              key={currentSlide}
              src={heroImages[currentSlide]}
              alt="Luxury Background"
              initial={{ x: '100%', opacity: 0.75 }}
              animate={{ x: 0, opacity: 0.75 }}
              exit={{ x: '-100%', opacity: 0.75 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1014]/50 to-[#0f1014] z-0"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-3 sm:mb-5">
            
            {/* Text Container with Gold Smoke & Pulse Animation */}
            <div className="flex flex-col items-center">
              {/* NINETY NINE */}
              <motion.div className="flex flex-wrap justify-center text-4xl sm:text-5xl md:text-7xl font-serif text-[#d4af37] uppercase tracking-widest leading-tight">
                {(t('hero_title_1') || '').split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: 'blur(20px)', y: 20, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      filter: 'blur(0px)', 
                      y: 0,
                      scale: 1,
                      textShadow: ["0px 0px 0px rgba(212,175,55,0)", "0px 0px 20px rgba(212,175,55,0.6)", "0px 0px 0px rgba(212,175,55,0)"]
                    }}
                    transition={{ 
                      opacity: { duration: 1.5, delay: index * 0.1, ease: "easeOut" },
                      filter: { duration: 1.5, delay: index * 0.1, ease: "easeOut" },
                      y: { duration: 1.5, delay: index * 0.1, ease: "easeOut" },
                      scale: { duration: 1.5, delay: index * 0.1, ease: "easeOut" },
                      textShadow: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 + index * 0.1 }
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.div>
              
              {/* GLOBAL */}
              <motion.div className="flex flex-wrap justify-center text-4xl sm:text-5xl md:text-7xl font-serif text-[#d4af37] uppercase tracking-widest leading-tight mt-1 sm:mt-2">
                {(t('hero_title_2') || '').split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: 'blur(20px)', y: -20, scale: 1.2 }}
                    animate={{ 
                      opacity: 1, 
                      filter: 'blur(0px)', 
                      y: 0,
                      scale: 1,
                      textShadow: ["0px 0px 0px rgba(212,175,55,0)", "0px 0px 20px rgba(212,175,55,0.6)", "0px 0px 0px rgba(212,175,55,0)"]
                    }}
                    transition={{ 
                      opacity: { duration: 1.5, delay: 1 + index * 0.1, ease: "easeOut" },
                      filter: { duration: 1.5, delay: 1 + index * 0.1, ease: "easeOut" },
                      y: { duration: 1.5, delay: 1 + index * 0.1, ease: "easeOut" },
                      scale: { duration: 1.5, delay: 1 + index * 0.1, ease: "easeOut" },
                      textShadow: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 3 + index * 0.1 }
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto font-light px-2"
          >
            {t('hero_subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link to="/products?category=Perfumes" className="block px-6 py-3 md:px-8 md:py-4 text-sm md:text-base bg-[#d4af37] text-black font-medium tracking-wider uppercase hover:bg-white transition-colors duration-300 text-center">
                {t('shop_perfumes')}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link to="/products?category=Watches" className="block px-6 py-3 md:px-8 md:py-4 text-sm md:text-base bg-transparent border border-[#d4af37] text-[#d4af37] font-medium tracking-wider uppercase hover:bg-[#d4af37] hover:text-black transition-colors duration-300 text-center">
                {t('shop_watches')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-widest mb-2">{t('featured_collection')}</h2>
            <div className="h-1 w-24 bg-[#d4af37]"></div>
          </div>
          <motion.div whileHover={{ x: language === 'ar' ? -5 : 5 }}>
            <Link to="/products" className="hidden md:flex items-center text-[#d4af37] hover:text-white transition-colors tracking-widest uppercase text-sm font-medium">
              {t('view_all')} <ArrowRight className={`w-4 h-4 ${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </Link>
          </motion.div>
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

        <motion.div whileHover={{ scale: 1.05 }} className="mt-12 md:hidden flex justify-center">
          <Link to="/products" className="flex items-center text-[#d4af37] hover:text-white transition-colors tracking-widest uppercase text-sm font-medium">
            {t('view_all_collection')} <ArrowRight className={`w-4 h-4 ${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
          </Link>
        </motion.div>
      </section>

      {/* Cinematic Video Section */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
        >
          <source src="https://cdn.pixabay.com/video/2021/08/11/84687-587422396_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1014] via-[#0f1014]/60 to-[#0f1014]"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4 max-w-3xl"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white uppercase tracking-widest mb-4 sm:mb-6">{t('timeless_precision')} <span className="text-gradient">{t('precision')}</span></h2>
          <div className="h-1 w-16 sm:w-24 bg-[#d4af37] mx-auto mb-4 sm:mb-6"></div>
          <p className="text-gray-300 font-light text-base sm:text-lg md:text-xl leading-relaxed">
            {t('timeless_desc')}
          </p>
        </motion.div>
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
              className="h-[400px] md:h-[600px] w-full bg-[#0a0a0c] rounded-sm overflow-hidden relative shadow-2xl border border-[#d4af37]/10"
            >
              <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded border border-[#d4af37]/30 text-[10px] md:text-xs text-[#d4af37] uppercase tracking-widest font-medium">{t('interactive_3d')}</div>
              <Luxury3DElement />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white uppercase tracking-widest mb-4 sm:mb-6">{t('art_of')} <br /><span className="text-gradient">{t('elegance')}</span></h2>
              <p className="text-gray-400 mb-4 sm:mb-6 font-light leading-relaxed text-sm sm:text-base">
                {t('brand_story_1')}
              </p>
              <p className="text-gray-400 mb-10 font-light leading-relaxed">
                {t('brand_story_2')}
              </p>
              <img src="/signature.png" alt="Signature" className="h-12 opacity-50 hidden" /> {/* Placeholder for signature */}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
