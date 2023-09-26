<template>
    <div>
    <form>
      <div v-if="error"> {{ error }} </div>
      <div v-if="product">
        <p>Product name: {{ product.name }}</p>
        <p>Product price: {{ product.price }}</p>
        <button @click.prevent="addItem" class="btn btn-success">Add to Cart</button>
      </div>
      <div v-else>Loading...</div>
    </form>
    </div>
    </template>
    
    <script setup>
    import getProduct from '../composables/getProduct'
    import getCartItem from '../composables/getCartItem'
    import axios from "axios"
    import { ref, onMounted, watchEffect } from 'vue'
    
    const props = defineProps(['product', 'id'])
    
        const { product, error, load } = getProduct(props.id)
        console.log("getting one product id for product info " + props.id +
        " name " +product.name)
    
        const { cartItem } = getCartItem(props.id)
        console.log("getting cart item " + props.id)
    
        load()
    
        const cartItems = ref()
    
      onMounted(() => {
        getCartItems()
        console.log("mounted")})
    
      watchEffect(async () => {
        getCartItems()
        console.log("UPDATED") })
    
      async function getCartItems() {
          try {
            let res = await axios({
              url: 'http://localhost:3000/cart',
              method: 'get',
              timeout: 8000,
              headers: { 'Content-Type': 'application-json'}
            })
            if (res.status == 200) {
              console.log(res.status)
            }
            console.log(res.data)
            cartItems.value = res.data
            console.log("mapping cartItems ids ", cartItems.value.map(m => m.id))
          }
          catch (err) {
            console.log(err)
          }
        }
    
      async function addItem() {
          console.log("start adding ", cartItems.value.map(m => m.id))
         // if item already exist in cart, add more
         if (cartItems.value.map(m => m.id).includes(props.id)) {
            console.log("duplicate id exists, edit quantity")
            const itemIndex = cartItems.value.findIndex(item => item.id === props.id)
            cartItems.value[itemIndex].quantity++
            const updatedQuantity = cartItems.value[itemIndex].quantity
            try {
              const { cartItemEdited } = await axios.patch(
                'http://localhost:3000/cart/' + props.id, {
                  quantity: updatedQuantity,
                  sum: parseFloat(props.product.price * updatedQuantity)
              })
          console.log("edited item in cart")
        } catch (err) {
          console.log(err)
        }
        } else {
          // add new product to cart
          try {
            const { newCartItem } = await axios.post(
              'http://localhost:3000/cart', {
                id: props.id,
                name: props.product.name,
                price: props.product.price,
                quantity: 1,
                sum: (parseFloat(props.product.price)*1)
              })
          console.log("added new item to cart")
        } catch (err) {
          console.log(err)
        }
      }
    }
    </script>
    
    <style>
    .product-detail {
      color: rgb(0,135,0);
    }
    
    </style>