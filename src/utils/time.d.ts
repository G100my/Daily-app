export default class Time {
    /**
     * @param {undefined | string | number | TimeBase} any
     * @returns
     */
    static parse(any: undefined | string | number | TimeBase): {
        hour: number;
        min: number;
        mins: number;
        isNegative: boolean;
    };
    /**
     *
     * @param {string | number} start
     * @param {string | number} end
     * @returns {number} mins
     */
    static getMinsBetween(start: string | number, end: string | number): number;
    /**
     * determine which time is the latter one.
     * @param {string | number} time1
     * @param {string | number} time2
     * @param {Range} range
     * @returns 1: first one, -1: second one, 0: equal
     */
    static judgeTheLatestInDay(time1: string | number, time2: string | number, range: Range): 1 | -1;
    /**
     *
     * @param {undefined | string | number} time
     * @returns
     */
    constructor(time: undefined | string | number);
    getHour: () => number;
    getMin: () => number;
    getMins: () => number;
    isNegative: () => boolean;
    getString: () => string;
    /**
     * @param {Time | string | number | TimeBase} any
     * @returns
     */
    plus(any: Time | string | number | TimeBase): Time;
    /**
     * @param {Time | string | number | TimeBase} any
     * @returns
     */
    minus(any: Time | string | number | TimeBase): Time;
}
export type TimeBase = {
    min: number;
    hour: number;
};
export type Range = {
    /**
     * '00:00'
     */
    start: string;
    /**
     * '00:00'
     */
    end: string;
};
