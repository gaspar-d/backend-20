import { BandDatabase } from "../data/BandDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Band } from "../model/Band";

export class RegisterBandBusiness {
	constructor(
		private bandDatabase: BandDatabase,
		private idGenerator: IdGenerator
	) {}

	public async execute(input: RegisterBandBusinessInput): Promise<void> {
		await this.bandDatabase.createBand(
			Band.toBand({
				...input,
				id: this.idGenerator.generate(),
			})!
		);
	}
}

export interface RegisterBandBusinessInput {
	name: string;
	mainGenre: string;
	responsible: string;
}
