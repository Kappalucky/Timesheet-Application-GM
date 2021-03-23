import Vue from 'vue';
import Vuex from 'vuex';

import api from '../services/API';

console.log(api);

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    timesheets: [],
    billableAmount: '',
    totalHours: '',
  },
  mutations: {
    ADD_TIMESHEETS(state, timesheet) {
      state.timesheets = { ...timesheet };
    },
    NEW_VEHICLE(state, timesheet) {
      state.timesheets.push(timesheet);
    },
  },
  actions: {
    newTimesheet({ dispatch, commit }, params) {
      return new Promise((resolve, reject) => {
        console.log(params);
        api
          .post('/timesheets/', {
            firstName: params.firstName,
            lastName: params.lastName,
            client: params.client,
            project: params.project,
            projectCode: params.projectCode,
            hours: params.hours,
            billable: params.billable,
            billableRate: params.billableRate,
            date: params.date,
          })
          .then((response) => {
            console.log('newTimesheet:', response);
            dispatch('getTimesheets');
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    getTimesheets({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get('/timesheets/')
          .then((response) => {
            console.log('getTimesheets:', response);
            const timesheets = response.data;
            commit('ADD_TIMESHEETS', timesheets);
            resolve(response);
          })
          .catch((error) => {
            const e = error;
            console.log(error);
            reject(e);
          });
      });
    },
  },
  modules: {},
});
