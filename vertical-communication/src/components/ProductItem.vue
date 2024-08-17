<template>
<div class="container">
    <!--Mostramos los datos del producto recibido por ProductList-->
    <h3>{{ props.product.name }}</h3>
    <p>$ {{ props.product.price }}</p>
    <!--Controlamos la cantidad a comprar con ayuda de la variable quantity-->
    <input type="number" min="1" v-model="quantity">
    <!--Al comprar, tenemos que mandar los productos al ticket 
    (Ver comentario del evento)-->
    <button @click="handleBuy(props.product)">Comprar</button>
</div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

//Se reciben los productos de ProductList para mostrarlos en la interfaz
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

//Se define la cantidad de elementos a comprar
//Esta variable esta relacionada con un input de tipo number
let quantity = ref(1);

const emits = defineEmits(['getProduct']);

/*Al darle click al boton de comprar, se debe de mostrar los productos comprados en
La interfaz del Ticket, pero, como ProductList (padre de este elemento)
es hermando de TicketList (componente que se encarga de mostrar los productos 
seleccionados), tenemos que hacer una comunicacion vertical ascendente, haciendo
el siguiente recorrido
ProductItem -> ProductList -> App -> TicketList -> TicketItem
*/

//Entonces, como este componente es hijo de ProductList, hacemos un emit y le mandamos
//el producto a mandar al ticket
//Le mandamos tanto el producto como la cantidad a comprar
const handleBuy = (product) => emits('getProduct', {product, quantity});
</script>

<style scoped>
.container {
    display: flex;
    flex-flow: column wrap;
    width: 20%;
    background-color: #e1e1e1;
    border-radius: 10px;
    margin: 10px;
    padding: 15px;
}

.container input{
    width: 20%;
}
</style>