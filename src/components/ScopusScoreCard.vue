<template>
  <div v-if="publisherInfo?.SNIP" class="score-card">
    <h3 class="score-card__title h_md">
      Очки цитирований за {{ publisherInfo.SNIP['@year'] }} год
    </h3>
    <p class="score-card__info p_sm">
      Очки CiteScore: {{ publisherInfo.citeScoreYearInfoList.citeScoreCurrentMetric }}
    </p>
    <p class="score-card__info p_sm">Очки SNIP: {{ publisherInfo.SNIP['$'] }}</p>
    <p class="score-card__info p_sm">Очки SJR: {{ publisherInfo.SJR['$'] }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type publisherInfoType from '@/types/publisherInfoType'

export default defineComponent({
  name: 'ScopusScoreCard',
  props: {
    publisherInfo: {
      type: Object as () => publisherInfoType,
      default: () => ({})
    }
  }
})
</script>

<style lang="scss">
.score-card {
  width: 400px;

  padding: 20px;

  background-color: $white;

  border-radius: 2px;
  box-shadow: 0 0 12px rgb(0 0 0 / 0.5);

  text-align: center;

  &__title {
    margin-bottom: 50px;
  }

  &__info {
    margin-bottom: 5px;
  }
}
</style>
