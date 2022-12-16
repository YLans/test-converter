<template>
  <section class="main__section">
    <SetCurrency setGlobalCurrency />
    <MainTable />
  </section>
</template>

<script>
import SetCurrency from '@/components/SetCurrency.vue';
import MainTable from '@/components/MainTable.vue';

export default {
  name: 'MainPage',
  components: {
    SetCurrency,
    MainTable,
  },
  setup() {
    return {
      setGlobalCurrency: true,
    };
  },
};
</script>
