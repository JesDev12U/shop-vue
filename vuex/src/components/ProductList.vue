<template>
<h1>Lista de productos</h1>
<div class="products">
  <ProductItem v-for="(product, index) in products" :key="index" :product="product" />
</div>
</template>

<script setup>
import { useStore } from "vuex";
import ProductItem from "./ProductItem.vue";
const store = useStore();
const products = store.state.products;
</script>

<style scoped lang="scss">
.products {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: wrap row;
  padding: 20px;
}
</style>