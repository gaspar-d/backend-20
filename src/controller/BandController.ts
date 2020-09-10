import { Request, Response } from "express";
import { BaseDatabase } from "../data/base/BaseDatabase";
import { Authorizer } from "../services/Authorizer";
import { RegisterBandBusiness } from "../business/RegisterBandBusiness";
import { GetBandDetailsBusiness } from "../business/getBandDetailsBusiness";
import { BandDatabase } from "../data/BandDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { UserRole } from "../model/User";
import { UnauthorizedError } from "../error/UnauthorizedErrors";
import { InvalidInputError } from "../error/InvalidInput";

export class BandController {
	public registerBand = async (req: Request, res: Response) => {
		try {
			const authorizer = new Authorizer();
			const tokenData = authorizer.retrieveDataFormToken(
				req.headers.authorization as string
			);

			if (tokenData.userRole !== UserRole.ADMIN) {
				throw new InvalidInputError(
					"Only Admin can access this feature"
				);
			}

			const bandBusiness = new RegisterBandBusiness(
				new BandDatabase(),
				new IdGenerator()
			);

			const input = {
				name: req.body.name,
				mainGenre: req.body.mainGenre,
				responsible: req.body.responsible,
			};

			if (!input.name || !input.mainGenre || !input.responsible) {
				throw new InvalidInputError("Missing data");
			}

			await bandBusiness.execute(input);

			res.sendStatus(200);
		} catch (error) {
			res.status(error.customErrorCode || 400).send({
				message: error.message,
			});
		} finally {
			await BaseDatabase.destroyConnection();
		}
	};

	public getBandDetail = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const authorizer = new Authorizer();
			authorizer.retrieveDataFormToken(
				req.headers.authorization as string
			);

			const getBandDetailsBusiness = new GetBandDetailsBusiness(
				new BandDatabase()
			);

			if (!req.query.idOrNAme) {
				throw new InvalidInputError("Missing data");
			}

			const band = await getBandDetailsBusiness.execute(
				req.query.idOrNAme as string
			);

			res.status(200).send(band);
		} catch (error) {
			res.status(error.customErrorCode || 400).send({
				message: error.message,
			});
		} finally {
			await BaseDatabase.destroyConnection();
		}
	};
}
