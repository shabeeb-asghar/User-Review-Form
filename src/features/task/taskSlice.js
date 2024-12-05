import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { taskService } from './taskService';

// Initial state for tasks
const initialState = {
    tasks: [],
    isLoading: false,
    isError: false,
    message: "",
};

export const createTask = createAsyncThunk('task/create', async (taskData, thunkAPI) => {
    try {
        return await taskService.createTask(taskData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const getTasks = createAsyncThunk('task/getTasks', async (_, thunkAPI) => {
    try {
        return await taskService.getTasks();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTask.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks.push(action.payload);
                state.message = 'Task Created Successfully';
            })
            .addCase(getTasks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = action.payload;
            });
    }
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;