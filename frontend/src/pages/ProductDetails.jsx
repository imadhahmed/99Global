import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Share2, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { generateWhatsAppLink } from '../utils/whatsapp';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `NINETY NINE - ${product?.name}`,
      text: `Check out ${product?.name} at NINETY NINE`,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const images = product?.images && product.images.length > 0 
    ? product.images 
    : [product?.image || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600'];
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-xl">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-serif text-white mb-4">Product Not Found</h2>
        <p className="text-gray-400 mb-8">The item you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="text-[#d4af37] hover:underline uppercase tracking-wider text-sm flex items-center">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Collection
        </Link>
      </div>
    );
  }

  // WhatsApp URLs are handled directly in the buttons below

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <Link to="/products" className="inline-flex items-center text-gray-400 hover:text-white transition-colors tracking-widest uppercase text-xs mb-12">
        <ArrowLeft className="mr-2 w-4 h-4" /> Back to Collection
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
        {/* Product Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <div className="relative aspect-[4/5] bg-[#1f2028] border border-[#2e303a] p-2">
            <img 
              src={images[selectedImage]} 
              alt={product.name}
              className="object-cover w-full h-full transition-opacity duration-300"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square bg-[#1f2028] border p-1 transition-colors ${selectedImage === idx ? 'border-[#d4af37]' : 'border-[#2e303a] hover:border-gray-500'}`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col h-full justify-center"
        >
          <div className="text-sm text-[#d4af37] uppercase tracking-widest mb-4 flex justify-between items-center">
            <span>{product.category}</span>
            <div className="flex items-center gap-4">
              <span className="text-gray-500">Code: {product.itemCode}</span>
              <button 
                onClick={handleShare}
                className="text-gray-400 hover:text-[#d4af37] transition-colors flex items-center gap-1"
                title="Share Product"
              >
                {isCopied ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
                {isCopied && <span className="text-green-500 text-xs lowercase tracking-normal">Copied!</span>}
              </button>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
            {product.name}
          </h1>
          
          <div className="flex flex-col gap-2 mb-8 border-b border-[#2e303a] pb-8">
            <div className="text-3xl font-serif text-white">
              🇱🇰 Rs. {Number(product.priceLKR).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </div>
            <div className="text-xl font-serif text-gray-400">
              🇶🇦 QAR {Number(product.priceQAR).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </div>
          </div>
          
          <div className="mb-10">
            <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-4">Description</h3>
            <p className="text-gray-300 font-light leading-relaxed">
              {product.description}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => {
                const whatsappUrl = generateWhatsAppLink(product, "94754614546", "LK");
                window.open(whatsappUrl, '_blank');
              }}
              className="flex-1 py-4 bg-[#d4af37] text-black font-medium tracking-wider uppercase hover:bg-white transition-colors duration-300 flex justify-center items-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              Order 🇱🇰
            </button>
            <button 
              onClick={() => {
                const whatsappUrl = generateWhatsAppLink(product, "97470998206", "QA");
                window.open(whatsappUrl, '_blank');
              }}
              className="flex-1 py-4 bg-transparent border border-[#d4af37] text-[#d4af37] font-medium tracking-wider uppercase hover:bg-[#d4af37] hover:text-black transition-colors duration-300 flex justify-center items-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              Order 🇶🇦
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-6 text-center italic">
            Clicking the button will redirect you to WhatsApp with a pre-filled order message.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
