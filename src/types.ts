export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  images: {
    front: string;
    back: string;
  };
  sizes: string[];
  isNew?: boolean;
}

export interface CartItem extends Product {
  cartId: number;
  selectedSize: string;
}