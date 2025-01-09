import { API_URL } from "@/constants/api_url";
import { getToken } from "@/utils/getToken";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDeposit = createAsyncThunk('deposit', async(_, {rejectWithValue}) =>{
    try{
        const token = await getToken();
        if(!token) throw new Error('Token not found!')
        const response = await axios.get(`${API_URL}deposits/`, {
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
    deposit:{
        count: number,
        data: [],
        links: {
            next: null,
            previous: null | string,
        },
    },
            loading: false,
            error: null | any
}


const initialState: IInitialState = {
    deposit: {
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

const depositSlice = createSlice({
    name: 'deposit',
    initialState,
    reducers:{

    },
    extraReducers:(builder) =>{
        builder.addCase(fetchDeposit.pending, state =>{
            state.loading = false;
        });
        builder.addCase(fetchDeposit.fulfilled, (state, action) =>{
            state.deposit = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchDeposit.rejected, (state, action) =>{
            state.error = action.payload;
        })
    }
})


export default depositSlice.reducer