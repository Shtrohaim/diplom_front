<template>
  <div class="scopus-info">
    <scopus-article-card class="scopus-info__article-card" />
    <scopus-score-card :publisherInfo="publisherInfo" class="scopus-info__score-card" />
    <scopus-coverage-card :publisherInfo="publisherInfo" class="scopus-info__coverage-card" />
    <scopus-journal-card :publisherInfo="publisherInfo" class="scopus-info__journal-card" />
    <div v-if="Object.keys(publisherInfo).length === 0">Данные об издателе не найдены</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import ScopusScoreCard from '@/components/ScopusScoreCard.vue'
import ScopusCoverageCard from '@/components/ScopusCoverageCard.vue'
import ScopusArticleCard from '@/components/ScopusArticleCard.vue'
import ScopusJournalCard from '@/components/ScopusJournalCard.vue'

import scopusService from '@/services/scopusService'
import type publisherInfoType from '@/types/publisherInfoType'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ScopusView',
  components: {
    ScopusScoreCard,
    ScopusCoverageCard,
    ScopusArticleCard,
    ScopusJournalCard
  },
  setup() {
    const publisherInfo = ref({} as publisherInfoType)
    const route = useRoute()
    const fetchData = () => {
      scopusService.getScopusIssn(route.params.id).then((res) => {
        publisherInfo.value = res.data
      })
    }

    onMounted(async () => {
      await fetchData()
    })

    return { publisherInfo }
  }
})
</script>

<style lang="scss">
.scopus-info {
  display: grid;
  grid-template-columns: 54% 46%;
  grid-row-gap: 20px;
  padding: 20px;

  &__article-card {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 3;

    margin: 0 auto;

    width: 600px;
  }

  &__journal-card {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;

    margin: 0 auto;

    width: 900px;
  }

  &__score-card {
    margin: 0 auto;
  }

  &__journal-card {
    margin: 0 auto;
  }
}
</style>
