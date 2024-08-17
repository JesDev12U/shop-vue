<template>
<!--Para entender el funcionamiento, empieza por ProductList-->
<div class="container">
  <!--Este componente recibe los productos a mandar al ticket definidos
  en ProductItem, para cumplir el recorrido
  Ver comentario de la linea 31 de ProductItem-->
  <ProductList @getProduct="handleProduct"/>
  <!--Cumpliendo el recorrido, le mandamos el producto a TicketList-->
  <TicketList :product="productSelected"/>
</div>
</template>

<script setup>
import ProductList from "./components/ProductList.vue";
import TicketList from "./components/TicketList.vue";
import { ref } from 'vue';

//Usamos esta variable para mandar el producto a TicketList
let productSelected = ref(null);
const handleProduct = (product) => productSelected.value = product;
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>