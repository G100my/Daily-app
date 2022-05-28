import { defineStore } from 'pinia';
/**
 * @typedef Task
 * @property {string} title Task name
 * @property {string|number|object} start Time
 * @property {number} duration
 * @property {string} baseOn element id
 * @property {{ top:number, bottom:number, left:number, right:number}} position
 * @property {number} priority 0,1,2,3
 */

/**
 * @typedef DailySchedule
 * @property {string} display
 * @property {string} start
 * @property {string} end
 * @property {Task[]} list
 */

/**
 * @typedef {'mon'|'tue'|'wed'|'thu'|'fri'|'sat'|'sun'} DayOfWeek
 */

/** @typedef { import('../utils/constant')} */

/** @type {Array.<DayOfWeek>} */
const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export const useTaskStore = defineStore('task', {
  state: () => {
    return {
      /** @type {{mon: DailySchedule, tue: DailySchedule, wed: DailySchedule, thu: DailySchedule, fri: DailySchedule, sat: DailySchedule, sun: DailySchedule, }} */
      weeklySchedule: daysOfWeek.reduce((acc, i) => {
        acc[i] = {
          display: 'mon',
          start: '17:00',
          end: '23:00',
          list: [],
        };
        return acc;
      }, {}),
      dailyList: [],
    };
  },
  getters: {
    getDaysNameOfWeek: state => Object.keys(state.weeklySchedule),
  },
  actions: {},
});
