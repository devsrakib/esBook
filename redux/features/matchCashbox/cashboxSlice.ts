import { API_URL } from "@/constants/api_url";
import { getToken } from "@/utils/getToken";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCashBox = createAsyncThunk('cashbox/fetchCashBox', async (data, {rejectWithValue}) =>{
    try{
        const token = await getToken();
        if(!token) throw new Error('token not found')
        const response = await axios.get(`${API_URL}match-cash-boxes/`, {
    headers:{
        Authorization: `Bearer ${token}`
    }})
    console.log(response);
    
    return response.data;
    }
    catch(error:any){
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
}) 

interface IInitialState{
    cash_box: {
        count: number,
        data: [],
        links:{
            next: null,
            previous: null
        }
    },
loading: boolean,
error: any
}

const initialState:IInitialState ={
cash_box: {
    count: 0,
    data:[],
    links:{
        next: null,
        previous: null
    }
},
loading: false,
error: null
}

const cashboxSlice = createSlice({
    name: 'cashbox',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(fetchCashBox.pending, state =>{
            state.loading = true;
        });
        builder.addCase(fetchCashBox.fulfilled, (state, action) =>{
            state.cash_box = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchCashBox.rejected, (state, action) =>{
            state.error = action.payload,
            state.loading = false;
        })
    }
})


export default cashboxSlice.reducer