<template>
<h1>Ticket</h1>
<p v-if="products.length === 0">¡No haz seleccionado ningún producto!</p>
<div v-else class="products">
  <table>
    <thead>
      <th>Producto</th>
      <th>Precio</th>
      <th>Cantidad</th>
      <th>Subtotal</th>
      <th>Eliminar</th>
    </thead>
    <tbody>
      <TicketItem v-for="(product, index) in products" :key="index" :product="product" />
    </tbody>
  </table>
  <h1>TOTAL: $ {{ total }}</h1>
</div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import TicketItem from "./TicketItem.vue";
const store = useStore();
const products = store.state.buyed;

let total = computed(() => store.getters.totalBuyed);
</script>

<style scoped lang="scss">
.products {
  margin: 30px;
  table {
    background-color: pink;
    width: 100%;
    text-align: center;
  }
}
</style>