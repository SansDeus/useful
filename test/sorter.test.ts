import { assert as t } from 'chai';
import 'mocha';
import {Sorter} from '../src/sorter';
const values = [{ foo: 1, bar: 2 }, { foo: 3, bar: 1, }, { foo: 4, bar: 2, }, {foo: 2, bar: 3 }];
describe('Sorter', () => {
	it('sorts by bar', () => {
		t.deepEqual(Sorter(values, 'bar'), [ { foo: 3, bar: 1 }, { foo: 1, bar: 2 }, { foo: 4, bar: 2 }, { foo: 2, bar: 3 } ]);
		t.deepEqual(Sorter(values, 'bar', true), [ { foo: 2, bar: 3 }, { foo: 1, bar: 2 },  { foo: 4, bar: 2 }, { foo: 3, bar: 1 } ]);
	});
});