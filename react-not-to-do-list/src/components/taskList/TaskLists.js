import React, { useContext } from "react";
import { Card, Button, Table, NavItem } from "react-bootstrap";
import TaskContext from "../../MyContext";

export const TaskLists = ({
	taskLists,
	handleOnMarkAsNotToDo,
	handleOnChange,
	itemToDelete,
}) => {
	const task = useContext(TaskContext);
	console.log(task, "/////////");
	return (
		<>
			<h2>Task Lists</h2>
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>Task</th>
						<th>Hours</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{taskLists.map((row, i) => (
						<tr key={i}>
							<td>
								<input
									type="checkbox"
									defaultValue={i}
									onChange={handleOnChange}
									checked={itemToDelete.includes(i)}
								/>{" "}
								<label>{row?.title}</label>
							</td>
							<td>{row?.hr}</td>
							<td>
								<Button onClick={() => handleOnMarkAsNotToDo(i)}>
									Mark As Not To
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
};
