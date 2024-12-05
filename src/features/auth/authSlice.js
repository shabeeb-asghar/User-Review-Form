import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from './authService';

const localStorageKey = 'myUser';
const getUser = localStorage.getItem(localStorageKey)
    ? JSON.parse(localStorage.getItem(localStorageKey))
    : null;

const initialState = {
    user: getUser,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        return await authService.registerUser(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        return await authService.logUser(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const getUsers = createAsyncThunk('auth/get-users', async (_, thunkAPI) => {
    try {
        return await authService.getUsers();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = 'User Successfully Registered';
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = 'Welcome';
            })
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.allUsers = action.payload;
            });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;