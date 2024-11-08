import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching upcoming scoring data

export const postSong = createAsyncThunk("song/postSong", async (songData) => {
  const response = await axios.post("http://localhost:8080/addSong", songData);
  return response.data;
});
export const getAllSongByEp = createAsyncThunk(
  "song/getAllSongByEp",
  async (scoringEpID) => {
    const response = await axios.get(
      `http://localhost:8080/getSongByEP/${scoringEpID}`
    );
    return response.data; // Assuming the API response returns the data directly
  }
);
// Create a slice for scoring
const songSlice = createSlice({
  name: "song",
  initialState: {
    songRes: {},
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
      // Handle posting a scoring episode
      .addCase(postSong.pending, (state) => {
        state.loading = true; // Optionally manage loading state for post requests
        state.postError = null; // Reset post error state
      })
      .addCase(postSong.fulfilled, (state) => {
        state.loading = false;
        state.postSuccess = true; // Set post success to true
        // Optionally, you can reset form data or add the new scoring data to the state if needed
      })
      .addCase(postSong.rejected, (state, action) => {
        state.loading = false;
        state.postSuccess = false; // Reset post success on error
        state.postError = action.error.message; // Capture post errors
      })
      .addCase(getAllSongByEp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSongByEp.fulfilled, (state, action) => {
        state.loading = false;
        state.songRes = action.payload; // Store the fetched data
      })
      .addCase(getAllSongByEp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture any errors
      });
  },
});

// // Export the async thunk for use in components
// export { getUpcomingScoring };
export const { resetPostStatus } = songSlice.actions;
// Export the reducer to be used in the store
export default songSlice.reducer;
