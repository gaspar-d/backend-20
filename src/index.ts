import express from "express";
import dotenv from "dotenv";

import userRouter from "./router/User";
import bandRouter from "./router/Band";
import cors from "cors";
import showRouter from "./router/Show";

import { AddressInfo } from "net";

dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.use("/users/", userRouter);
app.use("/bands/", bandRouter);
app.use("/shows/", showRouter);

/* Server Rodando  */

const server = app.listen(process.env.DB_PORT || 3000, () => {
	if (server) {
		console.log(
			`Server listening on http://localhost:${
				(server.address() as AddressInfo).port
			}`
		);
	} else {
		console.log(`Error on running server`);
	}
});
