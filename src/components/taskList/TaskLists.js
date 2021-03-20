import React, { useState } from "react";
import { Card, Button, Table } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

export const TaskLists = ({
	taskLists,
	handleOnMarkAsNotToDo,
	handleOnChange,
}) => {
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
					{React.Children.mapIntoArray(taskLists, (row, i) => (
						<tr>
							<td>
								<input
									type="checkbox"
									defaultValue={i}
									onChange={handleOnChange}
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

					{taskLists.map((row, i) => (
						<tr key={i}>
							<td>
								<input
									type="checkbox"
									defaultValue={i}
									onChange={handleOnChange}
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
