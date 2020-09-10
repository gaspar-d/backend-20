import { InvalidInputError } from "../error/InvalidInput";

export class Show {
	constructor(
		private id: string,
		private weekDay: WeekDay,
		private bandId: string,
		private startTime: number,
		private endTime: number
	) {}

	public getId(): string {
		return this.id;
	}
	public getWeekDay(): string {
		return this.weekDay;
	}
	public getBandId(): string {
		return this.bandId;
	}
	public getStartTime(): number {
		return this.startTime;
	}
	public getEndTime(): number {
		return this.endTime;
	}

	public static toWeekDayEnum(data?: string): WeekDay {
		switch (data) {
			case "FRIDAY":
				return WeekDay.FRIDAY;
			case "SATURDAY":
				return WeekDay.SATURDAY;
			case "SUNDAY":
				return WeekDay.SUNDAY;
			default:
				throw new InvalidInputError("Invalid week day");
		}
	}

	public static toShow(data?: any): Show | undefined {
		return (
			data &&
			new Show(
				data.id,
				Show.toWeekDayEnum(data.weekDay || data.week_day),
				data.bandId,
				data.startTime || data.start_time,
				data.endTime || data.end_time
			)
		);
	}
}

export enum WeekDay {
	FRIDAY = "FRIDAY",
	SATURDAY = "SATURDAY",
	SUNDAY = "SUNDAY",
}
