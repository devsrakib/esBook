// redux/slices/customerSlice.ts
import { API_URL } from "@/constants/api_url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CustomerResponse, CustomerState } from "@/types/customer";

// Async thunk to fetch customers
export const fetchCustomers = createAsyncThunk<CustomerResponse, void, { rejectValue: string }>(
  "customers/fetchCustomers",
  async (customerId, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (!token) throw new Error("Token not found");

      const response = await axios.get(customerId ?  `${API_URL}customers/${customerId}/` : `${API_URL}customers/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response?.data as CustomerResponse; // Cast response to CustomerResponse
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Initial state
const initialState:CustomerState = {
  customers: {
    count: 0,
    data: [],
    links: {
      next: null,
      previous: null,
    },
  },
  loading: false,
  error: null,
};

// Redux slice
const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
    clearCustomers(state) {
      state.customers = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        console.log("action :::::::::", action);
        
        state.loading = false;
        state.customers = action.payload; // TypeScript knows this is CustomerResponse
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { resetError, clearCustomers } = customerSlice.actions;
export default customerSlice.reducer;
