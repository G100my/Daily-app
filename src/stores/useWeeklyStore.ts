import { DayEnum, type DailySchedule, type Task } from '@/constant';
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
    return weeklySchedule;
  },
  getters: {},
  actions: {
    changeDayName(day: DayEnum, display: string) {
      //
    },
    changeRange(day: DayEnum, option: { start: string; end: string }) {
      //
    },
    addTask(day: DayEnum, task: Task) {
      //
    },
    deleteTask(day: DayEnum, taskID: number) {
      //
    },
    editTask(day: DayEnum, taskID: number, task: Task) {
      //
    },
  },
});
