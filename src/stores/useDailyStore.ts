import { defineStore } from 'pinia';

export const useDailyStore = defineStore('taskDailyStore', {
  state: () => {
    return {
      dailyList: [],
    };
  },
  getters: {},
  actions: {},
});
