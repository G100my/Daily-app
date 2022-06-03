import { DayEnum, type DailySchedule } from '@/constant';
import { defineStore } from 'pinia';

const daysOfWeek = Object.values(DayEnum);

export const useWeeklyStore = defineStore('WeeklyStore', {
  state: () => {
    const weeklySchedule: { [key in DayEnum]: DailySchedule } = daysOfWeek.reduce((acc, i) => {
      acc[i] = {
        display: 'mon',
        start: '17:00',
        end: '23:00',
        list: [],
      };
      return acc;
    }, {} as { [key in DayEnum]: DailySchedule });
    return {
      weeklySchedule,
    };
  },
  getters: {
    getDaysNameOfWeek: state => Object.keys(state.weeklySchedule),
  },
  actions: {},
});
