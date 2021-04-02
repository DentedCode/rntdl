import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isPending: false,
	status: "",
	message: "",
};

const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		requestPending: state => {
			state.isPending = true;
		},
		addTaskSuccess: (state, action) => {
			state.isPending = false;
			state.status = action.payload.status;
			state.message = action.payload.message;
		},
		requestFail: state => {
			state.isPending = false;
		},
	},
});

const { reducer, actions } = taskSlice;

export const { requestPending, addTaskSuccess, requestFail } = actions;

export default reducer;
