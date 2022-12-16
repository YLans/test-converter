<template>
  <div class="main__select select">
    <div class="select__base">
      {{ selectText }}
      <button
        class="select__base__btn"
        :class="showDropdown ? 'active' : ''"
        @click="showDropdown = !showDropdown"
      >
        {{ setGlobalCurrency ? chosenCurrency.CharCode : localCurrency.CharCode || '' }}
        <i>▼</i>
      </button>
    </div>
    <ul
      class="select__dropdown dropdown"
      v-show="showDropdown"
    >
      <li
        class="select__dropdown__item item"
        v-for="item in bankData"
        :key="item.ID"
      >
        <button
          class="item__btn"
          :value="item.CharCode"
          :disabled="setGlobalCurrency
            ? item.CharCode === chosenCurrency.CharCode : item.CharCode === localCurrency.CharCode"
          @click="setNewCurrency"
        >
          {{ item.CharCode }}
          <i class="item__btn-flag" v-if="setGlobalCurrency
            ? item.CharCode === chosenCurrency.CharCode : item.CharCode === localCurrency.CharCode">
            &#10004;
          </i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref, onMounted } from 'vue';

export default {
  name: 'SetCurrency',
  props: {
    setGlobalCurrency: Boolean,
  },
  setup(props) {
    const store = useStore();
    const bankData = computed(() => (store.state.bankData || {}));
    const chosenCurrency = computed(() => (store.state.chosenCurrency || {}));
    const localCurrency = computed(() => (store.state.converterCurrency || {}));
    const selectText = ref('Базовая валюта');
    const showDropdown = ref(false);

    onMounted(() => {
      if (!props.setGlobalCurrency && !localCurrency.value.length) {
        selectText.value = 'Выберите валюту';
      } else if (localCurrency.value.length > 0) {
        selectText.value = 'Выбранная валюта';
      }
    });

    const setNewCurrency = (evt) => {
      evt.preventDefault();
      const newCurrency = bankData.value[evt.target.value] || {};
      if (newCurrency) {
        if (props.setGlobalCurrency) {
          store.dispatch('recountBankValues', newCurrency);
        } else {
          store.commit('setNewConverterCurrency', newCurrency);
        }
        showDropdown.value = false;
      }
    };

    return {
      bankData,
      chosenCurrency,
      localCurrency,
      showDropdown,
      selectText,
      setNewCurrency,
    };
  },
};
</script>

<style lang="scss">
#app .main__select {
  position: relative;
  width: fit-content;
  margin-bottom: 30px;
  .select {
    &__base__btn {
      padding: 5px 10px;
      margin-left: 5px;
      border: 2px solid #f7fcfc;
      border-radius: 15px;
      color: inherit;
      background: transparent;
      transition: .3s;
      cursor: pointer;
      &:hover,
      &:active,
      &:focus {
        opacity: .7;
      }
      i {
        position: relative;
        top: -1px;
        display: inline-block;
        height: 100%;
        margin-left: 5px;
        font-size: 10px;
        transition: .3s;
      }
      &.active i {
        transform: rotate(180deg);
      }
    }
    &__dropdown {
      position: absolute;
      bottom: -310px;
      right: 0;
      width: fit-content;
      height: 300px;
      overflow-y: auto;
      color: #1f2539;
      background: #f7fcfc;
      &__item {
        position: relative;
        display: flex;
        .item {
          &__btn {
            display: flex;
            align-items: baseline;
            padding: 10px;
            border: none;
            background: transparent;
            cursor: pointer;
            &-flag {
              margin-left: 8px;
              font-style: normal;
              font-weight: 500;
              opacity: 0.7;
            }
          }
        }
      }
    }
  }
}
</style>
