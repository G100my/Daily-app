import { defineStore } from 'pinia';

const daysOfWeek = Object.values(DayEnum);

export const useWeeklyStore = defineStore('WeeklyStore', {
  state: () => {
    const weeklySchedule: { [key: DayEnum]: DailySchedule } = daysOfWeek.reduce((acc, i) => {
      acc[i] = {
        display: 'mon',
        start: '17:00',
        end: '23:00',
        list: [],
      };
      return acc;
    }, {});
    return {
      weeklySchedule,
    };
  },
  getters: {
    getDaysNameOfWeek: state => Object.keys(state.weeklySchedule),
  },
  actions: {},
});
