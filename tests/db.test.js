const request = require('request');

test('server returns a list of events ', done => {
  request('http://localhost:3000/events', (error, response, body) => {
    expect(error).toBe(null);
    expect(Array.isArray(JSON.parse(body))).toBe(true);
    done();
  });
});

test('server posts events to the database ', done => {
  return request.post(
    {
      method: 'POST',
      uri: 'http://localhost:3000/create-event',
      title: 'a test event with reqeust',
      description: 'a test desctiption for jest',
      day: 1,
      month: 11,
      year: 2019
    },
    (error, response, body) => {
      expect(error).toBe(null);
      expect(typeof JSON.parse(body)).toBe('object');
      done();
    }
  );
});
