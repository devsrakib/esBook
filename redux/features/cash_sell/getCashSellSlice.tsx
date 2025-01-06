import { API_URL } from "@/constants/api_url";
import { getToken } from "@/utils/getToken";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCashSell = createAsyncThunk('cashSell/fetchCashSell', async () => {
    try {
        const token = await getToken()
        if (!token) throw new Error('Token not found')
        const response = await axios.get(`${API_URL}cash-sells/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response?.data
    } catch (err: any) { }
})

interface IInitialState {
    cashSells: {
        count: number,
        data: [],
        links: {
            next: null,
            previous: null
        }
    },
    loading: boolean,
    error: any
}

const initialState: IInitialState = {
    cashSells: {
        count: 0,
        data: [],
        links: {
            next: null,
            previous: null
        }
    },
    loading: false,
    error: null
}


const cashSellSlice = createSlice({
    name: 'cashSell',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCashSell.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchCashSell.fulfilled, (state, action) => {
            state.cashSells = action.payload;
            state.loading = false
        });
        builder.addCase(fetchCashSell.rejected, (state, action) => {
            state.error = action.payload;
        })
    }
})


export default cashSellSlice.reducer