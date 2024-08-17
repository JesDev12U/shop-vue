import { defineStore } from "pinia";

export default defineStore("products", {
  state: () => {
    return {
      products: [
        {
          name: "Sandia",
          price: 20,
          quantity: 1,
          subtotal: 20,
        },
        {
          name: "Tomate",
          price: 10,
          quantity: 1,
          subtotal: 10,
        },
        {
          name: "Jitomate",
          price: 15,
          quantity: 1,
          subtotal: 15,
        },
        {
          name: "Uva",
          price: 40,
          quantity: 1,
          subtotal: 40,
        },
      ],
    };
  },
  actions: {
    updateQuantity(product) {
      if (product.quantity === 0) return;
      let index = this.$state.products.findIndex(
        (el) => el.name === product.name
      );
      if (index === -1) return;
      let productSelected = this.$state.products[index];
      productSelected.quantity = product.quantity;
      productSelected.subtotal =
        productSelected.price * productSelected.quantity;
    },
  },
});
