<template>
    <div class="container">
      <h2>Your order</h2>
      <p>Check total amount and continue.</p>
    </div>
    <div class="form-group">
      <form>
        <div v-for="cartItem in cartItems" :key="cartItem.id" class="row">
          <h3 class="col">{{ cartItem.name }}</h3>
          <p class="col">EUR {{ cartItem.price }}</p>
          <p class="col">{{ cartItem.quantity }}</p>
          <p class="col">subtotal EUR {{ cartItem.sum.toFixed(2) }}</p>
        </div>
       <button @click.prevent="calculateSum" type="button" class="btn btn-success">Check total amount</button><br><br>
       <div>
          <p v-if="sum">Your order total is EUR {{ sum }}</p>
       </div>
      </form>
      <div v-if="sum">
      <button @click.prevent="placeOrder" type="button" class="btn btn-dark">Place an order</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import getCartItems from '../composables/getCartItems'
  import { ref } from 'vue'
  
    const { cartItems, error, load } = getCartItems()
    console.log("getting all items in cart ")
    load()
  
    const sum = ref('')
  
    function calculateSum() {
      try {
        let sums = cartItems.value.map(m => m.sum)
        console.log(" sums ", sums)
        sum.value = sums.reduce((accumulator, currentValue) => {
          return accumulator + currentValue
          }, 0)
          } catch (error) {
            console.error("An error occurred:", error)
            }
    }
  
    function placeOrder() {
      if (sum.value > 0.01) {
        console.log("Your order is submitted!")
        } else console.error("An error occurred:", error)
    }
  </script>
  
  <style>
  .row h3 {
    color: rgb(0,135,0);
  }
  </style>