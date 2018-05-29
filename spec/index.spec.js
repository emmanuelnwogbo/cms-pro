import request from 'request';

describe('http://localhost:8080', () => {
  it('it should return hello everyone', done => {
    request.get('http://localhost:8080', (error, res, body) => {
      expect(body).toBe('hello everyone');
      expect(res.statusCode).toBe(200);
      done();
    });
  }, 500);
});