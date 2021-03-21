import React from "react";
import { Button, Table, Alert } from "react-bootstrap";

export const NoToDoList = ({
	notToDoLists,
	markAsToDo,
	handleOnChangeNotToDo,
	totalSavedTime,
}) => {
	return (
		<>
			<h2>Not To Do Lists</h2>
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>Task</th>
						<th>Hours</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{notToDoLists.map((row, i) => (
						<tr key={i}>
							<td>
								<input
									type="checkbox"
									defaultValue={i}
									onChange={handleOnChangeNotToDo}
								/>{" "}
								<label>{row?.title}</label>
							</td>
							<td>{row?.hr}</td>
							<td>
								<Button variant="primary" onClick={() => markAsToDo(i)}>
									Mark As To Do
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Alert variant="success">Your saved = {totalSavedTime} hours</Alert>
		</>
	);
};
