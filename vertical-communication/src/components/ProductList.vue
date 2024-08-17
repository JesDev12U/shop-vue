<template>
<div class="wrapper">
    <div class="container">
        <!--Recorremos cada uno de los productos y se los mandamos a ProductItem-->
        <!--Este se encargara de mostrar cada uno de los productos-->

        <!--Le mandamos el producto a ProductItem (hijo de este componente)-->
        <!--Recibimos el producto seleccionado para mostrar en el ticket
        (Ver comentario del evento handleProduct)-->
        <ProductItem v-for="(product, i) in products" :key="i" :product="product" @getProduct="handleProduct"/>
    </div>
</div>

</template>

<script setup>
import ProductItem from "./ProductItem.vue";
import { defineEmits } from 'vue';

const emits = defineEmits(['getProduct']);

//Se definen los productos a mostrar en la interfaz
const products = [
    {
        name: "Tomate",
        price: 10
    },
    {
        name: "Jitomate",
        price: 20
    },
    {
        name: "Sandía",
        price: 30
    },
    {
        name: "Manzana",
        price: 40
    },
    {
        name: "Lechuga",
        price: 50
    }
];

/*Al recibir el producto, este componente debe mandarle a App (Papa general)
el producto para asi mandarlo al componente TicketList
@ref Ver recorrido en el comentario de la linea 31 de ProductItem
*/
const handleProduct = (product) => emits('getProduct', product);
</script>

<style scoped>
.wrapper {
    background-color: #ffc3c3;
}

.container {
    display: flex;
    flex-wrap: wrap;
}
</style>