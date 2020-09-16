import { ImageDatabase } from "../data/ImageDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Image } from "../model/Images";

export class RegisterImageBusiness {
	constructor(
		private imageDatabase: ImageDatabase,
		private idGenerator: IdGenerator
	) {}

	public async execute(input: RegisterImageBusinessInput): Promise<void> {
		await this.imageDatabase.createBand(
			Image.toImage({
				...input,
				id: this.idGenerator.generate(),
			})!
		);
	}
}

export interface RegisterImageBusinessInput {
	subtitle: string;
	author: string;
	date: Date;
	file: string;
	tags: string[];
	collection: string;
}
