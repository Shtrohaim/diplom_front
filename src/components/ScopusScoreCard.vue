<template>
  <div v-if="publisherInfo?.SNIP" class="score-card">
    <h3 class="score-card__title h_md">
      Очки цитирований за {{ publisherInfo.SNIP['@year'] }} год
    </h3>
    <v-tooltip
      class="score-card__info"
      text="Характеризует среднее количество цитат, полученных каждым документом, опубликованным в периодическом издании."
    >
      <p class="p_sm">
        Очки CiteScore: {{ publisherInfo.citeScoreYearInfoList.citeScoreCurrentMetric }}
      </p>
    </v-tooltip>
    <v-tooltip
      class="score-card__info"
      text="Оценивает взвешенное количество цитат, полученных серией публикаций. Зависит от отрасли знаний и престижности цитирующего периодического издания."
    >
      <p class="p_sm">Очки SNIP: {{ publisherInfo.SNIP['$'] }}</p>
    </v-tooltip>
    <v-tooltip
      class="score-card__info"
      text="Нормированный по источникам уровень цитируемости статьи характеризует количество фактически полученных цитат в отношении к ожидаемому количеству для отрасли знаний серии публикаций."
    >
      <p class="p_sm">Очки SJR: {{ publisherInfo.SJR['$'] }}</p>
    </v-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type publisherInfoType from '@/types/publisherInfoType'
import VTooltip from '@/components/common/tooltip.vue'

export default defineComponent({
  name: 'ScopusScoreCard',
  components: { VTooltip },
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 400px;

  padding: 20px;

  background-color: $white;

  border-radius: 2px;
  box-shadow: 0 0 12px rgb(0 0 0 / 0.5);

  text-align: center;

  @media (max-width: 1024px) {
    padding: 30px 30px 15px 30px;
  }

  @media (max-width: 769px) {
    padding: 15px 25px 15px 25px;
  }

  &__title {
    margin-bottom: 50px;

    @media (max-width: 1024px) {
      margin-bottom: 35px;
    }

    @media (min-width: 641px) and (max-width: 1023px) {
      margin-bottom: 25px;
    }

    @media (min-width: 320px) and (max-width: 640px) {
      margin-bottom: 15px;
    }
  }

  &__info {
    margin-bottom: 15px;
  }
}
</style>
