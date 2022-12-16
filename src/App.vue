<template>
  <header class="main__header">
    <nav class="main__header__nav nav">
      <ul class="nav__list">
        <li class="nav__list__item"><router-link to="/">Список валют</router-link></li>
        <li class="nav__list__item"><router-link to="/converter">Конвертер</router-link></li>
      </ul>
    </nav>
  </header>
  <router-view />
</template>

<script>
import { useStore } from 'vuex';
import { onMounted } from 'vue';

export default {
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch('getBankData');
    });
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  min-height: 100vh;
  padding: 0 15px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #f7fcfc;
  background: #1f2539;
  * {
    box-sizing: border-box;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  .main {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30px 0;
      .nav {
        &__list {
          display: flex;
          &__item {
            &:not(:last-child) {
              margin-right: 20px;
            }
            a {
              border-bottom: 1px solid;
              font-weight: bold;
              transition: .3s;
              &:hover,
              &:active,
              &:focus {
                border-bottom-color: transparent;
              }

              &.router-link-exact-active {
                color: #bb8b54;
              }
            }
          }
        }
      }
    }
  }
}
</style>
