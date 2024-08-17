<template>
<div class="products">
  <ProductItem v-for="(product, index) in products.products" 
    :key="index" :product="product"/>
</div>
</template>

<script setup>
import useProducts from "../stores/products";
import ProductItem from "./ProductItem.vue";
const products = useProducts();
</script>

<style scoped lang="scss">
.products {
  margin: 10px;
  height: 100vh;
  border: thin solid #000;
  display: flex;
  justify-content: left;
  align-items: start;
  flex-flow: wrap row;
}
</style>