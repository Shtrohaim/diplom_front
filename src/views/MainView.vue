<template>
  <div class="main content">
    <nav class="main__navigation">
      <figure class="main__news">
        <figcaption class="main__news-caption h_lg">Новости образования</figcaption>
        <ul class="main__news-list h_sm">
          <li class="main__news-list-item">
            <router-link
              class="main__news-card main__news-card--minobr"
              :to="{ name: 'region_news', params: { tableName: 'news_rus_mno' } }"
            >
              <h2 class="main__route">Министерство науки и высшего образования РФ</h2>
            </router-link>
          </li>
          <li class="main__news-list-item">
            <router-link
              class="main__news-card main__news-card--minpros"
              :to="{ name: 'region_news', params: { tableName: 'news_rus_minprof' } }"
            >
              <h2 class="main__route">Министерство просвещения РФ</h2>
            </router-link>
          </li>
          <li class="main__news-list-item">
            <router-link
              class="main__news-card main__news-card--regions"
              :to="{ name: 'regions_list' }"
            >
              <h2 class="main__route">Регионы</h2>
            </router-link>
          </li>
        </ul>
      </figure>
      <figure class="main__services">
        <figcaption class="main__services-caption h_lg">Информация и сервисы</figcaption>
        <ul class="main__services-list h_sm">
          <li class="main__services-list-item">
            <router-link
              class="main__services-card main__services-card--school"
              :to="{ name: 'school' }"
            >
              <div class="main__route main__route--with-tip">
                <v-tooltip text="Информация о гос. экзаменах">
                  <h2>Школьникам</h2>
                </v-tooltip>
              </div>
            </router-link>
          </li>
          <li class="main__services-list-item">
            <router-link
              class="main__services-card main__services-card--student"
              :to="{ name: 'students' }"
            >
              <div class="main__route main__route--with-tip">
                <v-tooltip text="Сервис по поиску научных публикаций">
                  <h2>Студентам</h2>
                </v-tooltip>
              </div>
            </router-link>
          </li>
        </ul>
      </figure>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VTooltip from '@/components/common/tooltip.vue'

export default defineComponent({
  name: 'MainPage',
  components: { VTooltip }
})
</script>

<style scoped lang="scss">
.main {
  &__news {
    display: flex;
    align-items: center;

    height: 300px;

    margin-bottom: 55px;

    @media (max-width: 1024px) {
      flex-direction: column;
      height: 340px;
    }

    @media (min-width: 641px) and (max-width: 1023px) {
      height: 300px;
    }

    @media (min-width: 320px) and (max-width: 640px) {
      height: 800px;
    }
  }

  &__news-list {
    display: flex;
    justify-content: space-around;

    width: 100%;
    height: 100%;

    @media (max-width: 1024px) {
      margin-top: 50px;
    }

    @media (min-width: 320px) and (max-width: 640px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  &__news-list-item {
    width: 32%;
    min-width: 200px;
    height: 100%;

    @media (max-width: 1024px) {
      min-width: 220px;
    }

    @media (min-width: 641px) and (max-width: 1023px) {
      min-width: 180px;
    }

    @media (min-width: 320px) and (max-width: 640px) {
      min-width: 250px;
    }
  }

  &__news-card {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    padding: 10px;

    text-align: center;

    border-radius: 2px;

    background-color: rgb(255 255 255);

    box-shadow: 0 0 12px rgb(0 0 0 / 0.5);
    cursor: pointer;

    background-repeat: no-repeat;
    background-position-x: center;

    @media (min-width: 320px) and (max-width: 640px) {
      height: 90%;
    }

    &--minobr {
      background-image: url('@/assets/images/minobr_icon.png');
      background-position-y: 20%;
      background-size: 53%;
    }

    &--minpros {
      background-image: url('@/assets/images/minpros_icon.png');
      background-position-y: 20%;
      background-size: 65%;
    }

    &--regions {
      background-size: 90%;
      background-position-y: 40%;
      background-image: url('@/assets/images/regions_icon.png');
    }

    &:hover {
      box-shadow: 0 0 25px rgb(0 0 0 / 0.5);
    }
  }

  &__route {
    position: absolute;
    bottom: 20px;
    right: 50%;

    width: 100%;

    transform: translateX(50%);

    padding-left: 10px;
    padding-right: 10px;

    color: $black;

    &--with-tip {
      width: auto;
    }
  }

  &__services {
    display: flex;
    align-items: center;

    height: 260px;
    width: 100%;

    text-align: center;

    @media (max-width: 1024px) {
      flex-direction: column;
      height: 310px;
    }

    @media (min-width: 641px) and (max-width: 1023px) {
      height: 270px;
    }

    @media (min-width: 320px) and (max-width: 640px) {
      height: 500px;
    }
  }

  &__services-list {
    display: flex;
    justify-content: center;

    height: 100%;
    width: 100%;

    @media (max-width: 1024px) {
      margin-top: 50px;
    }

    @media (min-width: 320px) and (max-width: 640px) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__services-list-item {
    width: 25%;
    min-width: 200px;
    height: 100%;

    margin: 10px;

    @media (max-width: 1024px) {
      min-width: 180px;
    }

    @media (min-width: 641px) and (max-width: 1023px) {
      min-width: 140px;
    }

    @media (min-width: 320px) and (max-width: 640px) {
      min-width: 210px;
    }
  }

  &__services-card {
    position: relative;
    display: block;

    width: 100%;
    height: 100%;

    border-radius: 2px;

    background-color: rgb(255 255 255);

    box-shadow: 0 0 12px rgb(0 0 0 / 0.5);
    cursor: pointer;

    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: 25%;
    background-size: 60%;

    &--school {
      background-image: url('@/assets/images/school.png');
    }

    &--student {
      background-image: url('@/assets/images/student.png');
    }

    &:hover {
      box-shadow: 0 0 25px rgb(0 0 0 / 0.5);
    }
  }
}
</style>
