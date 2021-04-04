import {
	requestPending,
	addTaskSuccess,
	fetchTaskSuccess,
	updateTaskSuccess,
	deleteTaskSuccess,
	requestFail,
} from "./taskSlice.js";

import {
	createTask,
	getTaskLists,
	switchTask,
	deleteTaskLists,
} from "../../api/taskApi.js";

export const addTask = fromDt => async dispatch => {
	try {
		dispatch(requestPending());

		const result = await createTask(fromDt);

		//call the api to send the data
		dispatch(addTaskSuccess(result));

		result.status === "success" && dispatch(fetchTaskLists());
	} catch (error) {
		dispatch(requestFail(error.message));
	}
};

export const fetchTaskLists = () => async dispatch => {
	try {
		dispatch(requestPending());

		const taskArg = (await getTaskLists()) || [];

		dispatch(fetchTaskSuccess(taskArg));
	} catch (error) {
		dispatch(requestFail(error.message));
	}
};

export const taskSwitch = toUpdate => async dispatch => {
	try {
		dispatch(requestPending());

		const result = await switchTask(toUpdate);
		dispatch(updateTaskSuccess(result));

		result.status === "success" && dispatch(fetchTaskLists());
	} catch (error) {
		dispatch(requestFail(error.message));
	}
};

export const deleteTasks = ids => async dispatch => {
	try {
		if (
			window.confirm("Are  you sure you want to delete the selected items?")
		) {
			dispatch(requestPending());

			const result = await deleteTaskLists(ids);

			dispatch(deleteTaskSuccess(result));

			result.status === "success" && dispatch(fetchTaskLists());
		}
	} catch (error) {
		dispatch(requestFail(error.message));
	}
};
