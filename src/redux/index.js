import { configureStore } from "@reduxjs/toolkit";
import scoringReducer from "./slices/scoringSlice";

const store = configureStore({
  reducer: {
    scoring: scoringReducer, // Add the scoring reducer
  },
});

export default store;
