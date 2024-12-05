import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { teamService } from './teamService';

// Initial state for teams
const initialState = {
    teams: [],
    isLoading: false,
    isError: false,
    message: "",
};

export const createTeam = createAsyncThunk('team/create', async (teamData, thunkAPI) => {
    try {
        return await teamService.createTeam(teamData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const getTeams = createAsyncThunk('team/getTeams', async (_, thunkAPI) => {
    try {
        return await teamService.getTeams();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

const teamSlice = createSlice({
    name: 'team',
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
            .addCase(createTeam.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTeam.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createTeam.fulfilled, (state, action) => {
                state.isLoading = false;
                state.teams.push(action.payload);
                state.message = 'Team Created Successfully';
            })
            .addCase(getTeams.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTeams.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTeams.fulfilled, (state, action) => {
                state.isLoading = false;
                state.teams = action.payload;
            });
    }
});

export const { reset } = teamSlice.actions;
export default teamSlice.reducer;
