<template>
  <div class="news">
    <div class="news__filter">
      <form class="news__form" @submit="search">
        <input ref="searchInput" class="news__search" type="text" placeholder="Искать..." />
        <button class="news__form-button"></button>
      </form>
      <div v-if="$route.query.search" @click="dropSearch" class="news__drop-search">
        Сбросить поиск <span></span>
      </div>
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
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'NewsListPage',
  components: { NewsCard, MyPagination, LoadingScreen },
  setup() {
    const news = ref([] as NewsList[])
    const size = 10 as number
    const currentPage = ref(1)
    const totalPages = ref(1)
    const isLoading = ref(true)
    let isDropped = false

    const route = useRoute()
    const router = useRouter()

    const searchInput = ref()

    const fetchNewsList = () => {
      let tableName = route.params.tableName
      let page = currentPage.value
      let qSearch = String(route.query.search).trim()
      let search =
        route.query.search && qSearch.length !== 0 && searchInput.value.value === '' && !isDropped
          ? qSearch
          : searchInput.value.value.trim()
      return regionsService
        .getRegion({ tableName, size, page, search })
        .then((res: ResponseData) => {
          news.value = res.data.news
          isLoading.value = false
          totalPages.value = res.data.totalPages
        })
    }

    const search = (event: any) => {
      event.preventDefault()
      if (searchInput.value.value.trim()) {
        router.push({ query: { search: searchInput.value.value.trim() } })
        if (currentPage.value != 1) {
          currentPage.value = 1
        } else {
          fetchNewsList()
        }

        searchInput.value = ''
      } else {
        searchInput.value.focus()
      }
    }

    const onPagination = (data: { nextPage: number }) => {
      currentPage.value = data.nextPage
      isLoading.value = true
      fetchNewsList()
    }

    const dropSearch = () => {
      router.push(route.path)
      isDropped = true
      if (currentPage.value != 1) {
        currentPage.value = 1
      } else {
        fetchNewsList()
      }
    }
    return {
      dropSearch,
      onPagination,
      searchInput,
      search,
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
    width: 55%;
    margin: 0 auto;
    margin-bottom: 10px;
  }

  &__filter {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 40px;
  }

  &__form {
    position: relative;
    margin-right: 10px;
    width: 25%;
  }

  &__search {
    width: 100%;
    height: 35px;

    border-radius: 100px;
    border-color: rgb(0 102 150);

    text-align: center;

    &::placeholder {
      font-weight: bold;
      opacity: 0.4;
      text-align: center;
    }
  }

  &__drop-search {
    position: relative;
    display: inline-block;

    padding: 15px;
    padding-right: 35px;

    border-radius: 25px;

    background-color: rgb(72 110 242);
    color: rgb(255 255 255);

    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }

    span {
      position: absolute;
      right: 15px;
      top: 15px;
      width: 10px;
      height: 10px;
    }

    span:before,
    span:after {
      position: absolute;
      content: ' ';
      height: 16px;
      width: 2px;
      background-color: rgb(255 255 255);
    }
    span:before {
      transform: rotate(45deg);
    }
    span:after {
      transform: rotate(-45deg);
    }
  }

  &__form-button {
    position: absolute;
    top: 3px;
    right: 12px;

    border-radius: 8px;
    border: 0 solid;

    width: 30px;
    height: 30px;

    background-color: rgba(210 210 210 / 0);
    background-image: url('@/assets/images/search.svg');
    background-repeat: no-repeat;
    background-size: 70%;
    background-position: center;

    &:hover {
      background-color: rgba(210 210 210 / 20%);
      cursor: pointer;
    }
  }

  &__not-found {
    display: flex;
    height: 70vh;
    justify-content: center;
    align-items: center;

    font-size: 26px;
  }

  &__pagination {
    margin-top: 40px;
  }
}
</style>
