import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Alert, Spinner, Button } from "react-bootstrap";

import { AddForm } from "./components/form/AddForm";
import "./App.css";
import { TaskLists } from "./components/taskList/TaskLists";
import { NoToDoList } from "./components/taskList/NoToDoList";

import { fetchTaskLists, deleteTasks } from "./components/taskList/taskAction";

const App = () => {
	const dispatch = useDispatch();

	const { isPending, status, message, totalHrs, itemToDelete } = useSelector(
		state => state.task
	);

	useEffect(() => {
		dispatch(fetchTaskLists());
	}, []);

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
					{message && (
						<Alert variant={status === "success" ? "success" : "danger"}>
							{message}
						</Alert>
					)}

					{isPending && <Spinner variant="primary" animation="border" />}
				</div>

				<AddForm />
				<hr />
				{/* list items */}
				<Row>
					<Col>
						<TaskLists />
					</Col>
					<Col>
						<NoToDoList />
					</Col>
				</Row>
				<Alert variant="primary">
					Your total allocated time = {totalHrs} / 168 hours
				</Alert>
				<hr />
				{/* <DeleteButton /> */}
				<Button onClick={() => dispatch(deleteTasks(itemToDelete))}>
					Delete
				</Button>
			</Container>
		</div>
	);
};

export default App;
