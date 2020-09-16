import { Request, Response } from "express";
import { BaseDatabase } from "../data/base/BaseDatabase";
import { Authorizer } from "../services/Authorizer";
import { RegisterImageBusiness } from "../business/RegisterImageBusiness";
import { GetImageDetailsBusiness } from "../business/getImageDetailsBusiness";
import { ImageDatabase } from "../data/ImageDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { UnauthorizedError } from "../error/UnauthorizedErrors";
import { InvalidInputError } from "../error/InvalidInput";

export class ImageController {
	public registerImage = async (req: Request, res: Response) => {
		try {
			const authorizer = new Authorizer();
			const tokenData = authorizer.retrieveDataFromToken(
				req.headers.authorization as string
			);

			const imageBusiness = new RegisterImageBusiness(
				new ImageDatabase(),
				new IdGenerator()
			);

			const input = {
				subtitle: req.body.subtitle,
				author: req.body.author,
				date: req.body.date,
				file: req.body.file,
				tags: req.body.tags,
				collection: req.body.collection,
			};

			if (
				!input.subtitle ||
				!input.author ||
				!input.date ||
				!input.file ||
				!input.tags ||
				!input.collection
			) {
				throw new InvalidInputError("Missing data");
			}

			await imageBusiness.execute(input);

			res.sendStatus(200);
		} catch (err) {
			res.status(err.customErrorCode || 400).send({
				message: err.message,
			});
		} finally {
			await BaseDatabase.destroyConnection();
		}
	};

	public getImageDetail = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const authorizer = new Authorizer();
			authorizer.retrieveDataFromToken(
				req.headers.authorization as string
			);

			const getImageDetailsBusiness = new GetImageDetailsBusiness(
				new ImageDatabase()
			);

			if (!req.query.idOrName) {
				throw new InvalidInputError("Missing data");
			}

			const image = await getImageDetailsBusiness.execute(
				req.query.idOrName as string
			);

			res.status(200).send(image);
		} catch (err) {
			res.status(err.customErrorCode || 400).send({
				message: err.message,
			});
		} finally {
			await BaseDatabase.destroyConnection();
		}
	};
}
