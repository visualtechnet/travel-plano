const request = require('supertest');

describe('SuperTest loading express', () => {
  let server;
  beforeEach(() => {
    // eslint-disable-next-line global-require
    server = require('../index');
  });
  afterEach(() => {
    server.close();
  });
  it('responds to /weather/postal/:lat/:lng', (done) => {
    request(server)
      .get('/weather/postal/:lat/:lng')
      .expect(200, done);
  });
  it('responds to /pixlocation/:query', (done) => {
    request(server)
      .get('/pixlocation/:query')
      .expect(200, done);
  });
  it('responds to /geolocation', (done) => {
    request(server)
      .get('/geolocation')
      .expect(200, done);
  });
  it('responds to /geolocation/location', (done) => {
    request(server)
      .get('/geolocation/location')
      .expect(200, done);
  });
  it('404 everything else', (done) => {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});
