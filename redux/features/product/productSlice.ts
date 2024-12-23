// import { API_URL } from "@/constants/api_url";
// import { getToken } from "@/utils/getToken";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchProducts = createAsyncThunk('product/fetchProducts', async (_, { rejectWithValue }) => {
//     try {
//         const token = await AsyncStorage.getItem('access_token');
//         if (!token) throw new Error('Token not found');

//         const res = await axios.get(`${API_URL}product/`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         });

//         return res?.data;
//     } catch (error:any) {
//         // Use rejectWithValue to pass the error to the rejected action
//         return rejectWithValue(error.response?.data || error.message || 'Something went wrong');
//     }
// });



// const initialState={
//     product: [],
//     loading: false,
//     error: null
// }


// const productSlice = createSlice({
//     name: 'product',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchProducts.pending, (state) => {
//                 state.loading = true;
//                 state.error = null; // Clear previous errors
//             })
//             .addCase(fetchProducts.fulfilled, (state, action) => {
//                 state.product = action.payload;
//                 state.loading = false;
//             })
//             .addCase(fetchProducts.rejected, (state, action) => {
//                 state.product = [];
//                 state.loading = false;
//                 state.error = action.payload || 'Failed to fetch products';
//             });
//     },
// });


// export default productSlice.reducer


import { API_URL } from "@/constants/api_url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Updated fetchProducts thunk to handle both cases: with and without an ID
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (id = null, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) throw new Error('Token not found');

      // If id is provided, fetch the specific product by ID
      const url = id ? `${API_URL}product/${id}/` : `${API_URL}product/`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return res?.data;
    } catch (error) {
      // Use rejectWithValue to pass the error to the rejected action
      return rejectWithValue(error.response?.data || error.message || 'Something went wrong');
    }
  }
);

const initialState = {
  products: [], // Array for all products
  singleProduct: null, // Single product when id is provided
  loading: false,
  error: null,
};

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
        // If id is provided, store single product
        if (action.meta.arg) {
          state.singleProduct = action.payload;
          state.products = []; // Clear products array if single product is fetched
        } else {
          // If no id, store all products
          state.products = action.payload;
          state.singleProduct = null; // Clear single product if fetching all
        }
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.products = [];
        state.singleProduct = null;
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
      });
  },
});

export default productSlice.reducer;
