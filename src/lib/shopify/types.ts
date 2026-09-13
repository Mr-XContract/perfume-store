export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  images: { nodes: ShopifyImage[] };
  variants: { nodes: ShopifyVariant[] };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
}

export interface ShopifyUserError {
  field: string[] | null;
  message: string;
}
