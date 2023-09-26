import axios from "axios";

import { ref } from 'vue'

const getCartItems = () => {
    const cartItems = ref(null)
    const error = ref(null)

    const load = async () => {
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
              cartItems.value = res.data // cartItems.value = await data.json()
              console.log("that is " + cartItems.value.map(r => r.id))
            }
            catch (err) {
              console.log(err)
            }
          }
    return { cartItems, error, load }
}

export default getCartItems