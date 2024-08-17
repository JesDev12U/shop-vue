import { createStore } from "vuex";

export default createStore({
  state: {
    products: [
      {
        product: "Sandia",
        price: 15,
        quantity: 1,
        subtotal: 15,
      },
      {
        product: "Tomates",
        price: 20,
        quantity: 1,
        subtotal: 20,
      },
      {
        product: "Melón",
        price: 25,
        quantity: 1,
        subtotal: 25,
      },
      {
        product: "Papas",
        price: 10,
        quantity: 1,
        subtotal: 10,
      },
      {
        product: "Jitomates",
        price: 30,
        quantity: 1,
        subtotal: 30,
      },
    ],
    buyed: [],
  },
  getters: {
    totalBuyed(state) {
      let total = 0;
      state.buyed.forEach((el) => (total += el.subtotal));
      return total;
    },
  },
  mutations: {
    updateQuantity(state, product) {
      let index = state.products.findIndex(
        (el) => el.product === product.product
      );
      if (index === -1) return;
      let productSelected = state.products[index];
      productSelected.quantity = product.value;
      productSelected.subtotal =
        productSelected.quantity * productSelected.price;
    },
    buy(state, product) {
      let index = state.products.findIndex(
        (el) => el.product === product.product
      );
      if (index === -1) return;
      let productSelected = state.products[index];
      let productBuyed = state.buyed.find(
        (el) => el.product === productSelected.product
      );

      if (productBuyed) {
        productBuyed.quantity += product.quantity;
        productBuyed.subtotal = productBuyed.quantity * productBuyed.price;
      } else {
        const json = JSON.stringify(productSelected);
        state.buyed.push(JSON.parse(json));
      }
    },
    updateQuantityBuyed(state, product) {
      let index = state.buyed.findIndex((el) => el.product === product.product);
      if (index === -1) return;
      let productSelected = state.buyed[index];
      productSelected.quantity = product.value;
      productSelected.subtotal =
        productSelected.quantity * productSelected.price;
    },
    deleteProductBuyed(state, product) {
      let index = state.buyed.findIndex((el) => el.product === product);
      if (index === -1) return;
      state.buyed.splice(index, 1);
    },
  },
});
