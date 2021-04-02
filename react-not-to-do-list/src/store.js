import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./components/taskList/taskSlice.js";

const store = configureStore({
	reducer: {
		// list all of our store reducers
		task: taskReducer,
	},
});

export default store;
