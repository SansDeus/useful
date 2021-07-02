import { coordinate } from '../types/coordinate';
export type attractorPartial = { position: coordinate, radius?: number, force?: number };
export type attractor = { position: coordinate, radius: number, force: number };
