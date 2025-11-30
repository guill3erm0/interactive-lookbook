import React, { useState } from 'react';
import { ShoppingBag, X, Trash2, ArrowRight, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './components/ProductCard';
import { MOCK_PRODUCTS } from './constants';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);

  const handleAddToCart = (product: Product, size: string) => {
    const newItem: CartItem = {
      ...product,
      selectedSize: size,
      cartId: Date.now() + Math.random(),
    };

    setCartItems((prevItems) => [...prevItems, newItem]);
  };

  const handleRemoveItem = (cartId: number) => {
    setCartItems((prevItems) => prevItems.filter(item => item.cartId !== cartId));
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsCheckoutSuccess(true);
      
     
      setTimeout(() => {
        setCartItems([]);
        setIsCheckoutSuccess(false);
        setIsCartOpen(false);
      }, 2000);
    }, 2000);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const cartCount = cartItems.length;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-black selection:text-white">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <h1 className="text-2xl font-black tracking-tighter uppercase italic">Brand</h1>
            </div>
            
            <div className="flex items-center">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="group relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingBag size={22} className="text-gray-900" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white ring-2 ring-white transition-transform group-hover:scale-110">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="mb-16 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">New Collection 2024</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black">
            Urban Essentials
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            Premium streetwear designed for the modern minimalists. 
            Engineered comfort meets contemporary silhouette.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 justify-items-center">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

      </main>

      <footer className="border-t border-gray-200 mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="text-xl font-black tracking-tighter uppercase italic">Brand</h2>
          <div className="text-gray-400 text-xs font-medium uppercase tracking-wider">
            © 2024 Brand Inc. All rights reserved.
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-50"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-black uppercase tracking-tight">Your Bag ({cartCount})</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-black"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                    <ShoppingBag size={48} strokeWidth={1} />
                    <p className="font-medium">Your cart is empty.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-black text-xs font-bold uppercase underline underline-offset-4"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      key={item.cartId} 
                      className="flex gap-5"
                    >
                      <div className="w-24 h-32 bg-gray-100 rounded-sm overflow-hidden shrink-0 border border-gray-100 relative group">
                        <img src={item.images.front} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide leading-tight">{item.name}</h3>
                            <span className="font-semibold text-sm">{formatter.format(item.price)}</span>
                          </div>
                          <p className="text-gray-500 text-xs font-medium uppercase">Size: {item.selectedSize}</p>
                        </div>
                        
                        <div className="flex justify-between items-end">
                          <div className="text-xs text-gray-400 font-medium">
                            QTY: 1
                          </div>
                          <button 
                            onClick={() => handleRemoveItem(item.cartId)}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-white">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Subtotal</span>
                      <span>{formatter.format(subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold text-black">
                      <span>Total</span>
                      <span>{formatter.format(subtotal)}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 text-center uppercase tracking-wide">
                      Shipping & taxes calculated at checkout
                    </p>
                  </div>
                  
                  <button 
                    onClick={handleCheckout}
                    disabled={isCheckingOut || isCheckoutSuccess}
                    className={`
                      w-full py-4 text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3
                      ${isCheckoutSuccess 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-black text-white hover:bg-gray-900 active:scale-[0.98]'
                      }
                      disabled:opacity-80 disabled:cursor-not-allowed disabled:active:scale-100
                    `}
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Processing Payment...</span>
                      </>
                    ) : isCheckoutSuccess ? (
                      <>
                        <Check size={18} />
                        <span>Order Placed</span>
                      </>
                    ) : (
                      <>
                        <span>Checkout Securely</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;