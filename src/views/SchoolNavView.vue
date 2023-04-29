<template>
  <div class="school-navigation content">
    <router-link
      class="school-navigation__button school-navigation__button--oge"
      :to="{ name: 'exam', params: { examName: 'oge' } }"
    >
      ОГЭ
    </router-link>
    <router-link
      class="school-navigation__button"
      :to="{ name: 'exam', params: { examName: 'ege' } }"
      >ЕГЭ</router-link
    >
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

  &__button {
    width: 360px;
    height: 360px;

    margin-left: 70px;
    margin-bottom: 130px;

    text-align: center;

    background-color: $white;
    color: $black;

    background-image: url('@/assets/images/exam_icon.png');
    background-repeat: no-repeat;
    background-position: center;
    background-position-y: 5px;
    background-size: 300px;

    border: 1px transparent;
    border-radius: 4px;

    box-shadow: 0 0 12px rgb(0 0 0 / 0.5);

    &:hover {
      box-shadow: 0 0 25px rgb(0 0 0 / 0.5);
    }

    &--oge {
      margin-left: 0;
    }
  }
}
</style>
