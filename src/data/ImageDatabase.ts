import { BaseDatabase } from "./base/BaseDatabase";
import { Image } from "../model/Images";

export class ImageDatabase extends BaseDatabase {
	public async getImageByEmailOrName(
		idOrName: string
	): Promise<Image | undefined> {
		const images = await this.getConnection()
			.select("*")
			.from(this.tableNames.images)
			.whereRaw(`name like "%${idOrName}%"`)
			.or.where({ id: idOrName[0] });
		return Image.toImage(images[0]);
	}

	public async createBand(image: Image): Promise<void> {
		await this.getConnection()
			.insert({
				id: image.getId(),
				subtitle: image.getSubtitle(),
				author: image.getAuthor(),
				date: image.getDate(),
				file: image.getFile(),
				tags: image.getTags(),
				collection: image.getCollection(),
			})
			.into(this.tableNames.images);
	}
}
