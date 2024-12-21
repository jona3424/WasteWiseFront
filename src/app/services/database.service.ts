import { Injectable } from '@angular/core';
import { Container } from '../models/container';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {
	constructor() { }

	getContainers() : Container[]{
		return [new Container("nigger", 44.791837,20.476937)];
	}

}
