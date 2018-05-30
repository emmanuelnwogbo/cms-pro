import jasmine from 'jasmine';

let originalTimeout;

beforeEach(function () {
  originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
});

afterEach(function () {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});