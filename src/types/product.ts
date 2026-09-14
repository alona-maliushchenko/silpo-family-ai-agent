export type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity?: number;
  category?: string;
  unit?: string;
  available?: boolean;
};

export type ShoppingListItem = {
  id: string;
  product: Product;
  quantity: number;
};