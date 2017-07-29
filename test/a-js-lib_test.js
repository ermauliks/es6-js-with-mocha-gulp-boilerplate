const expect = require('chai').expect;
const Rectangle = require('../app/js/lib/a-js-lib').default;

describe('a-js-lib', () => {
    describe('Rectangle', () => {
        const width = 1200;
        const height = 800;
        it('should calculate area', () => {
            const rect = new Rectangle(width, height);
            expect(rect.area).to.equal(960000);
        });
    });
});
