import { API_URL } from "@/constants/api_url";
import { getToken } from "@/utils/getToken";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postDeposit = createAsyncThunk('deposit', async(data, {rejectWithValue}) =>{
    try{
        const token = await getToken();
        if(!token) throw new Error('Token not found!')
        const response = await axios.post(`${API_URL}deposits/`, data, {
            headers:{
    Authorization: `Bearer ${token}`
            }
        })
        return response?.data
    }catch(error:any){
        return rejectWithValue(error?.message ? error?.message : error?.data?.message);
    }
})

interface IInitialState{
    deposit:null,
            loading: false,
            error: null | any
}


const initialState: IInitialState = {
    deposit: null,
    loading: false,
    error: null
}

const depositSlice = createSlice({
    name: 'deposit',
    initialState,
    reducers:{

    },
    extraReducers:(builder) =>{
        builder.addCase(postDeposit.pending, state =>{
            state.loading = false;
        });
        builder.addCase(postDeposit.fulfilled, (state, action) =>{
            state.deposit = action.payload;
            state.loading = false;
        });
        builder.addCase(postDeposit.rejected, (state, action) =>{
            state.error = action.payload,
            state.deposit = null
        })
    }
})


export default depositSlice.reducer