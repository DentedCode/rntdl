import express from "express";
const router = express.Router();

router.get("*", (req, res, next) => {
	console.log("user is verifid");
	next();
});

router.get("/", (req, res) => {
	res.send("Now you have reached the get");
});
router.get("/new", (req, res) => {
	res.send("Now you have reached the new");
});

router.post("/", (req, res) => {
	console.log(req.body);
	res.send("Now you have reached the post");
});
router.patch("/", (req, res) => {
	console.log(req.body);
	res.send("Now you have reached the patch");
});
router.put("/", (req, res) => {
	console.log(req.body);
	res.send("Now you have reached the put");
});
router.delete("/", (req, res) => {
	console.log(req.body);
	res.send("Now you have reached the delete");
});

export default router;
