<template>
  <div class="school-navigation content">
    <router-link
      class="school-navigation__button school-navigation__button--oge"
      :to="{ name: 'exam', params: { examName: 'oge' } }"
    >
      <h3 class="school-navigation__name h_lg">ОГЭ</h3>
    </router-link>
    <router-link
      class="school-navigation__button"
      :to="{ name: 'exam', params: { examName: 'ege' } }"
    >
      <h3 class="school-navigation__name h_lg">ЕГЭ</h3>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SchoolNavigationPage'
})
</script>

<style lang="scss">
.school-navigation {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 89vh;

  &__name {
    position: absolute;
    bottom: 20px;
    right: 50%;

    transform: translateX(50%);
  }

  &__button {
    position: relative;
    display: block;

    width: 320px;
    height: 320px;

    text-align: center;

    background-color: $white;
    color: $black;

    border: 1px transparent;
    border-radius: 4px;

    background-image: url('@/assets/images/ege_icon.png');
    background-position: center;
    background-position-y: 35px;
    background-repeat: no-repeat;
    background-size: 200px;

    box-shadow: 0 0 12px rgb(0 0 0 / 0.5);

    &:hover {
      box-shadow: 0 0 25px rgb(0 0 0 / 0.5);
    }

    &--oge {
      background-image: url('@/assets/images/oge_icon.png');
      margin-right: 70px;
    }
  }
}
</style>
