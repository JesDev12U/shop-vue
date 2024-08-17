<template>
<tr>
  <td>{{ props.product.name }}</td>
  <td>$ {{ props.product.price }}</td>
  <td>
    {{ props.product.quantity }}
    <button class="more" 
      @click="buyedProducts.updateQuantity(
        { 
          name: props.product.name, 
          quantity: props.product.quantity + 1
        }
      )">+</button>
    <button class="less"
      @click="buyedProducts.updateQuantity(
        {
          name: props.product.name,
          quantity: props.product.quantity - 1
        }
      )">-</button>
  </td>
  <td>$ {{ props.product.subtotal }}</td>
  <td><button @click="buyedProducts.deleteProduct(props.product)">Eliminar</button></td>
</tr>
</template>

<script setup>
import { defineProps } from "vue";
import useBuyedProducts from "@/stores/buyedProducts";
const buyedProducts = useBuyedProducts();
const props = defineProps({
  product: {
    type: Object,
    required: true,
  }
})
</script>

<style scoped lang="scss">
tr {
  width: 100%;
  margin: 50px;
}

.more, .less {
  font-size: 1.5rem;
  border-radius: 50px;
  margin: 5px;
  cursor: pointer;
}
</style>