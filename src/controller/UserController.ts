import { Request, Response } from "express";
import { BaseDatabase } from "../data/base/BaseDatabase";
import { SignupBusiness } from "../business/SignupBusiness";
import { UserDatabase } from "../data/UserDataBase";
import { Cypher } from "../services/Cypher";
import { IdGenerator } from "../services/IdGenerator";
import { InvalidInputError } from "../error/InvalidInput";
import { Authorizer } from "../services/Authorizer";
import { LoginBusiness } from "../business/LoginBusiness";

export class UserController {
	public signup = async (req: Request, res: Response): Promise<any> => {
		try {
			const signupBusiness = new SignupBusiness(
				new UserDatabase(),
				new Cypher(),
				new IdGenerator()
			);

			const input = {
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				role: req.body.role,
			};

			if (!input.name || !input.email || !input.password || !input.role) {
				throw new InvalidInputError("Missing data");
			}

			const user = await signupBusiness.execute(input);

			const authorizer = new Authorizer();
			const token = authorizer.generateToken({
				userId: user.getId(),
				userRole: user.getRole(),
			});

			res.status(200).send({ token });
		} catch (error) {
			res.status(error.customErrorCode || 400).send({
				message: error.message,
			});
		} finally {
			await BaseDatabase.destroyConnection();
		}
	};

	public login = async (req: Request, res: Response) => {
		try {
			const loginBusiness = new LoginBusiness(
				new UserDatabase(),
				new Cypher()
			);

			const input = {
				email: req.body.email,
				password: req.body.password,
			};

			if (!input.email || !input.password) {
				throw new InvalidInputError("Missing data");
			}

			const user = await loginBusiness.execute(input);

			const authorizer = new Authorizer();
			const token = authorizer.generateToken({
				userId: user.getId(),
				userRole: user.getRole(),
			});

			res.status(200).send({ token });
		} catch (error) {
			res.status(error.customErrorCode || 400).send({
				message: error.message,
			});
		} finally {
			await BaseDatabase.destroyConnection();
		}
	};
}
