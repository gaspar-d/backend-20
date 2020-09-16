import { User } from "../model/User";
import * as jwt from "jsonwebtoken";
import { SetupError } from "../error/SetupError";

export class Authorizer {
	private secretKey(): string {
		if (!process.env.JWT_KEY) {
			throw new SetupError(
				"Missing authorization secret key. Did you remember to create an .env file?"
			);
		}

		return process.env.JWT_KEY;
	}

	public retrieveDataFromToken(token: string): TokenData {
		const data = jwt.verify(token, this.secretKey()) as any;
		return {
			userId: data.userId,
		};
	}

	public generateToken(data: TokenData): string {
		return jwt.sign(data, this.secretKey());
	}
}

export interface TokenData {
	userId: string;
}
