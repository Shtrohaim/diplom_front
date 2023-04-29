<template>
  <div v-if="publisherInfo?.coverageEndYear" class="coverage-card">
    <h3 class="coverage-card__title h_md">Период покрытия Scopus</h3>
    <div v-if="publisherInfo?.coverageEndYear >= currentYear" class="coverage-card__wrapper p_sm">
      <p>{{ publisherInfo.coverageStartYear }}</p>
      <div class="coverage-card__bar">
        <div class="coverage-card__progress" :style="{ width: progressBar + '%' }">
          {{ currentYear }}
        </div>
      </div>
      <p>{{ publisherInfo.coverageEndYear }}</p>
    </div>
    <div v-else class="coverage-card__message p_md">Более не поддерживается!</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch } from 'vue'
import type publisherInfoType from '@/types/publisherInfoType'

export default defineComponent({
  name: 'ScopusCoverageCard',
  props: {
    publisherInfo: {
      type: Object as () => publisherInfoType,
      default: () => ({})
    }
  },
  setup(props) {
    const { publisherInfo } = toRefs(props)
    const progressBar = ref(0)
    const currentYear = new Date().getFullYear() as number

    const progressYears = () => {
      const currentPercent =
        ((currentYear - publisherInfo.value.coverageStartYear) * 100) /
        (publisherInfo.value.coverageEndYear - publisherInfo.value.coverageStartYear)
      if (progressBar.value < currentPercent) {
        progressBar.value++
        setTimeout(() => progressYears(), 15)
      }
    }

    watch(publisherInfo, () => {
      progressYears()
    })

    return { currentYear, progressBar }
  }
})
</script>

<style lang="scss">
.coverage-card {
  width: 700px;

  padding-top: 20px;
  padding-bottom: 20px;

  background-color: $white;
  border-radius: 4px;

  box-shadow: 0 0 12px rgb(0 0 0 / 0.5);

  &__title {
    margin-bottom: 50px;

    text-align: center;
  }

  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__bar {
    border: 3px solid black;
    width: 500px;
    height: 30px;

    margin: 0 8px;

    border-radius: 10px;

    z-index: 10;
  }

  &__progress {
    height: 100%;
    padding-top: 1px;
    padding-right: 15px;

    color: $white;
    font-size: 19px;

    background-color: $primary;
    text-align: end;

    border-radius: 5px;

    z-index: 0;
  }
}
</style>
