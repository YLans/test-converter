<template>
  <section class="main__section section-convert">
    <div class="section-convert__item">
      <SetCurrency />
      <label class="section-convert__item__field" for="item-from">
        <input
          type="number"
          id="item-from"
          @change="convertInput"
          placeholder="Введите число"
          :disabled="!disableInput"
        />
      </label>
    </div>
    <button class="section-convert__btn" @click="shuffleCurrency">></button>
    <div class="section-convert__item">
      <SetCurrency setGlobalCurrency />
      <label class="section-convert__item__field" for="item-from">
        <input type="number" id="item-from" :value="convertedInput" disabled />
      </label>
    </div>
  </section>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

import SetCurrency from './SetCurrency.vue';

export default {
  name: 'ConvertCurrencyItem',
  components: {
    SetCurrency,
  },
  setup() {
    const store = useStore();
    const chosenCurrency = computed(() => (store.state.chosenCurrency || {}));
    const converterCurrency = computed(() => (store.state.converterCurrency || {}));
    const bankData = computed(() => (store.state.bankData || {}));
    const disableInput = computed(() => (Object.keys(converterCurrency.value).length > 0));
    const convertedInput = ref();

    let timer;

    const convertInput = (evt) => {
      evt.preventDefault();

      clearTimeout(timer);

      timer = setTimeout(() => {
        convertedInput.value = (evt.target.value * converterCurrency.value.Value).toFixed(4);
      }, 1000);
    };

    const shuffleCurrency = (evt) => {
      evt.preventDefault();
      store.commit('shuffleCurrency');
    };

    return {
      bankData,
      chosenCurrency,
      converterCurrency,
      convertedInput,
      disableInput,
      convertInput,
      shuffleCurrency,
      setGlobalCurrency: true,
    };
  },
};
</script>

<style lang="scss">
#app .main__section.section-convert {
  display: flex;
  align-items: center;
  .section-convert {
    &__item {
      width: 50%;
      padding: 10px;
      border: 2px solid #f7fcfc;
      border-radius: 8px;
      input {
        width: 100%;
        padding: 10px;
        border: none;
        outline: none;
        font-size: 28px;
        color: inherit;
        background: transparent;
      }
    }
    &__btn {
      flex: none;
      width: 30px;
      height: 30px;
      padding: 0;
      border: none;
      outline: none;
      font-size: 20px;
      color: inherit;
      background: transparent;
    }
  }
}
</style>
