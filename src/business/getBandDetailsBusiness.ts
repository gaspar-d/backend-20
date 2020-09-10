import { BandDatabase } from "../data/BandDatabase";
import { Band } from "../model/Band";
import { NotFoundError } from "../error/NotFoundErrors";

export class GetBandDetailsBusiness {
	constructor(private bandDatabase: BandDatabase) {}

	public async execute(idOrName: string): Promise<Band> {
		const band = await this.bandDatabase.getBandByEmailOrName(idOrName);
		if (!band) {
			throw new NotFoundError("Band no found");
		}
		return band;
	}
}
