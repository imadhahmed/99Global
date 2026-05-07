import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, X, ImageIcon } from 'lucide-react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export default function ProductsManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', itemCode: '', category: 'Perfumes', priceLKR: '', priceQAR: '', description: '', image: '', image2: '', image3: '', image4: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleAdd = () => {
    setFormData({ name: '', itemCode: '', category: 'Perfumes', priceLKR: '', priceQAR: '', description: '', image: '', image2: '', image3: '', image4: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setFormData({
      ...product,
      image: product.images ? product.images[0] : (product.image || ''),
      image2: product.images && product.images.length > 1 ? product.images[1] : '',
      image3: product.images && product.images.length > 2 ? product.images[2] : '',
      image4: product.images && product.images.length > 3 ? product.images[3] : '',
    });
    setEditingId(product.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (error) {
        console.error("Error deleting product: ", error);
        alert("Failed to delete product.");
      }
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.itemCode) {
      alert("Please fill in required fields.");
      return;
    }

    try {
      const allImages = [formData.image, formData.image2, formData.image3, formData.image4].filter(img => img && img.trim() !== '');
      const primaryImage = allImages.length > 0 ? allImages[0] : 'https://images.unsplash.com/photo-1523293115678-d29062015e14?auto=format&fit=crop&q=80&w=800';

      const productData = {
        name: formData.name,
        itemCode: formData.itemCode,
        category: formData.category,
        priceLKR: Number(formData.priceLKR) || 0,
        priceQAR: Number(formData.priceQAR) || 0,
        description: formData.description || '',
        image: primaryImage,
        images: allImages.length > 0 ? allImages : [primaryImage]
      };

      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), productData);
      } else {
        await addDoc(collection(db, 'products'), productData);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving product: ", error);
      alert("Failed to save product. Error: " + error.message);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.itemCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-2xl font-serif text-white tracking-widest uppercase">Products Management</h2>
        <button
          onClick={handleAdd}
          className="bg-[#d4af37] text-black px-4 py-2 rounded-lg font-medium tracking-wider flex items-center gap-2 hover:bg-white transition-colors"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      <div className="bg-[#16171d] border border-[#2e303a] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#2e303a] flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0f1014] border border-[#2e303a] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#1f2028] text-xs uppercase border-b border-[#2e303a]">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-300">Product Name</th>
                <th className="px-6 py-4 font-medium text-gray-300">Item Code</th>
                <th className="px-6 py-4 font-medium text-gray-300">Category</th>
                <th className="px-6 py-4 font-medium text-gray-300">Prices</th>
                <th className="px-6 py-4 font-medium text-gray-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-[#2e303a] hover:bg-[#1f2028]/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{product.name}</td>
                    <td className="px-6 py-4">{product.itemCode}</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-[#2e303a] rounded text-xs text-gray-300">{product.category}</span></td>
                    <td className="px-6 py-4">
                      <div>Rs. {Number(product.priceLKR).toLocaleString()}</div>
                      <div className="text-gray-500">QAR {Number(product.priceQAR).toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 flex justify-end space-x-3">
                      <button onClick={() => handleEdit(product)} className="text-gray-400 hover:text-[#d4af37] transition-colors"><Pencil size={18} /></button>
                      <button onClick={() => handleDelete(product.id)} className="text-gray-400 hover:text-red-400 transition-colors"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#16171d] border border-[#2e303a] rounded-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-[#2e303a]">
              <h3 className="text-xl font-medium text-white">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0f1014] border border-[#2e303a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Item Code</label>
                  <input
                    type="text"
                    value={formData.itemCode}
                    onChange={(e) => setFormData({ ...formData, itemCode: e.target.value })}
                    className="w-full bg-[#0f1014] border border-[#2e303a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#0f1014] border border-[#2e303a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#d4af37] appearance-none"
                  >
                    <option>Perfumes</option>
                    <option>Watches</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Price (LKR)</label>
                  <input
                    type="number"
                    value={formData.priceLKR}
                    onChange={(e) => setFormData({ ...formData, priceLKR: e.target.value })}
                    className="w-full bg-[#0f1014] border border-[#2e303a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Price (QAR)</label>
                  <input
                    type="number"
                    value={formData.priceQAR}
                    onChange={(e) => setFormData({ ...formData, priceQAR: e.target.value })}
                    className="w-full bg-[#0f1014] border border-[#2e303a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#0f1014] border border-[#2e303a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#d4af37] resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Product Images (Up to 4)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Image 1 URL (Primary)"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-[#0f1014] border border-[#2e303a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                  <input
                    type="text"
                    placeholder="Image 2 URL"
                    value={formData.image2}
                    onChange={(e) => setFormData({ ...formData, image2: e.target.value })}
                    className="w-full bg-[#0f1014] border border-[#2e303a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                  <input
                    type="text"
                    placeholder="Image 3 URL"
                    value={formData.image3}
                    onChange={(e) => setFormData({ ...formData, image3: e.target.value })}
                    className="w-full bg-[#0f1014] border border-[#2e303a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                  <input
                    type="text"
                    placeholder="Image 4 URL"
                    value={formData.image4}
                    onChange={(e) => setFormData({ ...formData, image4: e.target.value })}
                    className="w-full bg-[#0f1014] border border-[#2e303a] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[formData.image, formData.image2, formData.image3, formData.image4].map((img, idx) => (
                    img && img.startsWith('http') ? (
                      <div key={idx} className="flex flex-col items-center justify-center p-2 border-2 border-dashed border-[#2e303a] rounded-lg bg-[#0f1014]">
                        <img src={img} alt={`Preview ${idx+1}`} className="h-24 w-full object-cover mb-1 rounded" />
                        <span className="text-gray-500 text-[10px] uppercase tracking-wider">Preview {idx+1}</span>
                      </div>
                    ) : (
                      <div key={idx} className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#2e303a] rounded-lg bg-[#0f1014] text-gray-500 h-[126px]">
                        <ImageIcon size={24} className="mb-2 opacity-50" />
                        <span className="text-[10px] text-center">Image {idx+1}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#2e303a] flex justify-end gap-4 bg-[#1f2028]/50">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-lg text-white hover:bg-[#2e303a] transition-colors"
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-[#d4af37] text-black font-medium rounded-lg hover:bg-white transition-colors"
                onClick={handleSave}
              >
                {editingId ? 'Update Product' : 'Save Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
