<template>
<div class="product">
  <h2>{{ props.product.product }}</h2>
  <p>$ {{ props.product.price }}</p>
  <p>$ {{ props.product.subtotal }}</p>
  <div class="product-quantity">
    <button @click="handleMore(props.product.product, props.product.quantity)">+</button>
    <p>{{ props.product.quantity }}</p>
    <button @click="handleLess(props.product.product, props.product.quantity)">-</button>
  </div>
  <button @click="handleBuy(props.product.product, props.product.quantity)">Comprar</button>
</div>
</template>

<script setup>
import { defineProps } from "vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps({
  product: {
    type: Object,
    required: true,
  }
});

const handleMore = (product, quantity) => {
  store.commit("updateQuantity",{ product, value: quantity + 1 });
}

const handleLess = (product, quantity) => {
  if (quantity === 1) return;
  store.commit("updateQuantity", { product, value: quantity -  1 });
}

const handleBuy = (product, quantity) => store.commit("buy", { product, quantity });
</script>

<style scoped lang="scss">
.product {
  background-color: #ffced6;
  max-width: 40%;
  min-width: 150px;
  padding: 5px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1.5rem;
  .product-quantity {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    button {
      font-size: 2rem;
      border-radius: 50px;
      height: 20%;
      margin: 10px;
      cursor: pointer;
    }
  }
}
</style>