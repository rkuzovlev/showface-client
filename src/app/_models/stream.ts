export class Stream {
	constructor(
		public title: string,
		public image: string,
		public description: string,
		public closed: boolean,
		public id: number,
		public createdAt: Date,
		public updatedAt: Date,

		public saveInProgress?: boolean,
		public saveError?: Error,
		public openInProgress?: boolean,
		public openError?: Error,
		public closeInProgress?: boolean,
		public closeError?: Error,
	){ }
}