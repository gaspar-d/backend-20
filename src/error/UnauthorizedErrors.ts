import { BaseError } from "./base/BaseError";

export class UnauthorizedError extends BaseError {
	constructor(message: string) {
		super(message, 403);
	}
}
