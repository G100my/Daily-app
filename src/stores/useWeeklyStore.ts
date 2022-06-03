import { defineStore } from 'pinia';

export interface Position {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
export interface Task {
  title: string;
  start: string;
  duration: number;
  baseOn: string;
  position: Position;
}

export interface DailySchedule {
  display: string;
  start: string;
  end: string;
  list: Task[];
}

export enum DayEnum {
  MON = 'mon',
  TUE = 'tue',
  WED = 'wed',
  THU = 'thu',
  FRI = 'fri',
  SAT = 'sat',
  SUN = 'sun',
}
export type DayOfWeek = `${DayEnum}`;

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
