import React from "react";
import { Row, Col, Button } from "react-bootstrap";

export const DeleteButton = ({ deleteItems }) => {
	return (
		<Row>
			<Col>
				<Button onClick={deleteItems}>Delete</Button>
			</Col>
		</Row>
	);
};
