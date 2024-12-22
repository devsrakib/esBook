import { API_URL } from "@/constants/api_url";
import { getToken } from "@/utils/getToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk('product/fetchProducts', async (_, { rejectWithValue }) => {
    try {
        const token = await AsyncStorage.getItem('access_token');
        if (!token) throw new Error('Token not found');

        const res = await axios.get(`${API_URL}product/`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return res?.data;
    } catch (error:any) {
        // Use rejectWithValue to pass the error to the rejected action
        return rejectWithValue(error.response?.data || error.message || 'Something went wrong');
    }
});



const initialState={
    product: [],
    loading: false,
    error: null
}


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear previous errors
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.product = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.product = [];
                state.loading = false;
                state.error = action.payload || 'Failed to fetch products';
            });
    },
});


export default productSlice.reducer