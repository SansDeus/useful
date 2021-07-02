import {Vect} from './abstract/vect';
import {coordinate} from './types';

export class Vector extends Vect {
	public static Vector = new Vector();
	constructor(coordinate?: coordinate) {
		super(coordinate);
		this.acceleration = Vector.New;
		this.velocity = Vector.New;
	}

	static get New () {
		return this.Vector;
	}
}
