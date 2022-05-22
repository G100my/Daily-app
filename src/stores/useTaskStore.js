import { defineStore } from 'pinia';

const initState = {
  scheduleList: [],
  dailyList: [],
};

export const useTaskStore = defineStore('task', {
  state: () => {
    return initState;
  },
  actions: {},
});
