/*global describe, it, before */

import chai from 'chai';
import Fetch from '../dist/rd-fetch.js';

chai.expect();

const expect = chai.expect;

describe('Fetch',  () => {
  it('should have the static json method', (done) => {
    expect(typeof Fetch.json === 'function').to.be.true;
    done();
  });
});
