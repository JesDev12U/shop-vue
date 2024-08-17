<template>
<div class="container">
  <div class="products">
    <ProductList />
  </div>
  <div class="ticket">
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

.products,
.ticket {
  border: thin solid #000;
  height: 100vh;
  padding: 20px;
}
</style>