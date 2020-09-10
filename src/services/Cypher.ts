import * as bcrypt from "bcryptjs";
import { SetupError } from "../error/SetupError";

export class Cypher {
	private cost(): any {
		if (!process.env.BCRYPT_COST) {
			throw new SetupError(
				"Missing cypher cost. Did you remember to create an .env file?"
			);
		}

		return Number(process.env.BCRYPT_COST);
	}

	public async hash(s: string): Promise<string> {
		const salt = await bcrypt.getSalt(this.cost());
		return bcrypt.hash(s, salt);
	}

	public async compare(s: string, hash: string): Promise<boolean> {
		return bcrypt.compare(s, hash);
	}
}
