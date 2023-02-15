<template>
    <div class="news">
      <div class="news__filter">
        <form class="news__form" :onSubmit="search">
          <input ref="searchInput" class="news__search" type="text" placeholder="Искать..." />
          <button class="news__form-button"></button>
        </form>
        <div v-if="$route.query.search" @click="dropSearch" class="news__drop-search">Сбросить поиск <span></span></div>
      </div>
      <loading-screen v-if="loading" />
      <ul v-else-if="data[0]" class="news__list">
        <li v-for="news in data" :key="news.id" class="news__list-item">
            <news-card :news="news" />
        </li>
      </ul>
      <div class="news__not-found" v-else>
        <p>По вашему запросу {{$route.query.search  }}, ничего не найдено.</p>
      </div>
      <my-pagination ref="pagination" class="news__pagination" @pagination='onPagination' :isStartPagination="true" :totalPages="totalPages" />
    </div>
</template>
  
<script lang="ts">
  import { defineComponent } from 'vue'
  import regionsService from '@/services/regionsService';
  import NewsList from '@/types/newsListType'
  import ResponseData from '@/types/responseData';
  import NewsCard from '@/components/NewsCard.vue'
  import MyPagination from './common/pagination.vue';
  import LoadingScreen from './common/loading.vue'
  
  export default defineComponent({
      name:'RegionsList',
      components: { NewsCard, MyPagination, LoadingScreen },
      data() {
          return {
              data: [] as NewsList [],
              page: 1 as number,
              size: 10 as number,
              totalPages: [] as number [],
              loading : true as boolean,
              searchText: "" as string,
              isDroped: false as boolean,
          };
      },
      methods:{
        scrollView() {
            window.scrollTo({
              top: 0,
              behavior: "smooth"
          })
        },
        search(e : Event) {
          e.preventDefault();
          if((this.$refs['searchInput'] as HTMLFormElement).value.trim()){
            this.searchText = (this.$refs['searchInput'] as HTMLFormElement).value.trim()
            this.$router.push({query: {search: this.searchText}})
            if(this.page != 1) {
              this.page = 1;
              (this.$refs['pagination'] as HTMLFormElement).page = 1;
            }else{ this.fetchNewsList(); }

            (this.$refs['searchInput'] as HTMLFormElement).value = ""
            
          }else{
            (this.$refs['searchInput'] as HTMLFormElement).focus()
          }
        
        },
        dropSearch(){
          this.$router.push(this.$route.path);
          this.searchText = ""
          this.isDroped = true
          if(this.page != 1) {
              this.page = 1;
              (this.$refs['pagination'] as HTMLFormElement).page = 1;
          }else{
            this.fetchNewsList();
          }
        },
        onPagination (data : {nextPage: number}) {
          this.page = data.nextPage;
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
          let search = this.$route.query.search && this.searchText === "" && !this.isDroped ? this.$route.query.search : this.searchText
          return regionsService.getRegion(this.$route.params.tableName, this.size, this.page, search).then((res: ResponseData) => {
            this.data = res.data.news
            this.loading = false;
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

    span:before, span:after {
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
    background-image: url('@/assets/search.svg');
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

  &__pagination{
    margin-top: 40px;
  }
}
</style>