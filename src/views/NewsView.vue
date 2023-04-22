<template>
  <div class="news">
    <h1 class="news__title">{{ news.title }}</h1>
    <div class="news__date">
      Дата публикации: <span>{{ news.date }}</span>
    </div>
    <Swiper
      v-if="rendered ? news.image_url.length > 1 : true"
      class="news__swiper"
      :modules="modules"
      effect="coverflow"
      :centeredSlides="true"
      :slides-per-view="2"
      :space-between="50"
      :coverflowEffect="{
        rotate: 0,
        stretch: 0,
        depth: 400,
        modifier: 1,
        slideShadows: true
      }"
      :autoplay="{ delay: 10000, disableOnInteraction: false, pauseOnMouseEnter: true }"
      :pagination="{ clickable: true }"
    >
      <swiper-slide class="news__swiper-slide" v-for="slide in news.image_url" :key="slide">
        <img class="news__swiper-image" :src="slide" alt="" />
      </swiper-slide>
    </Swiper>
    <img v-else-if="news.image_url[0]" class="news__image" :src="news.image_url[0]" alt="" />
    <div
      class="news__text-content"
      :class="{ 'news__text-content--no-image': news.image_url?.length === 0 }"
    >
      <p
        class="news__paragraph"
        v-for="paragraph in news.description"
        :key="paragraph"
        v-html="paragraph"
      ></p>
    </div>
    <div>
      Источник:
      <a :href="news.url">{{ news.url }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import regionsService from '@/services/regionsService'
import type News from '@/types/newsType'
import type ResponseData from '@/types/responseData'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay, A11y, EffectCoverflow } from 'swiper'

import 'swiper/scss'
import 'swiper/scss/pagination'
import 'swiper/scss/autoplay'
import 'swiper/scss/effect-coverflow'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'NewsPage',
  components: { Swiper, SwiperSlide },
  setup() {
    const news = ref({} as News)
    const route = useRoute()
    const rendered = ref(false as boolean)
    const fetchNews = () => {
      regionsService.getNews(route.params.tableName, route.params.id).then((res: ResponseData) => {
        news.value = res.data[0]
        if (Object.keys(news.value.description).length > 3) {
          for (const [key] of Object.entries(news.value.description)) {
            if (news.value.description[key].replace(/(<br>)/gi, '').trim().length === 0) {
              delete news.value.description[key]
            }
          }
        } else if (Object.keys(news.value.description).length === 1) {
          if (news.value.description[0].replace(/(<br>)/gi, '').trim().length === 0) {
            delete news.value.description[0]
          } else if (
            news.value.description[0]
              .trim()
              .split('<br><br><br><br><br>')[0]
              .replace(/(<br>)/gi, '')
              .trim().length !== 0
          ) {
            news.value.description[0] = news.value.description[0]
              .trim()
              .split('<br><br><br><br><br>')[0]
          }
        }
        rendered.value = true
      })
    }

    onMounted(async () => {
      await fetchNews()
    })
    return {
      rendered,
      news,
      modules: [Pagination, Autoplay, A11y, EffectCoverflow]
    }
  }
})
</script>

<style lang="scss">
.news {
  width: 100%;

  &__title {
    font-size: 28px;

    margin-bottom: 8px;
  }

  &__image {
    display: block;
    float: left;

    margin-top: 20px;
    margin-right: 40px;
    margin-bottom: 10px;
    margin-left: 25%;

    width: 400px;

    cursor: pointer;
  }

  &__text-content {
    width: 50%;
    margin: 0 auto;
    margin-top: 50px;
    text-align: left;

    font-size: 24px;

    &--no-image {
      margin-top: 0;
    }
  }

  &__paragraph {
    margin-bottom: 30px;
  }

  &__date {
    span {
      text-transform: lowercase;
    }
  }

  &__list-item {
    width: 55%;
    margin: 0 auto;
    margin-bottom: 10px;
  }

  &__pagination {
    margin-top: 40px;
  }

  &__swiper {
    padding-bottom: 40px;
    width: 70%;

    .swiper-pagination-bullet-active {
      background-color: rgb(0 102 150);
    }
  }

  &__swiper-image {
    width: 100%;

    &:hover {
      cursor: pointer;
    }
  }

  &__swiper-slide {
    align-self: center;
  }
}
</style>
