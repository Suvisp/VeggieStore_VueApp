import { ref } from 'vue'

const addCartItem = (id) => {
    const cartItem = ref(null)
    const error = ref(null)

    const load = async () => {
        try {
            let data = await fetch('http://localhost:3000/cart/' + id, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "id": this.id,
                    "name": this.name,
                    "price": this.price,
                    "quantity": this.quantity + 1
                })
            })
            if (!data.ok) {
                throw Error('no items in cart')
            }
            cartItem.value = await data.json()
        }
        catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }
    return { cartItem, error, load }
}

export default addCartItem