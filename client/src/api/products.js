import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`/api/products`)
        return response.data
    } catch (error) {
        console.error(`error fetching data: ${error.message}`);
        throw error
    }
}