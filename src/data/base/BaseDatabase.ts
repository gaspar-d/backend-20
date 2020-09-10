import { SetupError } from "../../error/SetupError";
import knex from "knex";

export abstract class BaseDatabase {
	protected tableNames = {
		bands: "LamaBands",
		shows: "LamaShows",
		users: "LamaUsers",
	};

	private validateSetupData() {
		if (
			!process.env.DB_HOST ||
			!process.env.DB_USER ||
			!process.env.DB_PASSWORD ||
			!process.env.DB_DATABASE_NAME
		) {
			throw new SetupError(
				"Missing database credentials. Did you remember to create an .env file?"
			);
		}
	}

	private static connection: knex | null = null;

	protected getConnection(): knex {
		if (!BaseDatabase.connection) {
			BaseDatabase.connection = knex({
				client: "mysql",
				connection: {
					host: process.env.DB_HOST,
					port: 3306,
					user: process.env.DB_USER,
					password: process.env.DB_PASSWORD,
					database: process.env.DB_DATABASE_NAME,
				},
			});
		}

		return BaseDatabase.connection;
	}

	public static async destroyConnection() {
		if (BaseDatabase.connection) {
			await BaseDatabase.connection.destroy();
			BaseDatabase.connection = null;
		}
	}
}
