
import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Oversized Heavy Tee',
    price: 45.00,
    category: 'T-Shirts',
    images: {
      front: 'https://i.postimg.cc/y8M5GNgX/white-tee-front.avif', 
      back: 'https://i.postimg.cc/C1mcwM1W/white-tee-back.avif'  
    },
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
  },
  {
    id: '2',
    name: 'Technical Cargo Pant',
    price: 120.00,
    category: 'Bottoms',
    images: {
      front: 'https://i.postimg.cc/PfPKnjWr/cargo-front.jpg', 
      back: 'https://i.postimg.cc/bJXYY8Z7/cargo-back.png'   
    },
    sizes: ['30', '32', '34', '36'],
  },
  {
    id: '3',
    name: 'Essential Hoodie',
    price: 85.00,
    category: 'Hoodies',
    images: {
      front: 'https://i.postimg.cc/0NSnKdNc/hoodie-front.jpg', 
      back: 'https://i.postimg.cc/d0WC1h2Z/hoodie-back.png'  
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  }
];
