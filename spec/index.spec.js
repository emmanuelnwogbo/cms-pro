import request from 'request';
import app from '../server';


describe('http://localhost:8080', () => {
  it('it should return welcome to CMS PRO', done => {
    request.get('http://localhost:8080', (error, res) => {
      expect(JSON.parse(res.body)).toEqual({
        message: `Welcome to CMS PRO`
      });
      expect(res.statusCode).toEqual(200);
      done();
    });
  });
});

describe('routes that do not exist', () => {
  it('it should return a status of 404', done => {
    request.get('http://localhost:8080/fakeroute', (error, res) => {
      expect(res.statusCode).toEqual(404);
      expect(JSON.parse(res.body)).toEqual({
        error: `Oops looks like that page doesn't exist`
      });
      done();
    })
  })
})