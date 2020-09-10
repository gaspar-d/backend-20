import { BandDatabase } from "../data/BandDatabase";
import { ShowDatabase } from "../data/ShowDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { WeekDay, Show } from "../model/Show";
import { NotFoundError } from "../error/NotFoundErrors";
import { InvalidInputError } from "../error/InvalidInput";

export class RegisterShowBusiness {
	constructor(
		private bandDatabase: BandDatabase,
		private showDatabase: ShowDatabase,
		private idGenerator: IdGenerator
	) {}

	public async execute(input: RegisterShowBusinessInput): Promise<void> {
		const band = await this.bandDatabase.getBandByEmailOrName(input.bandId);

		if (!band) {
			throw new NotFoundError("Band not found");
		}

		const registeredShows = await this.showDatabase.getShowRunningBetween(
			input.startTime,
			input.endTime
		);
		if (registeredShows.length) {
			throw new InvalidInputError(
				"No more shows can be registered between the provided time"
			);
		}

		await this.showDatabase.createShow(
			new Show(
				this.idGenerator.generate(),
				input.weekDay,
				input.bandId,
				input.startTime,
				input.endTime
			)
		);
	}
}

export interface RegisterShowBusinessInput {
	weekDay: WeekDay;
	bandId: string;
	startTime: number;
	endTime: number;
}
