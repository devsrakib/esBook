import { API_URL } from "@/constants/api_url";
import { SupplierState } from "@/types/supplier";
import { getToken } from "@/utils/getToken";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSupplier = createAsyncThunk('supplier/fetchSupplier', async() =>{
    try{
        const token = await getToken();
        if(!token) throw new Error('token not found')
        const res = await axios.get(`${API_URL}suppliers/`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
       return res.data
    }catch(error){

    }
} )

const initialState: SupplierState = {
    supplier: [],
    loading: false,
    error: null
   
   } 


export const supplierSlice = createSlice({
    name : 'supplier',
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
builder.addCase(fetchSupplier.pending, (state) =>{
    state.loading = true
}),
builder.addCase(fetchSupplier.fulfilled, (state, action) =>{
    state.supplier = action.payload,
    state.loading = false,
    state.error = null
}),
builder.addCase(fetchSupplier.rejected, (state, action) =>{
    state.error = action.payload,
    state.loading = false,
    state.supplier = []
})
    }
})