import { ref } from 'vue'

const getProduct = (id) => {
    const product = ref(null)
    const error = ref(null)

    const load = async () => {
        try {
            let data = await fetch('http://localhost:3000/products/' + id)
            if (!data.ok) {
                throw Error('that product does not exist')
            }
            product.value = await data.json()
        }
        catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }

    return { product, error, load }
}

export default getProduct