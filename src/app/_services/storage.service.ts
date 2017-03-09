import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
	constructor() { }

	get(key: string): string {
		return localStorage.getItem(key);
	}

	set(key: string, data: string): void {
		localStorage.setItem(key, data);
	}

	remove(key: string): void {
		localStorage.removeItem(key);
	}
}