<template>
    <div class="news">
      <ul class="news__list">
        <li v-for="news in data.reverse()" :key="news.id" class="news__list-item">
            <news-card :news="news" />
        </li>
      </ul>
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
          };
      },
      methods:{
           fetchNews() {
              return regionsService.getRegion(this.$route.params.tableName).then((data: ResponseData) => {
                this.data = data.data
              })
          }
      },
       mounted() {
          this.fetchNews()
      },
  })
  
  </script>