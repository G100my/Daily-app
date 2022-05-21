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
   *
   * @param {undefined | string | number} any
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
   * @any {Time | string | number | {min:number,hour:number}} any
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
   * @any {Time | string | number | {min:number,hour:number}} any
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
