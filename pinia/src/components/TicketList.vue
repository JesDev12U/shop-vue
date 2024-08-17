<template>
<p v-if="buyedProducts.buyed.length === 0">¡No tienes ningún producto seleccionado!</p>
<table v-else>
  <thead>
    <th>Producto</th>
    <th>Precio</th>
    <th>Cantidad</th>
    <th>Subtotal</th>
    <th>Eliminar</th>
  </thead>
  <tbody>
    <TicketItem v-for="(product, index) in buyedProducts.buyed" 
      :key="index" :product="product" />
  </tbody>
</table>
<h1>TOTAL: ${{ buyedProducts.totalBuyed }}</h1>
</template>

<script setup>
import useBuyedProducts from "@/stores/buyedProducts";
import TicketItem from "./TicketItem.vue";
const buyedProducts = useBuyedProducts();
</script>

<style scoped lang="scss">
table {
  width: 100%;
  font-size: 1.5rem;
  text-align: center;
  background-color: pink;
}
</style>