export class Band {
	constructor(
		private id: string,
		private name: string,
		private mainGenre: string,
		private responsible: string
	) {}

	public getId(): string {
		return this.id;
	}
	public getName(): string {
		return this.name;
	}
	public getMainGenre(): string {
		return this.mainGenre;
	}
	public getResponsible(): string {
		return this.responsible;
	}

	public static toBand(data?: any): Band | undefined {
		return (
			data &&
			new Band(
				data.id,
				data.name,
				data.main_genre ||
					data.mainGenre ||
					data.music_genre ||
					data.musicGenre,
				data.responsible
			)
		);
	}
}
