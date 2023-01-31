<template>
    <div class="news">
      <ul class="news__list">
        <li v-for="news in data" :key="news.id" class="news__list-item">
            <news-card :news="news" />
        </li>
      </ul>
      <div class="pagination">
        <button class="pagination__button pagination__button--begin" :class="firstPageClass" type="button" @click="pagination(1)"></button>
        <button class="pagination__button pagination__button--back" :class="firstPageClass" type="button" @click="pagination(page - 1)"></button>
        <ul class="pagination__page-list">
          <li v-for="n in filteredItems" :key="n" class="pagination__page" :class="paginationClass(n)" @click="pagination(n)">{{ n }}</li>
        </ul>
        <button class="pagination__button pagination__button--forward" :class="lastPageClass" type="button" @click="pagination(page + 1)"></button>
        <button class="pagination__button pagination__button--end" :class="lastPageClass" type="button" @click="pagination(totalPages[totalPages.length - 1])"></button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import regionsService from '@/services/regionsService';
  import News from '@/types/newsType'
  import ResponseData from '@/types/responseData';
  import NewsCard from '@/components/NewsCard.vue'
  
  export default defineComponent({
      name:'RegionsList',
      components: { NewsCard },
      data() {
          return {
              data: [] as News [],
              page: 1 as number,
              size: 10 as number,
              totalPages: [] as number [],
          };
      },
      methods:{
          pagination(n : number){
            if(n !== this.page && (n > 0 && n <= this.totalPages[this.totalPages.length - 1])){
              this.page = n > this.totalPages[this.totalPages.length - 1] ? this.totalPages[this.totalPages.length - 1] : n < 1 ? 1 : n;
              window.scrollTo(0,0)
              this.fetchNews()
            }
          },
          getAllPagesList(pages: number) {
          let newPages = [] as number [];
          for(let n = 1; n <= pages; n++){
              newPages.push(n);
          }
          this.totalPages = newPages
          },
          fetchNews() {
            return regionsService.getRegion(this.$route.params.tableName, this.size, this.page).then((data: ResponseData) => {
              this.data = data.data.news
              this.page = this.page > data.data.totalPages ? 1 : this.page
              this.getAllPagesList(data.data.totalPages)
            })
          },
          paginationClass(pageNumber : number ) : string {
            return this.page === pageNumber ? 'pagination__page--active' : ''
          },
      },
      computed: {
        filteredItems() : any {
          let begin = 0; 
          let step = 6;
          let end = step;
          if(this.page - 1 > 1 && this.page + 2 < this.totalPages[this.totalPages.length - 1]){
            begin = this.page - step / 2;
            end = this.page + step / 2;
          }else if(this.page - 1 <= 1){
            begin = 0
            end = step
          }else if(this.page + 2 >= this.totalPages[this.totalPages.length - 1]){
            begin = this.totalPages[this.totalPages.length - 1] - step >= 0 ? this.totalPages[this.totalPages.length - 1] - step : 0
            end = this.totalPages[this.totalPages.length - 1]
          }
          return this.totalPages.slice(begin, end)
        }, 
        firstPageClass() : string {
            return this.page === 1 ? 'pagination__button--disabled' : ''
        },
        lastPageClass() : string {
          return this.page === this.totalPages[this.totalPages.length - 1] ? 'pagination__button--disabled' : ''
        },
      },
      mounted() {
        if(localStorage.page && localStorage.pageName === this.$route.params.tableName) this.page = Number(localStorage.page);
        this.fetchNews()
      },
      watch:{
        page(newPage) {
          localStorage.page = newPage;
        },
    },
  })
  
  </script>

<style lang="scss">
.news {
  &__list-item {
    width: 55%;
    margin: 0 auto;
    margin-bottom: 10px;
  }
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;

  &__page-list {
    display: flex;
  }

  &__page{
    height: 40px;

    text-align: center;

    margin-right: 10px;
    padding-top: 3px;
    padding-left: 10px;
    padding-right: 10px;

    border: 4px solid rgb(1, 1, 121);
    border-radius: 1000px;

    font-size: 22px;
    font-weight: bold;

    color: rgb(255 255 255);
    background: rgb(1 1 255);

    &:hover{
      cursor: pointer;
    }

    &--active {
      color: rgb(1 1 255);
      background: rgb(255 255 255);

      &:hover {
        cursor:default;
      }
    }
    
  }

  &__button {
    position: relative;
    width: 40px;
    height: 40px;
    
    border: none;

    background: rgb(1 1 255);

    mask-repeat: no-repeat;
    mask-position: center;

    &:hover{
      cursor: pointer;
    }

    &--disabled {
      background-color: rgb(160, 160, 160);

      &:hover{
        cursor: default;
      }
    }

    &--forward {
      mask-image: url('@/assets/arrow_enable.svg');
      mask-size: 18px;
    }

    &--end {
      mask-image: url('@/assets/double_arrow_enable.svg');
      mask-size: 35px;
    }

    &--back {
      mask-image: url('@/assets/arrow_enable.svg');
      transform: scale(-1, 1);
      mask-size: 18px;
    }

    &--begin {
      mask-image: url('@/assets/double_arrow_enable.svg');
      transform: scale(-1, 1);
      mask-size: 35px;
    }
  }
}
</style>