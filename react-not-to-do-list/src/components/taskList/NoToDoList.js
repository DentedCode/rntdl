import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { taskSwitch } from "./taskAction";
import { setItemToDelete } from "./taskSlice";

import { Button, Table, Alert } from "react-bootstrap";

export const NoToDoList = () => {
	const dispatch = useDispatch();
	const { notToDoLists, itemToDelete } = useSelector(state => state.task);

	const totalSavedTime = notToDoLists.reduce(
		(subTtl, row) => subTtl + row.hr,
		0
	);

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
									defaultValue={row._id}
									onChange={e => dispatch(setItemToDelete(e.target))}
									checked={itemToDelete.includes(row._id)}
								/>{" "}
								<label>{row?.title}</label>
							</td>
							<td>{row?.hr}</td>
							<td>
								<Button
									variant="primary"
									onClick={() =>
										dispatch(
											taskSwitch({
												_id: row._id,
												todo: true,
											})
										)
									}
								>
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
