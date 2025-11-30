import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check, Loader2 } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!selectedSize) {
      setHasError(true);
      setTimeout(() => setHasError(false), 500);
      return;
    }

    if (isAdding || isAdded) return;

    setIsAdding(true);

    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      
      onAddToCart(product, selectedSize); 

      setTimeout(() => {
        setIsAdded(false);
        setSelectedSize(null);
      }, 2000);
    }, 1200);
  };

  return (
    <div 
      className="group relative w-full max-w-[380px] mx-auto bg-transparent cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md bg-gray-200 shadow-sm transition-shadow duration-300 group-hover:shadow-md">
        
        {product.isNew && (
          <div className="absolute top-3 left-3 z-20">
             <span className="bg-white/90 backdrop-blur-sm text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest border border-black/5">
              New Drop
            </span>
          </div>
        )}

        <motion.img
          initial={false}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          src={product.images.front}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <motion.img
          initial={false}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          src={product.images.back}
          alt={`${product.name} back`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute bottom-4 left-4 right-4 z-30"
            >
              <button 
                onClick={handleAddToCart}
                className={`
                  w-full h-12 text-sm font-bold uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-all duration-300 rounded-sm
                  ${isAdded 
                    ? 'bg-green-600 text-white border border-green-600' 
                    : 'bg-white text-black border border-white hover:bg-black hover:text-white hover:border-black'
                  }
                `}
              >
                {isAdding ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Processing</span>
                  </>
                ) : isAdded ? (
                  <>
                    <Check size={16} />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>Quick Add</span>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-bold text-black uppercase tracking-tight leading-tight group-hover:underline decoration-1 underline-offset-4">
            {product.name}
          </h3>
          <span className="text-sm font-semibold text-gray-900 ml-4">
            {formatter.format(product.price)}
          </span>
        </div>
        
        <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
          {product.category} Collection
        </p>

        <motion.div 
          className="flex flex-wrap gap-2 pt-1"
          animate={hasError ? { x: [-5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSize(size);
                setHasError(false);
              }}
              className={`
                w-8 h-8 flex items-center justify-center text-[10px] font-bold transition-all border rounded-sm
                ${selectedSize === size 
                  ? 'bg-black text-white border-black' 
                  : hasError 
                    ? 'border-red-500 text-red-500 bg-red-50' 
                    : 'bg-transparent text-gray-400 border-gray-200 hover:border-gray-400 hover:text-black'
                }
              `}
            >
              {size}
            </button>
          ))}
        </motion.div>
        {hasError && (
          <p className="text-[10px] text-red-500 font-medium animate-pulse">Select a size first</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;