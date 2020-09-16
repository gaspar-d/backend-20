// import { InvalidInputError } from "../error/InvalidInput";

export class Image {
	constructor(
		private id: string,
		private subtitle: string,
		private author: string,
		private date: Date,
		private file: string,
		private tags: string[],
		private collection: string
	) {}

	public getId(): string {
		return this.id;
	}
	public getSubtitle(): string {
		return this.subtitle;
	}
	public getAuthor(): string {
		return this.author;
	}
	public getDate(): Date {
		return this.date;
	}
	public getFile(): string {
		return this.file;
	}
	public getTags(): string[] {
		return this.tags;
	}
	public getCollection(): string {
		return this.collection;
	}

	public static toImage(data?: any): Image | undefined {
		return (
			data &&
			new Image(
				data.id,
				data.subtitle,
				data.author,
				data.date,
				data.file,
				data.tags,
				data.collection
			)
		);
	}
}
