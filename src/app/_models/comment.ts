export class Comment {
	constructor(
		public id: number,
		public text: string,
		public userId: number,
		public createdAt: Date,
	){ }
}