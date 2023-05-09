<template>
  <div class="news content">
    <div class="news__filter">
      <base-search class="news__search" />
    </div>
    <loading-screen v-if="isLoading" />
    <ul v-else-if="news[0]" class="news__list">
      <li v-for="item in news" :key="item.id" class="news__list-item">
        <news-card :news="item" />
      </li>
    </ul>
    <div class="news__not-found" v-else>
      <p>По вашему запросу {{ route.query.search }}, ничего не найдено.</p>
    </div>
    <my-pagination
      class="news__pagination"
      @pagination="onPagination"
      :page="currentPage"
      :totalPages="totalPages"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import regionsService from '@/services/regionsService'
import type NewsList from '@/types/newsListType'
import type ResponseData from '@/types/responseData'
import NewsCard from '@/components/NewsCard.vue'
import MyPagination from '@/components/common/pagination.vue'
import LoadingScreen from '@/components/common/loading.vue'
import { useRoute } from 'vue-router'
import BaseSearch from '@/components/common/search.vue'

export default defineComponent({
  name: 'NewsListPage',
  components: {
    BaseSearch,
    NewsCard,
    MyPagination,
    LoadingScreen
  },
  setup() {
    const news = ref([] as NewsList[])
    const size = 10 as number
    const currentPage = ref(1)
    const totalPages = ref(1)
    const isLoading = ref(true)
    let isDropped = false

    const route = useRoute()

    const fetchNewsList = () => {
      let tableName = route.params.tableName
      let page = currentPage.value
      let qSearch = String(route.query.search).trim()
      let search = route.query.search && qSearch.length !== 0 && !isDropped ? qSearch : ''
      return regionsService
        .getRegion({ tableName, size, page, search })
        .then((res: ResponseData) => {
          news.value = res.data.news
          isLoading.value = false
          totalPages.value = res.data.totalPages
        })
    }

    const onPagination = (data: { nextPage: number }) => {
      currentPage.value = data.nextPage
      isLoading.value = true
      fetchNewsList()
    }
    return {
      onPagination,
      isLoading,
      totalPages,
      currentPage,
      route,
      news
    }
  }
})
</script>

<style lang="scss">
.news {
  &__list-item {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto 10px;

    @media (max-width: 1024px) {
      max-width: 800px;
    }

    @media (min-width: 641px) and (max-width: 1023px) {
      max-width: 650px;
    }

    @media (min-width: 320px) and (max-width: 640px) {
      height: 180px;
    }
  }

  &__filter {
    width: 100%;

    margin: 0 auto 40px;

    @media (min-width: 320px) and (max-width: 640px) {
      .search__bar {
        transform: translateX(25%);
      }
    }
  }

  &__not-found {
    display: flex;
    height: 70vh;
    justify-content: center;
    align-items: center;
  }

  &__pagination {
    margin-top: 40px;
  }
}
</style>
