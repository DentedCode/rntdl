import { useState, useEffect } from "react";

import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";

import { AddForm } from "./components/form/AddForm";
import "./App.css";
import { TaskLists } from "./components/taskList/TaskLists";
import { NoToDoList } from "./components/taskList/NoToDoList";
import { DeleteButton } from "./components/button/DeleteButton";
import {
	createTask,
	getTaskLists,
	deleteTaskLists,
	switchTask,
} from "./api/taskApi.js";

const App = () => {
	const [taskLists, setTaskLists] = useState([]);
	const [notToDoLists, setNotToDoLists] = useState([]);

	//the index of the item that to be deleted from the list
	const [itemToDelete, setItemToDelete] = useState([]);
	const [notToDoItemToDelete, setNotToDoItemToDelete] = useState([]);

	const [itemToDelt, setItemToDelt] = useState({
		todo: [],
		notToDo: [],
	});

	const [response, setResponse] = useState({
		status: "",
		message: "",
	});

	const [isPending, setIsPending] = useState(false);

	useEffect(() => {
		const initialTask = async () => {
			const fetchTasks = await getTaskLists();
			if (fetchTasks?.length) {
				const todo = fetchTasks.filter(row => row.todo);
				const nottodo = fetchTasks.filter(row => !row.todo);
				console.log(">>>from effect");
				setTaskLists(todo);
				setNotToDoLists(nottodo);
			}
		};
		initialTask();
	}, [response]);

	//total hours form to do list
	const totalToDoHr = taskLists.reduce((subTtl, item) => subTtl + +item.hr, 0);
	//total hours form not to do list
	const totalNotToDoHr = notToDoLists.reduce(
		(subTtl, item) => subTtl + +item.hr,
		0
	);
	const totalHrs = totalToDoHr + totalNotToDoHr;

	const getAllTask = async () => {
		const fetchTasks = (await getTaskLists()) || [];

		const todo = fetchTasks.filter(row => row.todo);
		const nottodo = fetchTasks.filter(row => !row.todo);

		console.log(todo, nottodo);
		setTaskLists(todo);
		setNotToDoLists(nottodo);
	};

	const handleOnAddTask = async frmDt => {
		if (totalHrs + frmDt.hr > 168) {
			return alert(
				"Adding this task will exceed the total amount of hours per week!"
			);
		}

		//replace this link of code with something that send your data to the server
		//setTaskLists([...taskLists, frmDt]);

		setIsPending(true);
		const res = await createTask(frmDt);
		setResponse(res);
		setIsPending(false);

		res.status === "success" && getAllTask();
	};

	const updateTask = async toUpdate => {
		setIsPending(true);
		const result = await switchTask(toUpdate);

		console.log("form update task", result);
		setResponse(result);
		setIsPending(false);

		getAllTask();
	};

	const handleOnMarkAsNotToDo = _id => {
		const toUpdate = {
			_id,
			todo: false,
		};
		updateTask(toUpdate);
	};

	const markAsToDo = _id => {
		const toUpdate = {
			_id,
			todo: true,
		};

		updateTask(toUpdate);
	};

	///add and remove item for to do list
	const handleOnChange = e => {
		const { checked, value } = e.target;

		if (checked) {
			setItemToDelt({
				...itemToDelt,
				todo: [...itemToDelt.todo, value],
			});
			return setItemToDelete([...itemToDelete, value]);
		}

		//remove form array
		const newlist = itemToDelete.filter(item => item != value);
		setItemToDelete(newlist);
	};

	///add and remove item for not to do list
	const handleOnChangeNotToDo = e => {
		const { checked, value } = e.target;

		if (checked) {
			return setNotToDoItemToDelete([...notToDoItemToDelete, value]);
		}

		//remove form array
		const newlist = notToDoItemToDelete.filter(item => item != value);
		setNotToDoItemToDelete(newlist);
	};

	//delete item when delete button is clicked
	const deleteItems = async () => {
		if (
			window.confirm("Are  you sure you want to delete the selected items?")
		) {
			const deleteArg = itemToDelete.concat(notToDoItemToDelete);
			const result = await deleteTaskLists(deleteArg);

			setResponse(result);
			getAllTask();
		}
	};

	return (
		<div className="main">
			<Container>
				<Row>
					<Col>
						<div className="text-center mt-5">
							<h1>Not To Do List</h1>
						</div>
					</Col>
				</Row>
				<hr />

				<div>
					{response.message && (
						<Alert
							variant={response.status === "success" ? "success" : "danger"}
						>
							{response.message}
						</Alert>
					)}

					{isPending && <Spinner variant="primary" animation="border" />}
				</div>

				<AddForm handleOnAddTask={handleOnAddTask} />
				<hr />
				{/* list items */}
				<Row>
					<Col>
						<TaskLists
							handleOnChange={handleOnChange}
							taskLists={taskLists}
							itemToDelete={itemToDelete}
							handleOnMarkAsNotToDo={handleOnMarkAsNotToDo}
						/>
					</Col>
					<Col>
						<NoToDoList
							notToDoLists={notToDoLists}
							markAsToDo={markAsToDo}
							handleOnChangeNotToDo={handleOnChangeNotToDo}
							totalSavedTime={totalNotToDoHr}
							notToDoItemToDelete={notToDoItemToDelete}
						/>
					</Col>
				</Row>
				<Alert variant="primary">
					Your total allocated time = {totalHrs} / 168 hours
				</Alert>
				<hr />
				<DeleteButton deleteItems={deleteItems} />
			</Container>
		</div>
	);
};

export default App;
