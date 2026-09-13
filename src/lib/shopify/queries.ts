export const PRODUCT_BY_HANDLE_QUERY = `#graphql
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      images(first: 5) {
        nodes { url altText }
      }
      variants(first: 10) {
        nodes {
          id
          title
          availableForSale
          price { amount currencyCode }
        }
      }
    }
  }
`;

export const CART_CREATE_MUTATION = `#graphql
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { id checkoutUrl totalQuantity }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_ADD_MUTATION = `#graphql
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { id checkoutUrl totalQuantity }
      userErrors { field message }
    }
  }
`;

export const CART_QUERY = `#graphql
  query Cart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
    }
  }
`;
