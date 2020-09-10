import { UserDatabase } from "../data/UserDataBase";
import { Cypher } from "../services/Cypher";
import { User } from "../model/User";
import { NotFoundError } from "../error/NotFoundErrors";

export class LoginBusiness {
	constructor(private userDatabase: UserDatabase, private cypher: Cypher) {}

	public async execute({
		email,
		password,
	}: LoginBusinessInput): Promise<User> {
		const user = await this.userDatabase.getUserByEmail(email);

		if (!user) {
			throw new NotFoundError("Invalid credentials");
		}

		const isPasswordRight = await this.cypher.compare(
			password,
			user.getPassword()
		);

		if (!isPasswordRight) {
			throw new NotFoundError("Invalid credentials");
		}

		return user;
	}
}

export interface LoginBusinessInput {
	email: string;
	password: string;
}
