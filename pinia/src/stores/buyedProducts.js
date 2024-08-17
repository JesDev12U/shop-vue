import { defineStore } from "pinia";

export default defineStore("buyedProducts", {
  state: () => {
    return {
      buyed: [],
    };
  },
  getters: {
    totalBuyed() {
      let total = 0;
      this.$state.buyed.forEach((el) => (total += el.subtotal));
      return total;
    },
  },
  actions: {
    buy(product) {
      let productBuyed = this.$state.buyed.find(
        (el) => el.name === product.name
      );
      if (productBuyed) {
        productBuyed.quantity += product.quantity;
        productBuyed.subtotal = productBuyed.price * productBuyed.quantity;
      } else {
        const json = JSON.stringify(product);
        this.$state.buyed.push(JSON.parse(json));
      }
    },
    updateQuantity(product) {
      if (product.quantity === 0) return;
      let index = this.$state.buyed.findIndex((el) => el.name === product.name);
      if (index === -1) return;
      let productSelected = this.$state.buyed[index];
      productSelected.quantity = product.quantity;
      productSelected.subtotal =
        productSelected.price * productSelected.quantity;
    },
    deleteProduct(product) {
      let index = this.$state.buyed.findIndex((el) => el.name === product.name);
      if (index === -1) return;
      this.$state.buyed.splice(index, 1);
    },
  },
});
