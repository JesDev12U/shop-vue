<template>
<tr>
    <td><p>{{ props.productItem.product.name }}</p></td>
    <td class="quantity"><input type="number" min="1" v-model="quantity"></td>
    <td class="subtotal"><p>$ {{ calculateSubtotal }}</p></td>
    <td><button @click="delProduct">Eliminar</button></td>
</tr>
</template>

<script setup>
import { computed, defineProps, defineEmits, ref } from 'vue';

//Recibimos el producto que selecciono el usuario por ProductItem
//Ver recorrido en el comentario de la linea 31 en ProductItem
const props = defineProps({
    productItem: {
        type: Object,
        required: true
    },
});

const emits = defineEmits(['delProduct', 'getSubtotal']);

//Aqui podemos tambien modificar la cantidad de productos a comprar
//Pero el valor inicial debe ser el que venga directamente de ProductItem
let quantity = ref(props.productItem.quantity);

//Calculamos el subtotal, este es computado ya que puede ir cambiando este
//(mediante la cantidad a comprar)
const calculateSubtotal = computed(() => props.productItem.product.price * quantity.value);

//En TicketList hay un array llamado detailsProducts que su funcion es llevar
//el control de cada producto con su respectivo subtotal, como este componente
//tiene esa informacion, se la debe de mandar a TicketList para que dicho
//array se mantenga actualizado y asi pueda calcular el subtotal de todos los 
//productos seleccionados
//Le mandamos el subtotal del producto y tambien su nombre ya que en el array
//de TicketList se guarda en un objecto el nombre del producto y su respectivo subtotal
//Este emit lo definimos aqui puesto que se ejecuta cuando recien se crea
//el componente
emits('getSubtotal', calculateSubtotal, props.productItem.product.name);

//Para eliminar el producto, debemos decirle a TicketList(El que lleva el control
//de todos los productos seleccionados) que producto debemos eliminar
//Como TicketList maneja un array de productos, debemos mandarle el indice para que 
//asi sepa que producto eliminar, tambien mandamos el nombre ya que el array
//detailsProducts lo ocupara para saber que subtotal debe eliminar de su array.
const delProduct = (index) => emits('delProduct', index, props.productItem.product.name);

</script>

<style scoped>
td {
    width: 30%;
    padding: 5px;
}

td input[type="number"] {
    width: 25%;
}

.quantity,
.subtotal {
    text-align: center;
}
</style>