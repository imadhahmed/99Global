import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const categories = ['All', 'Perfumes', 'Watches'];

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (product.itemCode && product.itemCode.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif text-white uppercase tracking-widest mb-4"
        >
          Our Collection
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="h-1 w-24 bg-[#d4af37] mx-auto"
        ></motion.div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="flex space-x-4 overflow-x-auto pb-2 w-full md:w-auto hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2 uppercase tracking-widest text-sm whitespace-nowrap transition-colors border ${
                activeCategory === category 
                  ? 'border-[#d4af37] text-[#d4af37] bg-[#d4af37]/10' 
                  : 'border-[#2e303a] text-gray-400 hover:text-white hover:border-gray-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="w-full md:w-72">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#16171d] border border-[#2e303a] rounded-none px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-24 text-gray-500">
          <p className="text-xl">Loading collections...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-gray-500">
          <p className="text-xl">No products found matching your criteria.</p>
          <button 
            onClick={() => { setSearchQuery(''); handleCategoryChange('All'); }}
            className="mt-6 text-[#d4af37] hover:underline uppercase tracking-wider text-sm"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
