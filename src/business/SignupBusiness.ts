import { UserDatabase } from "../data/UserDataBase";
import { Cypher } from "../services/Cypher";
import { IdGenerator } from "../services/IdGenerator";
import { User } from "../model/User";

export class SignupBusiness {
	constructor(
		private userDatabase: UserDatabase,
		private cypher: Cypher,
		private idGenerator: IdGenerator
	) {}

	public async execute(input: SignupBusinessInput): Promise<User> {
		const hashPassWord = await this.cypher.hash(input.password);

		const user = User.toUser({
			...input,
			id: this.idGenerator.generate(),
			password: hashPassWord,
		});

		await this.userDatabase.createUser(user!);

		return user!;
	}
}

export interface SignupBusinessInput {
	name: string;
	email: string;
	password: string;
	role: string;
}
