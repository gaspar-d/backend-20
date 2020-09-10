import { BaseDatabase } from "./base/BaseDatabase";
import { Band } from "../model/Band";

export class BandDatabase extends BaseDatabase {
	public async getBandByEmailOrName(
		idOrName: string
	): Promise<Band | undefined> {
		const bands = await this.getConnection()
			.select("*")
			.from(this.tableNames.bands)
			.whereRaw(`name like "%${idOrName}%"`)
			.or.where({ id: idOrName[0] });
		return Band.toBand(bands[0]);
	}

	public async createBand(band: Band): Promise<void> {
		await this.getConnection()
			.insert({
				id: band.getId(),
				name: band.getName(),
				responsible: band.getResponsible(),
				music_genre: band.getMainGenre(),
			})
			.into(this.tableNames.bands);
	}
}
