<template>
  <router-link
    class="region-card"
    :to="{ name: 'region_news', params: { tableName: this.region.tableName } }"
  >
    <img
      class="region-card__image"
      :src="`http://localhost:3000/img/${region?.img}`"
      :alt="`Герб ${region?.name}`"
    />
    <h3>{{ region.name }}</h3>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type Regions from '@/types/regionsType'

export default defineComponent({
  name: 'RegionCard',
  props: {
    region: {
      type: Object as () => Regions,
      default: () => ({})
    }
  }
})
</script>

<style lang="scss">
.region-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0 auto;

  width: 95%;
  padding: 20px;

  order: 999;

  border-radius: 2px;
  box-shadow: 0 0 12px rgb(0 0 0 / 0.5);
  cursor: pointer;

  page-break-inside: avoid;
  break-inside: avoid;

  &__image {
    width: 100px;
  }

  &:hover {
    width: 100%;
    box-shadow: 0 0 25px rgb(0 0 0 / 0.5);
  }
}
</style>
