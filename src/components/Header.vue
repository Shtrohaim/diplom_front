<template>
  <header class="header">
    <nav v-if="$route.name !== 'main'" class="header__navigation">
      <ul class="header__list">
        <li class="header__list-item">
          <a class="header__button" @click="$router.go(-1)" title="Вернутся на предыдущую страницу">
            <svg class="fill-white icon36">
              <use href="@/assets/images/back_icon.svg#icon"></use>
            </svg>
          </a>
        </li>
        <li class="header__list-item">
          <router-link class="header__button" :to="{ name: 'main' }" title="На главную страницу">
            <svg class="fill-white icon28">
              <use href="@/assets/images/home_icon.svg#icon"></use>
            </svg>
          </router-link>
        </li>
      </ul>
    </nav>
    <h1 class="header__site-name">ПУПА</h1>
    <h2 class="header__page-name h_lg">{{ route.meta.title }}</h2>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'SiteHeader',
  setup() {
    const route = useRoute()
    return { route }
  }
})
</script>

<style lang="scss">
.header {
  display: grid;
  grid-template-columns: 10% 80% 10%;
  align-items: center;

  width: 100%;
  min-height: 80px;

  text-align: center;

  padding: 20px;

  &__site-name {
    color: $primary;
    grid-column-start: 3;
    grid-column-end: 4;
  }

  &__page-name {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }

  &__navigation {
    padding: 0;
    grid-column-start: 1;
    grid-column-end: 2;
  }

  &__list {
    display: flex;
  }

  &__list-item {
    margin-right: 5px;
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 50px;
    height: 50px;

    border: 1px transparent;
    border-radius: 50%;

    background-color: $primary;

    cursor: pointer;

    &:hover {
      opacity: 80%;
    }
  }
}
</style>
