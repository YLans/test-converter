<template>
  <table class="main__table">
    <thead></thead>
    <tbody>
      <tr class="table__row" v-for="item in bankData" :key="item.ID">
        <td class="table__cell">{{ item.Nominal }}</td>
        <td class="table__cell">{{ item.CharCode }}</td>
        <td class="table__cell"> - </td>
        <td class="table__cell">{{ item.Value }}</td>
        <td class="table__cell">{{ chosenCurrency.CharCode }}</td>
        <td class="table__cell">
          <span
            class="table__cell__badge"
            :class="item.Value > item.Previous ? 'badge-up' : 'badge-down'"
          >
            ({{ (Math.abs(item.Value - item.Previous)).toFixed(2) }}
            {{ item.Value > item.Previous ? ' ▲' : ' ▼'}})
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'MainTable',
  setup() {
    const store = useStore();
    const chosenCurrency = computed(() => (store.state.chosenCurrency || {}));
    const bankData = computed(() => {
      const arr = Object.values(store.state.bankData)
        .filter((el) => el.CharCode !== chosenCurrency.value.CharCode);
      const data = {};
      if (arr) {
        arr.forEach((el) => {
          data[el.CharCode] = el;
        });
      }
      return data;
    });

    return {
      bankData,
      chosenCurrency,
    };
  },
};
</script>

<style lang="scss">
.main__table {
  width: fit-content;
  border-collapse: collapse;
  text-align: left;
  list-style: none;
  .table {
    &__row {
      &:not(:last-child) {
        border-bottom: 2px solid rgba(#f7fcfc, .06);
      }
    }
    &__cell {
      &:not(:nth-child(2)) {
        padding: 10px;
      }
      &:first-child {
        padding-left: 0;
      }
      &__badge {
        &.badge-up {
          color: #35a135;
        }
        &.badge-down {
          color: #ff4646;
        }
      }
    }
  }
}
</style>
