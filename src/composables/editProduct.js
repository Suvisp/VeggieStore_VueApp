import { ref } from 'vue'

const editProduct = (id) => {
    const editedProduct = ref(null)
    const error = ref(null)

    const load = async () => {
        try {
            let data = await fetch('http://localhost:3000/product/' + id, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(editedProduct)
            })
            if (!data.ok) {
                throw Error('no items in cart')
            }
            editedProduct.value = await data.json()
        }
        catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }
    return { editedProduct, error, load }
}

export default editProduct