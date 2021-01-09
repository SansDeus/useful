import {VectorBase} from './abstract/vectorBase';
import {coordinate} from './interfaces';

export class Vector extends VectorBase {
	constructor(coordinate: coordinate = { x: 0, y: 0 }) {
		super(coordinate);
	}
}
