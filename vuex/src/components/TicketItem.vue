<template>
<tr>
  <td>{{ props.product.product }}</td>
  <td>$ {{ props.product.price }}</td>
  <td>{{ props.product.quantity }} 
    <button class="more" @click="handleMore(props.product.product, props.product.quantity)">+</button>
    <button class="less" @click="handleLess(props.product.product, props.product.quantity)">-</button>
  </td>
  <td>$ {{ props.product.subtotal }}</td>
  <td><button @click="handleDelete(props.product.product)">Eliminar</button></td>
</tr>
</template>

<script setup>
import { defineProps } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  }
});

const handleMore = (product, quantity) => 
  store.commit("updateQuantityBuyed", { product, value: quantity + 1}); 

const handleLess = (product, quantity) => {
  if (quantity === 1) return;
  store.commit("updateQuantityBuyed", { product, value: quantity - 1 });
}

const handleDelete = (product) => store.commit("deleteProductBuyed", product);
</script>

<style scoped lang="scss">
.more,
.less {
  font-size: 1.5rem;
  margin: 5px;
  border-radius: 50px;
}
</style>