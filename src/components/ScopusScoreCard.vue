<template>
  <div v-if="data.SNIP" class="score-card">
    <h3 class="score-card__title">Очки цитирований за {{ data.SNIP['@year'] }} год</h3>
    <p class="score-card__info">
      Очки CiteScore: {{ data.citeScoreYearInfoList.citeScoreCurrentMetric }}
    </p>
    <p class="score-card__info">Очки SNIP: {{ data.SNIP['$'] }}</p>
    <p class="score-card__info">Очки SJR: {{ data.SJR['$'] }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ScopusScoreCard',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
})
</script>

<style lang="scss">
.score-card {
  width: 400px;

  padding: 20px;

  background-color: #ffffff;

  border-radius: 2px;
  box-shadow: 0 0 12px rgb(0 0 0 / 0.5);

  text-align: center;

  &__title {
    margin-bottom: 50px;
    font-size: 26px;
  }

  &__info {
    margin-bottom: 5px;

    font-size: 22px;
  }
}
</style>
