import express from "express";
const app = express();
import bodyParser from "body-parser";

const PORT = 5000;

import router from "./router.js";

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/api/v1", router);

app.use("/", (req, res) => {
	// throw new Error("test error");
	res.send("Working");
});

app.use((error, req, res, next) => {
	console.log(error);
	res.code(500).send(error.message);
});

app.listen(PORT, error => {
	error && console.log(error);

	console.log(`Server is running at http://localhost:${PORT}`);
});
