import { configureStore } from "@reduxjs/toolkit";
import scoringReducer from "./slices/scoringSlice";
import songReducer from "./slices/songSlice";

const store = configureStore({
  reducer: {
    scoring: scoringReducer, // Add the scoring reducer
    song: songReducer, //song reducer
  },
});

export default store;
