import express, { Request, Response } from "express";
import cors from "cors";
import AgoraToken from "agora-access-token";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
	res.send("Server is up and running");
});

interface Body {
	appId: string;
	appCertificate: string;
	channelName: string;
}

app.post("/generateToken", (req: Request, res: Response) => {
	const data: Body = req.body;

	const uid = Math.floor(Math.random() * 100000);

	const expirationTimeInSeconds = 3600;
	const currentTimestamp = Math.floor(Date.now() / 1000);
	const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
	const role = AgoraToken.RtcRole.PUBLISHER;

	const token = AgoraToken.RtcTokenBuilder.buildTokenWithUid(
		data.appId,
		data.appCertificate,
		data.channelName,
		uid,
		role,
		privilegeExpiredTs
	);

	console.log(`Generated token for ${uid}: ${token}`);

	res.status(200).json({ uid, token });
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
