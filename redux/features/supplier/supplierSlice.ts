import { API_URL } from "@/constants/api_url";
import { SupplierResponse, SupplierState } from "@/types/supplier";
import { getToken } from "@/utils/getToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSupplier = createAsyncThunk(
    "supplier/fetchCustomers",
    async ({supplierId }:{ supplierId?: string; }, { rejectWithValue }) => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (!token) throw new Error("Token not found");
        
        const res = await axios.get(supplierId ? `${API_URL}suppliers/${supplierId}/` : `${API_URL}suppliers/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res?.data as SupplierResponse;
      } catch (error:any) {
        return rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );

const initialState: SupplierState = {
  suppliers: {
    count: 0,
    data: [],
    links: {
      next: null,
      previous: null,
    },
  },
    loading: false,
    error: null
   
   } 

 const supplierSlice = createSlice({
    name : 'supplier',
    initialState,
    reducers: {
        resetError(state) {
          state.error = null;
        },
        clearCustomers(state) {
          state.suppliers = null;
        },
      },
      extraReducers: (builder) => {
        builder
          .addCase(fetchSupplier.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchSupplier.fulfilled, (state, action) => {
            console.log("action :::::::::", action);
            
            state.loading = false;
            state.suppliers = action.payload; // TypeScript knows this is CustomerResponse
          })
          .addCase(fetchSupplier.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "An error occurred";
          });
      },
})


export default supplierSlice.reducer