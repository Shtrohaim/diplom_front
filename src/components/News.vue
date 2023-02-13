<template>
    <div class="news">
       <h1 class="news__title">{{ data.title }}</h1> 
       <div class="news__date">Дата публикации: <span>{{ data.date }}</span></div>
       <Swiper
          v-if="checkImage"
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
            slideShadows: true,
          }"
          :autoplay="{delay: 10000, disableOnInteraction: false, pauseOnMouseEnter: true}"
          :pagination="{ clickable: true }"
       >
        <swiper-slide class="news__swiper-slide" v-for="slide in data.image_url" :key="slide" >
          <img class="news__swiper-image" :src="slide" @click="openImage(slide)" alt="">
        </swiper-slide>
       </Swiper>
       <img v-else-if="data.image_url[0]" class="news__image" :src="data.image_url[0]" @click="openImage(data.image_url[0])" />
       <div class="news__text-content" :class="noImageTextClass">
        <p class="news__paragraph" v-for="paragraph in data.description" :key="paragraph" v-html="paragraph"></p>
       </div>
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

  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination, Autoplay, A11y, EffectCoverflow } from 'swiper';

  import 'swiper/scss';
  import 'swiper/scss/pagination';
  import 'swiper/scss/autoplay';
  import 'swiper/scss/effect-coverflow'
  
  export default defineComponent({
      name:'NewsPage',
      components:{ Swiper, SwiperSlide },
      setup() {
        return {
          modules: [Pagination, Autoplay ,A11y, EffectCoverflow],
        };
      },
      data() {
          return {
              data: {} as News ,
              page: 1 as number,
              size: 10 as number,
              totalPages: [] as number [],
              rendered: false as boolean,
          };
      },
      methods:{
        fetchNews(){
            regionsService.getNews(this.$route.params.tableName, this.$route.params.id).then((res : ResponseData) => {
                this.data = res.data[0] 
                if (Object.keys(this.data.description).length > 3) {
                    for(const [key] of Object.entries(this.data.description)) {
                      if(this.data.description[key].replace(/(<br>)/gi, "").trim().length === 0){
                        delete this.data.description[key]
                      }
                    }
                }else if (Object.keys(this.data.description).length === 1){
                  if(this.data.description[0].replace(/(<br>)/gi, "").trim().length === 0){
                    delete this.data.description[0]
                  }else if(this.data.description[0].trim().split("<br><br><br><br><br>")[0].replace(/(<br>)/gi, "").trim().length !== 0){
                    this.data.description[0] = this.data.description[0].trim().split("<br><br><br><br><br>")[0]
                  }
                }
                this.rendered = true
            })
        }, 
        openImage(url : string){
          window.open(url, "_blank")
        },
      },
      computed: {
        checkImage () : boolean {
          return this.rendered ? (this.data.image_url.length > 1 ? true : false) : true
        },
        noImageTextClass() : string {
          return this.rendered ? (this.data.image_url.length === 0 ? "news__text-content--no-image" : "") : ""
        }
      },
      mounted(){
        this.fetchNews()
      }
  })
  
</script>

<style lang="scss">
.news {
  width: 100%;

  &__title{
    font-size: 28px;

    margin-bottom: 8px;
  }

  &__image{
    display: block;
    float:left;

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

  &__pagination{
    margin-top: 40px;
  }

  &__swiper{
    padding-bottom: 40px;
    width: 70%;

    .swiper-pagination-bullet-active{
      background-color:rgb(0 102 150);
    }
  }

  &__swiper-image{
    width: 100%;

    &:hover{
      cursor: pointer;
    }
  }

  &__swiper-slide{
    align-self: center;
  }
}
</style>