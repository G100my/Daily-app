import { DayEnum, type Position, type Task } from '@/constant';
import { setActivePinia, createPinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useWeeklyStore, daysOfWeek } from './useWeeklyStore';

describe('Weekly Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it('init', () => {
    const store = useWeeklyStore();
    const days = Object.keys(store.$state);
    expect(days).toEqual(daysOfWeek);
  });

  describe('Actions', () => {
    setActivePinia(createPinia());
    const store = useWeeklyStore();

    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    const time1 = new Date(2022, 4, 20, 20, 20, 22);
    const task1base: Omit<Task, 'taskID'> = {
      title: 'time1',
      start: '17:00',
      duration: 100,
      position: { top: 0, right: 0, left: 0, bottom: 0 },
    };
    it('Add task1', () => {
      vi.setSystemTime(time1);
      store.addTask(DayEnum.MON, task1base);
      expect(store[DayEnum.MON].list).toEqual([
        {
          taskID: time1.valueOf(),
          ...task1base,
        },
      ]);
    });

    const time2 = new Date(2022, 4, 20, 20, 20, 32);
    const task2base: Omit<Task, 'taskID'> = {
      title: 'time2',
      start: '10:00',
      duration: 100,
      position: { top: 0, right: 0, left: 0, bottom: 0 },
    };
    it('Add task2, order: time2,time1', () => {
      vi.setSystemTime(time2);
      const origin = JSON.parse(JSON.stringify(store.mon.list));
      store.addTask(DayEnum.MON, task2base);
      expect(store[DayEnum.MON].list).toEqual([
        {
          taskID: time2.valueOf(),
          ...task2base,
        },
        ...origin,
      ]);
      expect(store.mon.list[0].start).toBe(task2base.start);
      expect(store.mon.list[1].start).toBe(task1base.start);
    });

    const time3 = new Date(2022, 4, 20, 20, 20, 55);
    const task3base: Omit<Task, 'taskID'> = {
      title: 'time2',
      start: '14:00',
      duration: 100,
      position: { top: 0, right: 0, left: 0, bottom: 0 },
    };
    it('Add task2, order: time2, time3, time1', () => {
      vi.setSystemTime(time3);
      const origin = JSON.parse(JSON.stringify(store.mon.list));
      store.addTask(DayEnum.MON, task3base);
      expect(store[DayEnum.MON].list).toEqual([
        origin[0],
        {
          taskID: time3.valueOf(),
          ...task3base,
        },
        origin[1],
      ]);
      expect(store.mon.list[0].start).toBe(task2base.start);
      expect(store.mon.list[1].start).toBe(task3base.start);
      expect(store.mon.list[2].start).toBe(task1base.start);
    });

    it('delete time3', () => {
      store.deleteTask(DayEnum.MON, time3.valueOf());
      expect(store.mon.list.length).toBe(2);
      expect(store.mon.list[0].start).toBe(task2base.start);
      expect(store.mon.list[1].start).toBe(task1base.start);
    });

    it('moveTask', () => {
      const newPosition: Position = {
        bottom: 1,
        left: 20,
        top: -20,
        right: 12,
      };
      store.moveTask(DayEnum.MON, time1.valueOf(), newPosition);
      expect(store.mon.list[1].position).toEqual(newPosition);
    });
  });
});
