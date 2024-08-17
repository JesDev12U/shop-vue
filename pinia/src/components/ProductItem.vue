<template>
<div class="product">
  <h3>{{ props.product.name }}</h3>
  <p>$ {{ props.product.price }}</p>
  <p>$ {{ props.product.subtotal }}</p>
  <div class="product-quantity">
    <button @click="products.updateQuantity(
      { 
        name: props.product.name, 
        quantity: props.product.quantity + 1 
      })
    ">+</button>
    <p>{{ props.product.quantity }}</p>
    <button @click="products.updateQuantity(
      {
        name: props.product.name,
        quantity: props.product.quantity - 1
      }
    )">-</button>
  </div>
  <button @click="buyedProducts.buy(props.product)">Comprar</button>
</div>
</template>

<script setup>
import { defineProps } from "vue";
import useProducts from "@/stores/products";
import useBuyedProducts from "@/stores/buyedProducts";
const products = useProducts();
const buyedProducts = useBuyedProducts();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  }
});
</script>

<style scoped lang="scss">
.product {
  background-color: pink;
  padding: 10px;
  margin: 5px;
  min-width: 50px;
  max-width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: wrap column;
  font-size: 2rem;
  .product-quantity {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: wrap row;
    button {
      font-size: 1.5rem;
      border-radius: 50px;
      margin: 10px;
      cursor: pointer;
    }
  }
}
</style>