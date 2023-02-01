<template>
    <div class="news">
       <h1>{{ data.title }}</h1> 
       <div>{{ data.date }}</div>
       <p v-for="paragraph in data.description" :key="paragraph" v-html="paragraph"></p>
        <div>Источник: 
            <a :href="data.url">{{ data.url }}</a>
        </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import regionsService from '@/services/regionsService';
  import News from '@/types/newsType'
  import ResponseData from '@/types/responseData';
  
  export default defineComponent({
      name:'NewsPage',
      data() {
          return {
              data: {} as News ,
              page: 1 as number,
              size: 10 as number,
              totalPages: [] as number [],
          };
      },
      methods:{
        fetchNews(){
            regionsService.getNews(this.$route.params.tableName, this.$route.params.id).then((res : ResponseData) => {
                this.data = res.data[0] 
            })
        }
      },
      mounted(){
        this.fetchNews()
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
}
</style>