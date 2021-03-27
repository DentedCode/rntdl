import mongoose from "mongoose";

console.log(process.env.MONGO_CLIENT);

const mongoClient = async () => {
	try {
		const con = await mongoose.connect(process.env.MONGO_CLIENT, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});

		if (con) {
			console.log("MongoDB is connected");
		}
	} catch (error) {
		console.log(error);
	}
};

export default mongoClient;
