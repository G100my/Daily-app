import { DayEnum, type DailySchedule, type Position, type Task } from '@/constant';
import { defineStore } from 'pinia';
import Time from '@/utils/time';

const daysOfWeek = Object.values(DayEnum);

export const useWeeklyStore = defineStore('WeeklyStore', {
  state: () => {
    const weeklySchedule: { [key in DayEnum]: DailySchedule } = daysOfWeek.reduce((acc, i) => {
      acc[i] = {
        displayName: 'mon',
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
    changeDayName(day: DayEnum, displayName: string) {
      this[day].displayName = displayName;
    },
    changeRange(day: DayEnum, option: { start: string; end: string }) {
      const { start, end } = option;
      this[day].start = start;
      this[day].end = end;
    },
    sortList(day: DayEnum) {
      const startArr = this[day].list.map((i, index) => ({ index, start: i.start }));
      const range = { start: this[day].start, end: this[day].end };
      startArr.sort((a, b) => Time.judgeTheLatestInDay(a.start, b.start, range));
      this[day].list = startArr.map(i => this[day].list[i.index]);
    },
    addTask(day: DayEnum, task: Task) {
      this[day].list.push(task);
    },
    deleteTask(day: DayEnum, taskID: string) {
      const index = this[day].list.findIndex(i => i.taskID === taskID);
      this[day].list.splice(index, 1);
    },
    editTask(day: DayEnum, taskID: string, task: Partial<Omit<Task, 'taskID'>>) {
      const index = this[day].list.findIndex(i => i.taskID === taskID);
      this[day].list[index] = { ...this[day].list[index], ...task };
    },
    moveTask(day: DayEnum, taskID: string, position: Position) {
      const index = this[day].list.findIndex(i => i.taskID === taskID);
      this[day].list[index].position = position;
    },
  },
});
