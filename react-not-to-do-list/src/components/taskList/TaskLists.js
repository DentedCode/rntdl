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
									defaultValue={row._id}
									onChange={handleOnChange}
									checked={itemToDelete.includes(row._id)}
								/>{" "}
								<label>{row?.title}</label>
							</td>

							<td>{row?.hr}</td>
							<td>
								<Button onClick={() => handleOnMarkAsNotToDo(row._id)}>
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
