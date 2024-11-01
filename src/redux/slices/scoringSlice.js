import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching upcoming scoring data
export const getUpcomingScoring = createAsyncThunk(
  "scoring/getUpcomingScoring",
  async () => {
    const response = await axios.get("http://localhost:8080/getLastScoringEp");
    return response.data; // Assuming the API response returns the data directly
  }
);
export const postScoringEp = createAsyncThunk(
  "scoring/postScoringEp",
  async (scoringEpData) => {
    const response = await axios.post(
      "http://localhost:8080/addScoringEp",
      scoringEpData
    );
    return response.data;
  }
);
export const getScoringResultLastEpisode = createAsyncThunk(
  "scoring/getScoringResultLastEpisode",
  async () => {
    const response = await axios.get(
      "http://localhost:8080/getScoringResultLastEpisode"
    );
    return response.data; // Assuming the API response returns the data directly
  }
);
export const getAllScoringEp = createAsyncThunk(
  "scoring/getAllScoringEp",
  async () => {
    const response = await axios.get("http://localhost:8080/getScoringEp");
    return response.data; // Assuming the API response returns the data directly
  }
);

// Create a slice for scoring
const scoringSlice = createSlice({
  name: "scoring",
  initialState: {
    upcomingScoring: {},
    scoringResultLastEp: {},
    scoringEp: {},
    loading: false,
    error: null,
    postSuccess: false, // Add state to track the success of posting
    postError: null, // Add state to track any errors from posting
  },
  reducers: {
    resetPostStatus: (state) => {
      state.postSuccess = false; // Reset post success state
      state.postError = null; // Reset post error state
    },
  },
  extraReducers: (builder) => {
    builder
      //handle getUpcoming Scoring
      .addCase(getUpcomingScoring.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUpcomingScoring.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingScoring = action.payload; // Store the fetched data
      })
      .addCase(getUpcomingScoring.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture any errors
      })
      //handle getScoringResult Last Episode
      .addCase(getScoringResultLastEpisode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getScoringResultLastEpisode.fulfilled, (state, action) => {
        state.loading = false;
        state.scoringResultLastEp = action.payload; // Store the fetched data
      })
      .addCase(getScoringResultLastEpisode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture any errors
      })
      //handle getAllScoringEP
      .addCase(getAllScoringEp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllScoringEp.fulfilled, (state, action) => {
        state.loading = false;
        state.scoringEp = action.payload; // Store the fetched data
      })
      .addCase(getAllScoringEp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture any errors
      })
      // Handle posting a scoring episode
      .addCase(postScoringEp.pending, (state) => {
        state.loading = true; // Optionally manage loading state for post requests
        state.postError = null; // Reset post error state
      })
      .addCase(postScoringEp.fulfilled, (state) => {
        state.loading = false;
        state.postSuccess = true; // Set post success to true
        // Optionally, you can reset form data or add the new scoring data to the state if needed
      })
      .addCase(postScoringEp.rejected, (state, action) => {
        state.loading = false;
        state.postSuccess = false; // Reset post success on error
        state.postError = action.error.message; // Capture post errors
      });
  },
});

// // Export the async thunk for use in components
// export { getUpcomingScoring };
export const { resetPostStatus } = scoringSlice.actions;
// Export the reducer to be used in the store
export default scoringSlice.reducer;
