import { ref } from 'vue'

const getCartItem = (id) => {
    const cartItem = ref(null)
    const error = ref(null)

    const load = async () => {
        try {
            let data = await fetch('http://localhost:3000/cart/' + id)
            if (!data.ok) {
                throw Error('that cart item does not exist')
            }
            cartItem.value = await data.json()
            console.log(" cartItem ok ", cartItem.value)
        }
        catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }

    return { cartItem, error, load }
}

export default getCartItem