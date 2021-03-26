import { useState } from "react";

import { Container, Row, Col, Alert, Button } from "react-bootstrap";

import { AddForm } from "./components/form/AddForm";
import "./App.css";
import { TaskLists } from "./components/taskList/TaskLists";
import { NoToDoList } from "./components/taskList/NoToDoList";
import { DeleteButton } from "./components/button/DeleteButton";

const App = () => {
	const [taskLists, setTaskLists] = useState([]);
	const [notToDoLists, setNotToDoLists] = useState([]);

	const [itemToDelete, setItemToDelete] = useState([]);
	const [notToDoItemToDelete, setNotToDoItemToDelete] = useState([]);

	const [itemToDelt, setItemToDelt] = useState({
		todo: [],
		notToDo: [],
	});

	//total hours form to do list
	const totalToDoHr = taskLists.reduce((subTtl, item) => subTtl + +item.hr, 0);
	//total hours form not to do list
	const totalNotToDoHr = notToDoLists.reduce(
		(subTtl, item) => subTtl + +item.hr,
		0
	);
	const totalHrs = totalToDoHr + totalNotToDoHr;

	const handleOnAddTask = frmDt => {
		if (totalHrs + frmDt.hr > 168) {
			return alert(
				"Adding this task will exceed the total amount of hours per week!"
			);
		}

		setTaskLists([...taskLists, frmDt]);
	};

	const handleOnMarkAsNotToDo = index => {
		const item = taskLists[index];
		const newArg = taskLists.filter((item, i) => i !== index);

		setTaskLists(newArg);
		setNotToDoLists([...notToDoLists, item]);
	};

	const markAsToDo = index => {
		const item = notToDoLists[index];
		const newArg = notToDoLists.filter((item, i) => i !== index);

		setNotToDoLists(newArg);
		setTaskLists([...taskLists, item]);
	};

	///add and remove item for to do list
	const handleOnChange = e => {
		const { checked, value } = e.target;
		console.log(checked, value);

		if (checked) {
			setItemToDelt({
				...itemToDelt,
				todo: [...itemToDelt.todo, +value],
			});
			return setItemToDelete([...itemToDelete, +value]);
		}

		//remove form array
		const newlist = itemToDelete.filter(item => item != value);
		setItemToDelete(newlist);
	};

	console.log(itemToDelt);

	///add and remove item for not to do list
	const handleOnChangeNotToDo = e => {
		const { checked, value } = e.target;

		if (checked) {
			return setNotToDoItemToDelete([...notToDoItemToDelete, +value]);
		}

		//remove form array
		const newlist = notToDoItemToDelete.filter(item => item != value);
		setNotToDoItemToDelete(newlist);
	};

	const deleteFromTaskList = () => {
		const newArg = taskLists.filter((item, i) => !itemToDelete.includes(i));

		setTaskLists(newArg);
		setItemToDelete([]);
	};

	const deleteFromNoToDoTaskList = () => {
		const newArg = notToDoLists.filter(
			(item, i) => !notToDoItemToDelete.includes(i)
		);

		setNotToDoLists(newArg);
		setNotToDoItemToDelete([]);
	};

	//delete item when delete button is clicked
	const deleteItems = () => {
		if (
			window.confirm("Are  you sure you want to delete the selected items?")
		) {
			deleteFromTaskList();
			deleteFromNoToDoTaskList();
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
