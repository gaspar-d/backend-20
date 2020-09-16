export class User {
	constructor(
		private id: string,
		private name: string,
		private email: string,
		private nickname: string,
		private password: string
	) {}

	public getId(): string {
		return this.id;
	}
	public getName(): string {
		return this.name;
	}
	public getEmail(): string {
		return this.email;
	}
	public getNickNAme(): string {
		return this.nickname;
	}
	public getPassword(): string {
		return this.password;
	}

	public static toUser(data?: any): User | undefined {
		return (
			data &&
			new User(
				data.id,
				data.name,
				data.email,
				data.nickname,
				data.password
			)
		);
	}
}
