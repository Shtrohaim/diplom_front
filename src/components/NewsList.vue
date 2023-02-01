<template>
    <div class="news">
      <div v-if="loading" class="news__loading">
        Загрузка...
      </div>
      <ul v-else class="news__list">
        <li v-for="news in data" :key="news.id" class="news__list-item">
            <news-card :news="news" />
        </li>
      </ul>
      <my-pagination class="news__pagination" @pagination='onPagination' :totalPages="totalPages" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import regionsService from '@/services/regionsService';
  import NewsList from '@/types/newsListType'
  import ResponseData from '@/types/responseData';
  import NewsCard from '@/components/NewsCard.vue'
  import MyPagination from './common/pagination.vue';
  
  export default defineComponent({
      name:'RegionsList',
      components: { NewsCard, MyPagination },
      data() {
          return {
              data: [] as NewsList [],
              page: 1 as number,
              size: 10 as number,
              totalPages: [] as number [],
              loading : true as boolean,
          };
      },
      methods:{
        scrollView() {
            window.scrollTo({
              top: 0,
              behavior: "smooth"
          })
        },
        onPagination (data : {page: number}) {
          this.page = data.page;
          this.loading = true;
          this.fetchNewsList();
          this.scrollView();
        },
        getAllPagesList(pages: number) {
          let newPages = [] as number [];
          for(let n = 1; n <= pages; n++){
              newPages.push(n);
          }
          this.totalPages = newPages
        },
        fetchNewsList() {
          return regionsService.getRegion(this.$route.params.tableName, this.size, this.page).then((res: ResponseData) => {
            this.data = res.data.news
            this.loading = false;
            this.page = this.page > res.data.totalPages ? 1 : this.page
            this.getAllPagesList(res.data.totalPages)
          })
        },
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

  &__pagination{
    margin-top: 40px;
  }

  &__loading{
    height: 200vh;
  }
}
</style>