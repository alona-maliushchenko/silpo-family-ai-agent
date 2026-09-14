export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    unit: string;
    image?: string;
    available?: boolean;
  }
  
  export interface ShoppingListItem {
    id: string;
    product: Product;
    quantity: number;
    checked?: boolean;
  }