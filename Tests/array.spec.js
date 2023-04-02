/* eslint-disable no-undef */
/* eslint-disable indent */
//
import { expect } from 'chai';

describe('Arrays', () => {
    describe('#sort', () => {
        it('Sorting names array', () => {
            // eslint-disable-next-line no-var
            var names = ['Dany', 'Moshe', 'Adam'];
            expect(names.sort()).to.be.eql(['Adam', 'Dany', 'Moshe']);
        });
    });
});
