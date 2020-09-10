import { Request, Response } from "express";
import { BaseDatabase } from "../data/base/BaseDatabase";
import { Authorizer } from "../services/Authorizer";
import { UserRole } from "../model/User";
import { UnauthorizedError } from "../error/UnauthorizedErrors";
import { RegisterShowBusiness } from "../business/RegisterShowBusiness";
import { BandDatabase } from "../data/BandDatabase";
import { ShowDatabase } from "../data/ShowDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { InvalidInputError } from "../error/InvalidInput";
import { Show } from "../model/Show";
import { GetShowsByDayBusiness } from "../business/getShowsByDayBusiness";

export class ShowController {
	public registerShow = async (req: Request, res: Response) => {
		try {
			const authorizer = new Authorizer();
			const data = authorizer.retrieveDataFormToken(
				req.headers.authorization as string
			);

			if (data.userRole !== UserRole.ADMIN) {
				throw new UnauthorizedError(
					"Only admin can access this feature"
				);
			}

			const registerShowBusiness = new RegisterShowBusiness(
				new BandDatabase(),
				new ShowDatabase(),
				new IdGenerator()
			);

			if (
				!req.body.weekDay ||
				!req.body.bandId ||
				!req.body.startTime ||
				!req.body.endTime
			) {
				throw new InvalidInputError("Missing data");
			}

			const weekDay = Show.toWeekDayEnum(req.body.weekDay);
			const startTime = req.body.startTime;
			const endTime = req.body.entTime;

			if (startTime > endTime) {
				throw new InvalidInputError("Invalid time");
			}

			if (startTime < 8 || endTime > 23) {
				throw new InvalidInputError("Invalid time");
			}

			const input = {
				weekDay,
				bandId: req.body.bandId,
				startTime,
				endTime,
			};

			await registerShowBusiness.execute(input);

			res.sendStatus(200);
		} catch (error) {
			res.status(error.customErrorCode || 400).send({
				message: error.message,
			});
		} finally {
			await BaseDatabase.destroyConnection();
		}
	};

	public getShowsByDay = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const getShowsByDayBusiness = new GetShowsByDayBusiness(
				new ShowDatabase()
			);

			const weekDay = Show.toWeekDayEnum(
				req.query && (req.query.weekDay as string)
			);
			const shows = await getShowsByDayBusiness.execute(weekDay);
		} catch (error) {
			res.status(error.customErrorCode || 400).send({
				message: error.message,
			});
		} finally {
			await BandDatabase.destroyConnection();
		}
	};
}
