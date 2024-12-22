import { API_URL } from "@/constants/api_url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createSlip = createAsyncThunk('slip/createSlip', async() =>{
    try{
        const token = await AsyncStorage.getItem('access_token')
    if(!token) throw new Error('Token not found');
    const res = await axios.post(`${API_URL}slips/`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        
    })
    return res?.data
    }
    catch{}
})

const initialState={
slip: [],
loading: false,
error: null
}


const slipSlice = createSlice({
    name: 'slip', 
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
builder.addCase(createSlip.pending, (state) =>{
    state.loading = true
});
builder.addCase(createSlip.fulfilled, (state, action) =>{
    state.slip = action.payload,
    state.loading = false,
    state.error = null
});
builder.addCase(createSlip.rejected, (state, action) =>{
    state.slip = [],
    state.loading = false,
    state.error = action.error.message
})
    }
})


export default slipSlice.reducer