export class User {
	constructor(
		public id: number,
		public email: string,
		public avatar: string,
		public name: string,
		public status: string,
		public moderator: boolean,
	){ }
}