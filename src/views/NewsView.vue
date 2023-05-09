<template>
  <div class="news content">
    <h3 class="news__title h_lg">{{ news.title }}</h3>
    <div class="news__date p_sm">
      Дата публикации: <span>{{ news.date }}</span>
    </div>
    <Swiper
      v-if="rendered ? news.image_url.length > 1 : true"
      class="news__swiper"
      :modules="modules"
      effect="coverflow"
      :centeredSlides="true"
      :slides-per-view="changeSlides"
      :space-between="50"
      :coverflowEffect="{
        rotate: 0,
        stretch: 0,
        depth: 500,
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
        class="news__paragraph p_md"
        v-for="paragraph in news.description"
        :key="paragraph"
        v-html="paragraph"
      ></p>
    </div>
    <div class="news__source p_md">
      Источник:
      <a :href="news.url">{{ news.url }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
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

    const changeSlides = computed(() => {
      return window.innerWidth <= 769 ? 1 : 2
    })
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
      changeSlides,
      modules: [Pagination, Autoplay, A11y, EffectCoverflow]
    }
  }
})
</script>

<style lang="scss" scoped>
.news {
  width: 100%;

  &__title {
    text-align: center;
    margin: 0 auto 8px;
  }

  &__image {
    display: block;
    float: left;

    margin: 40px 40px 10px 15%;

    width: 35%;
    max-width: 400px;
    min-width: 200px;

    cursor: pointer;

    @media (min-width: 641px) and (max-width: 1023px) {
      margin: 50px 20px 0 10%;
      width: 30%;
    }

    @media (min-width: 320px) and (max-width: 640px) {
      float: none;
      margin: 20px auto 0;
    }
  }

  &__text-content {
    width: 70%;
    margin: 50px auto 0;
    text-align: left;

    @media (min-width: 641px) and (max-width: 1023px) {
      width: 80%;
    }

    @media (min-width: 320px) and (max-width: 640px) {
      width: 90%;
      margin-top: 20px;
      overflow-wrap: anywhere;
    }

    &--no-image {
      margin-top: 0;
    }
  }

  &__paragraph {
    margin-bottom: 30px;
  }

  &__date {
    text-align: center;
    span {
      text-transform: lowercase;
    }
  }

  &__list-item {
    width: 55%;
    margin: 0 auto 10px;
  }

  &__pagination {
    margin-top: 40px;
  }

  &__swiper {
    padding-bottom: 40px;

    margin-top: 40px;

    width: 70%;

    @media (min-width: 320px) and (max-width: 640px) {
      width: 100%;
    }

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

  &__source {
    text-align-last: end;
    overflow-wrap: anywhere;
  }
}
</style>
