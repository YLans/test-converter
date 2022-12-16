import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    bankData: {},
    chosenCurrency: {
      CharCode: 'RUB',
      Value: 1,
      Previous: 1,
      Nominal: 1,
    },
    converterCurrency: {},
  },
  getters: {
  },
  mutations: {
    setBankData(state, newData) {
      state.bankData = newData;
    },
    changeCurrency(state, newCurrency) {
      state.chosenCurrency = newCurrency;
    },
    setNewConverterCurrency(state, newCurrency) {
      state.converterCurrency = newCurrency;
    },
    shuffleCurrency(state) {
      const temp = state.chosenCurrency;
      state.chosenCurrency = state.converterCurrency;
      state.converterCurrency = temp;
    },
  },
  actions: {
    async getBankData({ commit }) {
      await axios.get('https://www.cbr-xml-daily.ru/daily_json.js').then((response) => {
        if (response.status === 200) {
          commit('setBankData', response.data.Valute);
        }
      });
    },
    recountBankValues({ state, commit }, newCurrency) {
      const dataValues = Object.values(state.bankData);
      const newData = {};
      const currencyCoef = state.chosenCurrency.Nominal / state.chosenCurrency.Value;
      const refreshedNewCurrency = {
        ...newCurrency,
        Value: newCurrency.Value / currencyCoef,
        Previous: newCurrency.Previous
          / (state.chosenCurrency.Nominal / state.chosenCurrency.Previous),
      };
      const newConverterCurrency = {
        ...state.converterCurrency,
        Value: ((state.converterCurrency.Value / currencyCoef)
          * (refreshedNewCurrency.Nominal / refreshedNewCurrency.Value)).toFixed(4),
      };

      dataValues.forEach((el) => {
        const value = (el.Value / currencyCoef)
        * (refreshedNewCurrency.Nominal / refreshedNewCurrency.Value);
        const prevValue = value + (el.Previous - el.Value);
        newData[el.CharCode] = {
          ...el,
          Value: value.toFixed(4),
          Previous: prevValue.toFixed(4),
        };
      });
      if (newData) {
        commit('changeCurrency', newCurrency);
        commit('setNewConverterCurrency', newConverterCurrency);
        commit('setBankData', newData);
      }
    },
  },
  modules: {
  },
});
