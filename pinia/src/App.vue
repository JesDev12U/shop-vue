<template>
<div class="container">
  <div class="products">
    <h1>Lista de productos</h1>
    <ProductList />
  </div>
  <div class="ticket">
    <h1>Ticket</h1>
    <TicketList />
  </div>
</div>
</template>

<script setup>
import ProductList from "./components/ProductList.vue";
import TicketList from "./components/TicketList.vue";
</script>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50%, 50%));
}
</style>