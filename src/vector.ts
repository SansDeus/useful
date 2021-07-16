import {Vect} from './abstract/vect';
import {coordinate} from './types';

export class Vector extends Vect {
	constructor(coordinate?: coordinate) {
		super(coordinate);
	}
}
