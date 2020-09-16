import { BaseDatabase } from "./base/BaseDatabase";
import { Show, WeekDay } from "../model/Images";
import { GetShowsByDayBusinessOutputItem } from "../business/getShowsByDayBusiness";

export class ShowDatabase extends BaseDatabase {
	public async createShow(show: Show): Promise<void> {
		await this.getConnection()
			.insert({
				id: show.getId(),
				band_id: show.getBandId(),
				start_time: show.getStartTime(),
				end_time: show.getEndTime(),
				week_day: show.getWeekDay(),
			})
			.into(this.tableNames.shows);
	}

	public async getShowRunningBetween(
		startTime: number,
		endTime: number
	): Promise<Show[]> {
		const shows = await this.getConnection()
			.select("*")
			.where("end_time", ">", `${startTime}`)
			.and.where("start_time", "<", `${endTime}`)
			.from(this.tableNames.shows);

		return shows.map((data) => Show.toShow(data)!);
	}

	public async getShowByWeekDay(
		weekDay: WeekDay
	): Promise<GetShowsByDayBusinessOutputItem[]> {
		const shows = await this.getConnection().raw(
			`
            SELECT  s.id as id, 
                    b.id as bandId,
                    s.start_time as startTime,
                    s.end_time as endTime,
                    s.week_day as weekDay,
                    b.music_genre as mainGenre
            FROM ${this.tableNames.shows} s
            LEFT JOIN ${this.tableNames.bands} b ON b.id = s.band_id
            WHERE  s.week_day  = "${weekDay}"
            ORDER BY startTime ASC
            `
		);

		return shows[0].map((data: any) => ({
			id: data.id,
			bandId: data.bandId,
			startTime: data.startTime,
			endTime: data.endTime,
			weekDay: data.weekDay,
			mainGenre: data.mainGenre,
		}));
	}
}
