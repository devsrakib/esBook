import { API_URL } from '@/constants/api_url';
import { IProduct } from '@/types/product/product';
import { getToken } from '@/utils/getToken';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for POST request
export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (postData, { rejectWithValue }) => {
    try {
      const token = await getToken();
      if (!token) return;
      const response = await axios.post(`${API_URL}product/`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      return response?.data; // Successful response
    } catch (error: any) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

interface IInitialState {
  posts: IProduct[];
  loading: boolean;
  error: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: IInitialState = {
  posts: [],
  loading: false,
  error: null,
  status: 'idle', // Default status is idle
};

const createProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.status = 'loading'; // Set status to loading
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded'; // Set status to succeeded
        state.posts.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed'; // Set status to failed
        state.error = action.payload;
      });
  },
});

export default createProductSlice.reducer;
