const formatTime = require('../formatTime');
const mockTimes = require('../__mock__/formatTimeMock');

describe('formatTime', () => {
  mockTimes.forEach(time => {
    it(`should format ${time.q} to ${time.a}`, () => {
      expect(formatTime(time.q)).toEqual(time.a);
    });
  });
});
