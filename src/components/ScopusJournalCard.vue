<template>
  <div v-if="publisherInfo?.['subject-area']" class="journal-card">
    <h3 class="journal-card__title">Информация об издателе</h3>
    <p class="journal-card__info">Название: {{ publisherInfo.title }}</p>
    <p class="journal-card__info">Тип издателя: {{ publisherInfo.aggregationType }}</p>
    <p class="journal-card__info">Публикуется в {{ publisherInfo.publisher }}</p>
    <div class="journal-card__id-wrapper">
      <p v-if="publisherInfo?.eIssn" class="journal-card__info">EISSN: {{ publisherInfo.eIssn }}</p>
      <p v-if="publisherInfo?.issn" class="journal-card__info">ISSN: {{ publisherInfo.issn }}</p>
    </div>
    <p class="journal-card__info">Отрасль знаний: {{ publisherInfo['subject-area'][0]['$'] }}</p>
    <p v-if="publisherInfo?.['subject-area'].length > 1" class="journal-card__info">
      Подотрасль:
      <span v-for="subarea in filteredAreas" :key="subarea['@code']">{{ subarea['$'] }}</span>
    </p>
    <a
      v-if="publisherInfo?.['origin-link']"
      :href="publisherInfo?.['origin-link']"
      class="journal-card__link"
    >
      Перейти на сайт издателя
    </a>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import type publisherInfoType from '@/types/publisherInfoType'

export default defineComponent({
  name: 'ScopusJournalCard',
  props: {
    publisherInfo: {
      type: Object as () => publisherInfoType,
      default: () => ({})
    }
  },
  setup(props) {
    const { publisherInfo } = toRefs(props)

    const filteredAreas = computed(() => {
      let areas = publisherInfo.value['subject-area'].slice()
      areas.shift()
      return areas
    })

    return { filteredAreas }
  }
})
</script>

<style lang="scss">
.journal-card {
  width: 400px;

  padding: 40px 20px 55px 90px;

  background-color: $white;

  border-radius: 2px;
  box-shadow: 0 0 12px rgb(0 0 0 / 0.5);

  &__title {
    margin-bottom: 50px;

    text-align: center;

    font-size: 26px;

    transform: translateX(-5%);
  }

  &__id-wrapper {
    display: flex;
    width: 50%;
    justify-content: space-between;
  }

  &__info {
    margin-bottom: 5px;

    font-size: 22px;
    text-align: left;

    span {
      &::after {
        content: ', ';
      }
    }

    span:last-child {
      &::after {
        content: '';
      }
    }
  }

  &__link {
    display: block;

    margin-top: 35px;
    font-size: 26px;

    text-align: center;
    transform: translateX(-5%);
  }
}
</style>
