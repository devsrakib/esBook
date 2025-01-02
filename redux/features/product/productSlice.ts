import { API_URL } from "@/constants/api_url";
import { ProductState } from "@/types/product/product";
import { getToken } from "@/utils/getToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the asyncThunk
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (categoryId?: string, { rejectWithValue }) => {
    try {
      const token = await getToken()
      const endpoint = categoryId
        ? `${API_URL}product/?category=${categoryId}`
        : `${API_URL}product/`;
      const response = await axios.get(endpoint,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      return response.data; // Return the data
    } catch (error: any) {
      // Handle errors
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


const initialState:ProductState  = {
  products: {
    count: 0,
    data: [],
    links: {
      next: null,
      previous: null,
    },
  },
  loading: false,
  error: null,
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
