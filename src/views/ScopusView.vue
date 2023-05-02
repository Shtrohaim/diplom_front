<template>
  <div v-if="!isLoading" class="scopus-info content">
    <scopus-article-card
      class="scopus-info__article-card"
      :class="{
        'scopus-info__article-card--no-publisher': Object.keys(publisherInfo).length === 0
      }"
    />
    <scopus-score-card :publisherInfo="publisherInfo" class="scopus-info__score-card" />
    <scopus-coverage-card :publisherInfo="publisherInfo" class="scopus-info__coverage-card" />
    <scopus-journal-card :publisherInfo="publisherInfo" class="scopus-info__journal-card" />
    <div class="scopus-info__publisher-not-found" v-if="Object.keys(publisherInfo).length === 0">
      Данные об издателе не найдены!
    </div>
  </div>
  <loading-screen v-else />
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
import LoadingScreen from '@/components/common/loading.vue'

export default defineComponent({
  name: 'ScopusView',
  components: {
    LoadingScreen,
    ScopusScoreCard,
    ScopusCoverageCard,
    ScopusArticleCard,
    ScopusJournalCard
  },
  setup() {
    const publisherInfo = ref({} as publisherInfoType)
    const route = useRoute()

    const isLoading = ref(true)
    const fetchData = () => {
      scopusService
        .getScopusIssn(route.params.id)
        .then((res) => {
          publisherInfo.value = res.data
          isLoading.value = false
        })
        .catch(() => {
          isLoading.value = false
        })
    }

    onMounted(async () => {
      isLoading.value = true
      await fetchData()
    })

    return { publisherInfo, isLoading }
  }
})
</script>

<style lang="scss">
.scopus-info {
  display: grid;
  grid-template-columns: 54% 46%;
  grid-row-gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 50% 50%;
    grid-row-gap: 15px;
  }

  &__article-card {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 3;

    margin: 0 auto;

    max-width: 600px;

    &--no-publisher {
      grid-column-start: 1;
      grid-column-end: 4;
    }

    @media (max-width: 1024px) {
      max-width: 420px;
    }
  }

  &__journal-card {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;

    margin: 0 auto;

    max-width: 900px;

    @media (max-width: 1024px) {
      max-width: 800px;
    }
  }

  &__publisher-not-found {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;

    margin: 50px auto 0;
  }

  &__coverage-card {
    max-width: 650px;

    margin-left: 20px;

    @media (max-width: 1024px) {
      margin-left: 10px;

      max-width: 480px;
    }
  }

  &__score-card {
    margin: 0 auto;
    max-width: 600px;

    @media (max-width: 1024px) {
      max-width: 350px;
    }
  }
}
</style>
