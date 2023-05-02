<template>
  <router-link
    class="news-card"
    :to="{ name: 'news', params: { tableName: route.params.tableName, id: news?.id } }"
  >
    <div class="news-card__info-wrapper">
      <img v-if="news?.image_url" :src="news.image_url" class="news-card__image" />
      <div class="news-card__date" :class="{ 'news-card__date--no-image': !news?.image_url }">
        <p class="news-card__date-day">
          {{ getDayGeneralFormat(news.date.replace(/(\r\n\t|\n|\r|\t)/gm, '').trim()) }}
        </p>
        <p class="news-card__date-month">
          {{ getRuShortMonth(news.date.replace(/(\r\n\t|\n|\r|\t)/gm, '').trim()) }}
        </p>
      </div>
    </div>
    <div class="news-card__text-content">
      <h3 class="news-card__title h_md">{{ news.title }}</h3>
      <p class="news-card__description p_sm">{{ news.teaser }}</p>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type NewsList from '@/types/newsListType'
import { getRuShortMonth, getDayGeneralFormat } from '@/utils/dates'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'NewsCard',
  props: {
    news: {
      type: Object as () => NewsList,
      default: () => ({})
    }
  },
  setup() {
    const route = useRoute()
    return { getRuShortMonth, getDayGeneralFormat, route }
  }
})
</script>

<style lang="scss">
.news-card {
  display: flex;

  width: 100%;
  border-radius: 4px;

  background-color: $white;

  box-shadow: 0 0 12px rgb(0 0 0 / 0.5);
  cursor: pointer;

  padding: 25px;

  &__info-wrapper {
    position: relative;
  }

  &__date {
    position: absolute;
    top: -2px;
    left: -3px;
    width: 70px;
    height: 70px;

    border-radius: 0 10px 0 10px;

    padding: 10px;

    color: $white;
    background: linear-gradient(
      150deg,
      rgb(72 110 242) 0%,
      rgb(74 110 233) 43%,
      rgb(160 132 236) 100%
    );

    box-shadow: 5px 5px 15px rgba(0 0 0 / 50%);

    font-weight: bold;
    text-align: center;

    &--no-image {
      position: relative;
      margin-right: 10px;
    }
  }

  &__date-day {
    font-family: sans-serif;
    font-size: 24px;
  }

  &__date-month {
    font-size: 22px;
    font-weight: 600;
  }

  &__image {
    width: 220px;
    height: 220px;

    border-radius: 2px;

    object-fit: cover;
  }

  &__text-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-left: 45px;

    width: 80%;

    color: $black;
  }

  &__title {
    margin-bottom: 30px;
  }

  &__description {
    position: relative;
    width: 90%;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    line-clamp: 5;
    box-orient: vertical;

    text-align: left;
    color: $black;

    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: linear-gradient(transparent 30px, white);
    }
  }
}
</style>
