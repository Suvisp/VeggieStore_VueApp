import { ref } from 'vue'

const getProducts = () => {
    const products = ref(null)
    const error = ref(null)

    const load = async () => {
        try {
            let data = await fetch('http://localhost:3000/products')
            if (!data.ok) {
                throw Error('no data available')
            }
            products.value = await data.json()
        }
        catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }

    return { products, error, load }
}

export default getProducts