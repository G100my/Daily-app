import { describe, test, expect } from 'vitest';
import Time from './time';

describe('init', () => {
  test.each([
    // prettier-ignore
    [null],
    [NaN],
  ])('%s', param => {
    expect(() => new Time(param)).toThrow();
  });

  test.each([
    // prettier-ignore
    ['3:00'],
    ['0e:00'],
    ['-3:00'],
  ])('%s', param => {
    expect(() => new Time(param)).toThrow();
  });

  test('undefined', () => {
    expect(() => new Time()).not.toThrow();
    const t = new Time();
    expect(t.getString()).toBe('00:00');
    expect(t.getMins()).toBe(0);
    expect(t.isNegative()).toBeFalsy();
  });

  test.each([
    ['-03:00', true, -3, -0, -180, '-03:00'],
    ['99:99', false, 100, 39, 6039, '100:39'],
    ['-99:99', true, -100, -39, -6039, '-100:39'],
    ['-999:99', true, -1000, -39, -60039, '-1000:39'],
    ['-00:00', true, -0, -0, -0, '-00:00'],
    ['00:00', false, 0, 0, 0, '00:00'],
  ])(
    'string: %s -> isNegative: %s, hour: %s, min: %s, mins: %s, output: %s',
    (params, isNegative, hour, min, mins, outputStr) => {
      expect(() => new Time(params)).not.toThrow();
      const t = new Time(params);
      expect(t.getString()).toBe(outputStr);
      expect(t.isNegative()).toBe(isNegative);
      expect(t.getHour()).toBe(hour);
      expect(t.getMin()).toBe(min);
      expect(t.getMins()).toBe(mins);
    },
  );

  test.each([
    [0, false, 0, 0, 0, '00:00'],
    // ! -0 === 0
    [-0, false, -0, -0, -0, '00:00'],
    [200, false, 3, 20, 200, '03:20'],
    [-200, true, -3, -20, -200, '-03:20'],
  ])(
    'number: %s -> isNegative: %s, hour: %s, min: %s, mins: %s, output: %s',
    (params, isNegative, hour, min, mins, outputStr) => {
      expect(() => new Time(params)).not.toThrow();
      const t = new Time(params);
      expect(t.getString()).toBe(outputStr);
      expect(t.isNegative()).toBe(isNegative);
      expect(t.getHour()).toBe(hour);
      expect(t.getMin()).toBe(min);
      expect(t.getMins()).toBe(mins);
    },
  );

  test.each([
    [10, 10, '10:10'],
    [0, 100, '01:40'],
    [100, 200, '103:20'],
    [100, -200, '96:40'],
    [-100, -10, '-100:10'],
    [-100, 10, '-99:50'],
    [10, 10, '10:10'],
  ])('{hour: %s, min: %s} -> %s', (hour, min, expected) => {
    expect(() => new Time({ hour, min })).not.toThrow();
    const t = new Time({ hour, min });
    expect(t.getString()).toBe(expected);
  });

  test('getters, 01:12', () => {
    const time = new Time('01:12');
    expect(time.getHour()).toBe(1);
    expect(time.getMin()).toBe(12);
    expect(time.getString()).toBe('01:12');
    expect(time.getMins()).toBe(72);
  });

  test('getters, 00:00', () => {
    const time = new Time('00:00');
    expect(time.getHour()).toBe(0);
    expect(time.getMin()).toBe(0);
    expect(time.getString()).toBe('00:00');
    expect(time.getMins()).toBe(0);
  });

  test('getters, 99:99', () => {
    const time = new Time('99:99');
    expect(time.getHour()).toBe(100);
    expect(time.getMin()).toBe(39);
    expect(time.getString()).toBe('100:39');
    expect(time.getMins()).toBe(6039);
  });
});

describe('method - strange input', () => {
  const t = '01:55';
  let time = new Time('01:55');

  test.each([
    // prettier-ignore
    [ undefined ],
    [null],
    [''],
    ['1'],
    [true],
    [{}],
    [NaN],
    [{ min: NaN }],
    [{ hour: NaN }],
    [{ min: NaN, hour: NaN }],
    [{ min: null }],
    [{ hour: null }],
    [{ hour: null, min: null }],
    [{ hour: null, min: 3 }],
    [{ hour: 3, min: null }],
    [{ hour: undefined, min: null }],
    [{ hour: undefined, min: undefined }],
  ])('plus invalid (%s, %s) => throw error', param => {
    expect(() => time.plus(param)).toThrow();
    // expect(result instanceof Time).toBeTruthy()
    // expect(result === time).toBeFalsy()
  });

  expect(time.getString()).toBe(t);

  test.each([
    [0, '01:55'],
    [1, '01:56'],
    [60, '02:55'],
    [121, '03:56'],
    [-0, '01:55'],
    [-1, '01:54'],
    [-60, '00:55'],
    [-121, '-00:06'],
    [-600, '-08:05'],

    [new Time(100), '03:35'],
    ['01:40', '03:35'],
    [100, '03:35'],
    ['-01:40', '00:15'],
    ['-02:40', '-00:45'],

    [{ hour: 1, min: 40 }, '03:35'],
    [{ min: 30 }, '02:25'],
    [{ hour: 3 }, '04:55'],
    ['-01:40', '00:15'],
    ['-02:40', '-00:45'],
  ])(`plus valid: ${t} + ( %s ) => %s`, (added, expected) => {
    const result = time.plus(added);
    expect(result instanceof Time).toBeTruthy();
    expect(result.getString()).toBe(expected);
  });
});

describe('static - getMinsBetween', () => {
  test.each([
    ['02:00', '10:20', '08:20'],
    ['02:40', '10:20', '07:40'],
    ['10:00', '02:20', '-07:40'],
    ['02:20', '02:20', '00:00'],
  ])(`%s -> %s =`, (start, end, expected) => {
    expect(Time.getMinsBetween(start, end)).toBe(Time.parse(expected).mins);
  });
});

// describe.only('', () => {
//   test('', () => {
//     const result = new Time('00:00').plus({ min: 30 })
//     expect(result.getString()).toBe('00:30')
//   })
// })
