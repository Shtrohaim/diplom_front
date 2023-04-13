<template>
  <div class="school-navigation">
    <button class="school-navigation__button school-navigation__button--oge" @click="goToOge()">
      ОГЭ
    </button>
    <button class="school-navigation__button" @click="goToEge()">ЕГЭ</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SchoolView',
  methods: {
    goToOge() {
      this.$router.push({ name: 'exam', params: { examName: 'oge' } })
    },
    goToEge() {
      this.$router.push({ name: 'exam', params: { examName: 'ege' } })
    }
  }
})
</script>

<style lang="scss">
.school-navigation {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 89vh;

  &__button {
    width: 300px;
    min-height: 310px;

    margin-left: 70px;
    margin-bottom: 130px;

    font-size: 46px;
    background-color: #ffffff;
    color: #486ef2;

    cursor: pointer;

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
