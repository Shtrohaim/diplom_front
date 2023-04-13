<template>
  <header class="header">
    <nav v-if="$route.name !== 'main'" class="header__navigation">
      <ul class="header__list">
        <li class="header__list-item">
          <button
            class="header__button"
            @click="goToPreviousPage()"
            title="Вернутся на предыдущую страницу"
          >
              <svg class="fill-white icon36">
                  <use href="@/assets/images/back_icon.svg#icon"></use>
              </svg>
          </button>
        </li>
        <li class="header__list-item">
          <button
            class="header__button"
            @click="goToMainPage()"
            title="На главную страницу"
          >
              <svg class="fill-white icon28">
                  <use href="@/assets/images/home_icon.svg#icon"></use>
              </svg>
          </button>
        </li>
      </ul>
    </nav>

    <h1 class="header__site-name">ПУПА</h1>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SiteHeader',
  methods: {
    goToMainPage() {
      this.$router.push({ name: 'main' })
    },
    goToPreviousPage() {
      this.$router.go(-1)
    }
  }
})
</script>

<style lang="scss">
.header {
  display: flex;
  align-items: center;

  position: relative;

  width: 100%;
  min-height: 80px;

  padding-left: 20px;

  &__site-name {
    position: absolute;
    top: 50%;
    right: 120px;

    transform: translateY(-50%);

    color: #486ef2;
  }

  &__navigation {
    padding: 0;
  }

  &__list {
    display: flex;
  }

  &__list-item {
    margin-right: 5px;
  }

  &__button {
    width: 50px;
    height: 50px;

    border: 1px transparent;
    border-radius: 50%;

    background-color: #486ef2;
    mask-repeat: no-repeat;
    mask-position: center;

    cursor: pointer;

    &:hover {
      opacity: 80%;
    }
  }
}
</style>
