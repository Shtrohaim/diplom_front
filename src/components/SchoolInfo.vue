<template>
  <div class="school-info">
    <h2 class="school-info__title h_lg">{{ data.title }}</h2>
    <p class="school-info__description p_md" v-html="data?.description"></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type SchoolData from '@/types/schoolDataType'

export default defineComponent({
  name: 'SchoolInfo',
  props: {
    data: {
      type: Object as () => SchoolData,
      default: () => ({})
    }
  }
})
</script>

<style lang="scss">
.school-info {
  &__title {
    text-align: center;
    margin-bottom: 40px;

    @media (min-width: 320px) and (max-width: 640px) {
      margin-bottom: 20px;
    }
  }

  &__description {
    text-align: left;
    margin: 0 auto;
    width: 75%;

    @media (min-width: 320px) and (max-width: 640px) {
      width: 90%;
    }

    a {
      color: rgb(72 110 242);
    }

    ul {
      margin-bottom: 20px;
    }

    li {
      list-style-type: disc;
      margin-left: 50px;
    }
  }
}
</style>
