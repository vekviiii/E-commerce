import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { fetchProducts } from '../../api/products'

const initialState = {
    products: [],
    loading: true,
    error: null
}

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    const products = await fetchProducts()
    return products
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false;
        })
        builder.addCase(getProducts.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
    }
})

export default productSlice.reducer