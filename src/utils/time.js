/**
 * @typedef {Object} TimeBase
 * @property {number} min
 * @property {number} hour
 */

/**
 * @typedef {Object} Range
 * @property {string} start '00:00'
 * @property {string} end '00:00'
 */
const timeFormat = /^-\d{2,}:\d{2}$|^\d{2,}:\d{2}$/;

class TimeError extends Error {
  constructor(message) {
    super();
    this.name = 'TimeObject';
    this.message = message;
  }
}
function addZero(num) {
  return Math.abs(num) < 10 ? '0' + Math.abs(num) : Math.abs(num);
}

export default class Time {
  /**
   * @param {undefined | string | number | TimeBase} any
   * @returns
   */
  static parse(any) {
    let hour = 0,
      min = 0,
      mins = 0,
      isNegative = false;
    switch (typeof any) {
      case 'undefined':
        break;

      case 'string':
        if (!timeFormat.test(any)) {
          throw new TimeError(`[parse]: ${typeof any} ${any}`);
        }

        isNegative = any.startsWith('-');
        [hour, min] = any.split(':').map(i => Number(i));
        if (isNegative) min *= -1;
        mins = hour * 60 + min;
        break;
      case 'object':
        var arr = Object.keys(any);
        if (!arr.length) throw new TimeError(`[parse]: empty object can't be as param`);
        arr.forEach(i => {
          if (typeof any[i] !== 'number' || isNaN(any[i])) throw new TimeError(`[parse]: param.${i} is invaild or NaN`);
          switch (i) {
            case 'min':
              mins += any.min;
              break;
            case 'hour':
              mins += any.hour * 60;
              break;

            default:
              throw new TimeError(`[parse]: invalid param property: ${i}`);
          }
        });
        isNegative = mins < 0;
        break;
      case 'number':
        if (isNaN(any)) {
          throw new TimeError(`[parse]: ${typeof any} ${any}`);
        }
        mins = any;
        isNegative = mins < 0;
        break;
      default:
        throw new TimeError(`[parse]:  ${typeof any} ${any}`);
    }

    min = mins % 60;

    hour = isNegative ? Math.ceil(mins / 60) : Math.floor(mins / 60);

    return { hour, min, mins, isNegative };
  }

  // ? more kind of input type ?
  /**
   *
   * @param {string | number} start
   * @param {string | number} end
   * @returns {number} mins
   */
  static getMinsBetween(start, end) {
    if (!start || !end) throw new Error("start, end can't be undefined.");
    return Time.parse(end).mins - Time.parse(start).mins;
  }

  /**
   * determine which time is the latter one.
   * @param {string | number} time1
   * @param {string | number} time2
   * @param {Range} range
   * @returns 1: first one, -1: second one, 0: equal
   */
  static judgeTheLatestInDay(time1, time2, range) {
    if (!time1 || !time2) throw new Error("time1, time2 can't be undefined.");
    if (!range) range = { start: '00:00', end: '24:00' };
    const rangeStartMins = this.parse(range.start).mins;
    const rangeEndMins = this.parse(range.end).mins;
    const offset = this.getDurationBetween(range.start, '24:00');
    let time1Mins = this.parse(time1).mins;
    let time2Mins = this.parse(time2).mins;
    if (rangeStartMins > rangeEndMins) {
      if (time1Mins < rangeStartMins) time1Mins += offset;
      if (time2Mins < rangeStartMins) time2Mins += offset;
    }
    const result = time1Mins - time2Mins;
    if (result > 0) return 1;
    else if (result < 0) return -1;
    return null;
  }

  // #hour;
  // #min;

  /**
   *
   * @param {undefined | string | number} time
   * @returns
   */
  constructor(time) {
    const { hour: _hour, min: _min, mins: _mins, isNegative } = Time.parse(time);
    this.getHour = () => _hour;
    this.getMin = () => _min;
    this.getMins = () => _mins;
    this.isNegative = () => isNegative;
    this.getString = () => (isNegative ? '-' : '') + addZero(_hour) + ':' + addZero(_min);
  }

  /**
   * @param {Time | string | number | TimeBase} any
   * @returns
   */
  plus(any) {
    if (any instanceof Time) {
      return new Time(this.getMins() + any.getMins());
    } else if (typeof any === 'string' || typeof any === 'number' || typeof any === 'object') {
      return new Time(this.getMins() + Time.parse(any).mins);
    } else {
      throw new TimeError(`plus - param in invalid, ${typeof any} ${any}`);
    }
  }
  // ? refactor me ?
  /**
   * @param {Time | string | number | TimeBase} any
   * @returns
   */
  minus(any) {
    if (any instanceof Time) {
      return new Time(this.getMins() - any.getMins());
    } else if (typeof any === 'string' || typeof any === 'number' || typeof any === 'object') {
      return new Time(this.getMins() - Time.parse(any).mins);
    } else {
      throw new TimeError(`plus - param in invalid, ${typeof any} ${any}`);
    }
  }
}
