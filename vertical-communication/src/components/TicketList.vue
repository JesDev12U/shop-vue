<template>
<div class="container">
    <div class="wrapper">
        <h3>Ticket de compra</h3>
        <div class="summary" v-if="products.length !== 0">
            <table>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Eliminar</th>
            </tr>
            <!--Imprimimos cada uno de los productos a comprar-->
            <!--La key no la definimos con el indice porque puede
            generar problemas para eliminar el producto (Si tenemos
            dos productos 0 y 1, si eliminamos el producto 0, el 1
            pasa a ser el 0, pero ese nuevo producto 0 va a tener
            las propiedades del elemento que estaba anteriormente en 0
            por ello no ocupamos el index, sino el nombre para asi no
            tener problemas <<Para no tener productos repetidos, ver
            el comentario 66 de este componente>>)-->
            <!--Le mandamos el producto a TicketItem por productItem-->
            <!--Se recibe la peticion de TicketItem de eliminar un producto
            mediante delProduct-->
            <!--getSubtotal es una peticion de este componente hacia TicketItem
            para que este componente pueda calcular el subtotal general-->
            <TicketItem v-for="product in products" 
            :key="product.product.name" :productItem="product" @delProduct="delProduct" @getSubtotal="getSubtotal" />
            </table>
            <div class="subtotal">
                <h2>Subtotal -> $ {{ calculateSubtotal }}</h2>
                <h2>IVA {{ IVA }}% -> $ {{ calculateSubtotal * (IVA / 100) }}</h2>
                <h2>TOTAL -> $ {{ calculateSubtotal + (calculateSubtotal * (IVA / 100)) }}</h2>
            </div>
        </div>
        <p v-else>No haz agregado ningun producto</p>
    </div>
    
</div>
</template>

<script setup>
import { computed, defineProps, ref, watch } from 'vue';
import TicketItem from './TicketItem.vue';

const IVA = ref(16);

//Recibimos el producto que nos mando App
//Ver comentario de la linea 31 de ProductItem
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

//Definimos este arreglo para almacenar los productos que estan en
//el ticket. Este arreglo nos ayuda para mostrar con ayuda de
//TicketItem los productos que selecciono el usuario
let products = ref([]);
//Aqui tambien mantenemos los productos del ticket, pero solo estamos
//almacenando el nombre del producto y la cantidad a comprar
//Esto para poder calcular el subtotal
let detailsProducts = ref([]);

//Como el dato que nos trajo ProductItem puede cambiar, es decir,
//cuando el usuario vaya comprando mas productos, tenemos que estar
//constantemente actualizando la lista de productos
watch(
    () => props.product, //Vigilamos el dato que esta cambiando (Aqui se recibe el producto a comprar)
    (newProduct) => {
        if(newProduct) {
            let exists = false; //Verificamos que el producto no exista en el array products
            for(let i = 0; i < products.value.length; i++) {
                if(products.value[i].product === newProduct.product) {
                    exists = true;
                    break; //Si existe, ya no hace falta recorrer lo demas
                }
            }
            //Si no existe, lo agregamos
            if(!exists) products.value.push(newProduct);
        }
    },
    {indeterminate: true} //Es un dato cambiante, por lo tanto, tenemos que vigilarlo de forma indefinida
);

//Este metodo maneja la peticion de TicketItem de eliminar un producto de la lista
const delProduct = (index, name) => {
    products.value.splice(index, 1) //Eliminamos el producto de la lista de products
    let indexProduct = -1;
    //Buscamos el elemento a eliminar por su index para eliminarlo de detailsProducts
    for(let i = 0; i < detailsProducts.value.length; i++) {
        //Comparamos el nombre del producto que se quiere eliminar
        //con el que esta guardado en detailsProducts
        if(detailsProducts.value[i].product === name) {
            indexProduct = i;
            break;
        }
    }
    //Si existe dicho elemento, lo elimina por el index buscado en el for
    if(indexProduct !== -1) detailsProducts.value.splice(indexProduct, 1);
};

//Controlamos el subtotal general aqui
//Como tal no calculamos el subtotal, pero si guardamos el subtotal
//de cada producto para que en un elemento computado hagamos una sumatoria
const getSubtotal = (subtotal, product) => {
    //Al crearse el componente TicketItem, este inmediatamente ejecuta un emit
    //hacia esta funcion, mandando los datos guardados al principio
    //Entonces los guardamos en el array detailsProducts
    detailsProducts.value.push({subtotal: subtotal.value, product});
    //Como el subtotal puede ir cambiando (puede cambiar debido al input type number
    //que esta en TicketItem), tenemos que ir vigilando si el subtotal mandado cambia
    watch(
        () => subtotal.value, //Vigilamos el subtotal
        (newSubtotal) => {
            //Si hay un subtotal nuevo, tenemos que reemplazarlo en nuestro
            //array detailsProducts
            //Para ello buscaremos el producto por su nombre
            for(let i = 0; i < detailsProducts.value.length; i++) {
                if(detailsProducts.value[i].product === product) {
                    detailsProducts.value[i].subtotal = newSubtotal;
                    break; //Si lo encuentra, no hace falta seguir el recorrido, no hay
                    //duplicados (ver la linea 69 de este componente)
                }
            }
        },
        {indeterminate: true} //Como es un dato que desconocemos cuando va a cambiar
        //(Cambiara cuando lo decida el usuario), lo hacemos indefinido
    )
};

//Calculamos el subtotal en un dato computado, es computado porque puede cambiar el valor
//de cada subtotal de cada producto (Ver linea 114 de este componente)
const calculateSubtotal = computed(() => {
    let subtotal = 0;
    //En el array detailsProducts tenemos almacenados los subtotales
    //Entonces simplemente lo recorremos y vamos sumando cada uno de sus valores
    for(let i = 0; i < detailsProducts.value.length; i++) {
        subtotal += detailsProducts.value[i].subtotal;
    }
    return subtotal;
})

</script>

<style scoped>
.container {
    padding: 0 20px;
}

table {
    background-color: #eceff1;
    margin: 10px;
    width: 100%;
    padding: 10px;
}

</style>