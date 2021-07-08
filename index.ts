import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req: any, res: any) => {
	res.send("Server is up and running");
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
