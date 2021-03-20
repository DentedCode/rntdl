import { useState, useEffect } from "react";

import { Container, Row, Col, Alert, Button } from "react-bootstrap";

import { AddForm } from "./components/form/AddForm";
import "./App.css";
import { TaskLists } from "./components/taskList/TaskLists";
import { NoToDoList } from "./components/taskList/NoToDoList";

const App = () => {
	//create new state

	// TODOS
	//[x] add form ui
	//[x] add form data to state
	//[]  render state data in list view
	//[]  handle on mark as nottodo and tod list
	//[] select items and delete
	//[] count total not to do hours

	const [taskLists, setTaskLists] = useState([]);
	const [notToDoLists, setNotToDoLists] = useState([]);
	const [totalHrs, setTotalHrs] = useState(0);

	const [itemToDelete, setItemToDelete] = useState([]);
	const [notToDoItemToDelete, setNotToDoItemToDelete] = useState([]);

	useEffect(() => {}, [itemToDelete]);

	const handleOnAddTask = frmDt => {
		if (totalHrs + frmDt.hr > 168) {
			return alert(
				"Adding this task will exceed the total amount of hours per week!"
			);
		}
		setTotalHrs(totalHrs + frmDt.hr);
		setTaskLists([...taskLists, frmDt]);
		// calculateTotalHours();
	};

	const handleOnMarkAsNotToDo = index => {
		const item = taskLists[index];
		console.log(item);
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
			return setItemToDelete([...itemToDelete, +value]);
		}

		//remove form array
		const newlist = itemToDelete.filter(item => item != value);
		setItemToDelete(newlist);
	};

	///add and remove item for not to do list
	const handleOnChangeNotToDo = e => {
		const { checked, value } = e.target;
		console.log(checked, value);

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
		//[2,5]
		if (
			window.confirm("Are  you sure you want to delete the selected items?")
		) {
			//total hours from newArg
			deleteFromTaskList();

			deleteFromNoToDoTaskList();

			// 	const newHrTtl = newArg.reduce((subTtl, item) => {
			// 		return subTtl + item.hr;
			// 	}, 0);

			// 	setTotalHrs(newHrTtl);
		}
	};

	console.log(taskLists);

	return (
		////
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
							handleOnMarkAsNotToDo={handleOnMarkAsNotToDo}
						/>
						<Alert variant="primary">
							Your total allocated time = {totalHrs} / 168 hours
						</Alert>
					</Col>
					<Col>
						<NoToDoList
							notToDoLists={notToDoLists}
							markAsToDo={markAsToDo}
							handleOnChangeNotToDo={handleOnChangeNotToDo}
						/>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col>
						<Button onClick={deleteItems}>Delete</Button>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default App;
