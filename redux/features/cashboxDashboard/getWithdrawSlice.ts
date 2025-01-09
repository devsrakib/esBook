import { API_URL } from "@/constants/api_url";
import { getToken } from "@/utils/getToken";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWithdraw = createAsyncThunk(
  "withdraw",
  async (_, { rejectWithValue }) => {
    try {
      const token = await getToken();
      if (!token) throw new Error("Token not found!");
      const response = await axios.get(`${API_URL}withdraws/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.message ? error?.message : error?.data?.message
      );
    }
  }
);

interface IInitialState {
  withdraw: {
    count: number;
    data: [];
    links: {
      next: null;
      previous: null | string;
    };
  };
  loading: false;
  error: null | any;
}

const initialState: IInitialState = {
  withdraw: {
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

const withdrawSlice = createSlice({
  name: "withdraw",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWithdraw.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchWithdraw.fulfilled, (state, action) => {
      state.withdraw = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchWithdraw.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default withdrawSlice.reducer;
