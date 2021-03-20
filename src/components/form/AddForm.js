import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const initialFormDAta = {
	title: "test",
	hr: 10,
};
export const AddForm = ({ handleOnAddTask }) => {
	const [task, setTask] = useState(initialFormDAta);

	const handleOnChange = e => {
		const { name, value } = e.target;

		setTask({
			...task,
			[name]: name === "hr" ? +value : value,
		});
	};

	const handleOnSubmit = e => {
		e.preventDefault();
		handleOnAddTask(task);
	};

	return (
		<Form onSubmit={handleOnSubmit}>
			<Row>
				<Col>
					<Form.Control
						maxLength="15"
						onChange={handleOnChange}
						name="title"
						placeholder="Task Name"
						value={task.title}
						required
					/>
				</Col>
				<Col>
					<Form.Control
						type="number"
						onChange={handleOnChange}
						name="hr"
						value={task.hr}
						placeholder="number of hours"
						required
					/>
				</Col>
				<Col>
					<Button type="submit">Add Task</Button>
				</Col>
			</Row>
		</Form>
	);
};
