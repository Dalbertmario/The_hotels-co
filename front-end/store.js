import { configureStore } from "@reduxjs/toolkit";
import Uireducer from "./src/ui/uiStore";
const store = configureStore({
  reducer: {
    uistore: Uireducer,
  },
});

export default store;
