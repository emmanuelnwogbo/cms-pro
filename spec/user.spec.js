import request from 'request';
import app from '../server';

const endpoint = `http://localhost:8080/api/v1/auth`;


describe('signup route', () => {
  it('should return status 403 if inputs are empty', done => {
    const user = {
      name: "",
      email: "emmanuel@gmail.com",
      website: "emmanuel.com",
      password: "emmanuel",
      confirmpassword: "emmanuel"
    };
    request.post(`${endpoint}/signup`, {
      json: true,
      body: user
    }, (error, res) => {
      expect(res.statusCode).toEqual(403);
      expect(res.body).toEqual({
        error: `please make sure all fields are filled correctly`
      });
      done();
    });
  });
  it('should return status 403 if inputs are numbers', done => {
    const user = {
      name: "1",
      email: "emmanuel@gmail.com",
      website: "emmanuel.com",
      password: "emmanuel",
      confirmpassword: "emmanuel"
    };
    request.post(`${endpoint}/signup`, {
      json: true,
      body: user
    }, (error, res) => {
      expect(res.statusCode).toEqual(403);
      expect(res.body).toEqual({
        error: `please make sure all fields are filled correctly`
      });
      done();
    });
  });
  it('should return status 403 if email field does not contain actual email', done => {
    const user = {
      name: "emmanuel",
      email: "emmanuelgmail.com",
      website: "emmanuel.com",
      password: "emmanuel",
      confirmpassword: "emmanuel"
    };
    request.post(`${endpoint}/signup`, {
      json: true,
      body: user
    }, (error, res) => {
      expect(res.statusCode).toEqual(403);
      expect(res.body).toEqual({
        error: `please make sure all fields are filled correctly`
      });
      done();
    });
  });
  it('should return status 403 if password !== confirmpassword', done => {
    const user = {
      name: "emmanuel",
      email: "emmanuel@gmail.com",
      website: "emmanuel.com",
      password: "emmanuel",
      confirmpassword: "emma"
    };
    request.post(`${endpoint}/signup`, {
      json: true,
      body: user
    }, (error, res) => {
      expect(res.statusCode).toEqual(403);
      expect(res.body).toEqual({
        error: `please make sure all fields are filled correctly`
      });
      done();
    });
  });
  it('should not let two users have the same email or website', done => {
    const user = {
      name: "emmanuel",
      email: "naijel@gmail.com",
      website: "naijael.com",
      password: "emmanuel",
      confirmpassword: "emmanuel"
    };
    request.post(`${endpoint}/signup`, {
      json: true,
      body: user
    }, (error, res) => {
      expect(res.statusCode).toEqual(403);
      expect(res.body).toEqual({
        message: `looks like a user with your email or website already exists`
      });
      done();
    });
  });
  it('should signup a user', done => {
    const user = {
      name: "rosemary jerry",
      email: "rossy@gmail.com",
      website: "rossyrossy.com",
      password: "emmanuel",
      confirmpassword: "emmanuel"
    };
    request.delete(`${endpoint}/delete/78y7y27yy5y5y/76468767333/7664t6767t67`, (error, res) => {
      done();
    });
    request.post(`${endpoint}/signup`, {
      json: true,
      body: user
    }, (error, res) => {
      expect(res.statusCode).toEqual(201);
      expect(res.body.message).toEqual(`you're logged in successfully`);
      done();
    });
  });
});

describe('signin route', () => {
  it('should return status 403 if inputs are empty', done => {
    const user = {
      email: "emmanuel@gmail.com",
      password: ""
    };
    request.post(`${endpoint}/signin`, {
      json: true,
      body: user
    }, (error, res) => {
      expect(res.statusCode).toEqual(403);
      expect(res.body).toEqual({
        error: `please make sure all fields are filled correctly`
      });
      done();
    });
  });
  it('should return status 403 if inputs are numbers', done => {
    const user = {
      email: "1",
      password: "hello74778400jjd"
    };
    request.post(`${endpoint}/signin`, {
      json: true,
      body: user
    }, (error, res) => {
      expect(res.statusCode).toEqual(403);
      expect(res.body).toEqual({
        error: `please make sure all fields are filled correctly`
      });
      done();
    });
  });
  it('should sign a user in', done => {
    const user = {
      email: "quavolam@gmail.com",
      password: "emmanuel"
    };
    request.post(`${endpoint}/signin`, {
      json: true,
      body: user
    }, (error, res) => {
      expect(res.statusCode).toEqual(200);
      done();
    });
  });
});

describe('signout route', () => {
  it('should return 401 status', done => {
    const options = {
      url: `${endpoint}/signout`,
      headers: {
        'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjBlZWE2M2Q3NWJjYzRiNjg5ZmZkODgiLCJhY2Nlc3MiOiJ'
      }
    };
    request.delete(options, (error, res) => {
      expect(res.statusCode).toEqual(401);
      done();
    });
  });
});