import { ImageDatabase } from "../data/ImageDatabase";
import { Image } from "../model/Images";
import { NotFoundError } from "../error/NotFoundErrors";

export class GetImageDetailsBusiness {
	constructor(private imageDatabase: ImageDatabase) {}

	public async execute(idOrName: string): Promise<Image> {
		const image = await this.imageDatabase.getImageByEmailOrName(idOrName);
		if (!image) {
			throw new NotFoundError("Image no found");
		}
		return image;
	}
}
