<template>
  <div class="main">
    <nav class="main__navigation">
      <figure class="main__news">
        <figcaption class="main__news-caption">Новости образования</figcaption>
        <ul class="main__news-list">
          <li class="main__news-list-item main__news-list-item--minobr" @click="$router.push({ path: '/news/news_rus_mno'})">
            <h2 class="main__route">Министерство науки и высшего образования РФ</h2>
          </li>
          <li class="main__news-list-item main__news-list-item--minpros" @click="$router.push({ path: '/news/news_rus_minprof'})">
            <h2 class="main__route">Министерство просвещения РФ</h2> 
          </li>
          <li class="main__news-list-item main__news-list-item--regions" @click="$router.push({ path: '/regions_list'})">
            <h2 class="main__route">Регионы</h2> 
          </li>
        </ul>
      </figure>
      <figure class="main__services">
        <figcaption class="main__services-caption">Информация и сервисы</figcaption>
        <ul class="main__services-list">
          <li class="main__services-list-item main__services-list-item--school" @click="$router.push({ path: '/school'})">
            <h2 class="main__route">Школьникам</h2> 
          </li>
          <li class="main__services-list-item main__services-list-item--student" @click="$router.push({ path: '/students'})">
            <h2 class="main__route">Студентам</h2>
          </li>
        </ul>
      </figure>
    </nav>  
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainPage',
});
</script>

<style scoped lang="scss">
  .main {
    &__news {
      display: flex;
      align-items: center;

      height: 320px;

      margin-bottom: 55px;
    }

    &__news-caption {
      font-size: 36px;
    }

    &__news-list {
      display: flex;
      height: 100%;
    }

    &__news-list-item {
      position: relative;

      width: 360px;
      height: 100%;

      margin-left: 20px;
      border-radius: 2px;

      background-color: rgb(255 255 255);

      box-shadow: 0 0 12px rgb(0 0 0 / 0.5);
      cursor: pointer;

      background-repeat: no-repeat;
      background-position-x: center;

      &--minobr {
        background-image: url('@/assets/minobr_icon.png');
        background-size: 220px;
        background-position-y: 10px;
      }

      &--minpros {
        background-image: url('@/assets/minpros_icon.png');
        background-position-y: 20px;
        background-size: 250px;
      }

      &--regions {
        background-size: 330px;
        background-position-y: 55px;
        background-image: url('@/assets/regions_icon.png');
      }

      &:hover{
          box-shadow: 0 0 25px rgb(0 0 0 / 0.5);
        }
    }

    &__route {
      position: absolute;
      bottom: 20px;
      right: 50%;

      transform: translateX(50%);

      font-size: 18px;
      width: 300px;
    }

    &__services {
        display: flex;
        align-items: center;

        height: 250px;
        width: 100%;
    }

    &__services-caption {
      font-size: 32px;
    }

    &__services-list {
      display: flex;
      justify-content: center;
      height: 100%;
      width: 100%;
    }

    &__services-list-item {
      position: relative;

      width: 340px;
      height: 100%;

      margin-left: 20px;
      border-radius: 2px;

      background-color: rgb(255 255 255);

      box-shadow: 0 0 12px rgb(0 0 0 / 0.5);
      cursor: pointer;

      background-repeat: no-repeat;
      background-position-x: center;

      &--school {
        background-image: url('@/assets/school.png');
        background-size: 180px;
        background-position-y: 20px;
      }

      &--student {
        background-image: url('@/assets/student.png');
        background-position-y: 15px;
        background-size: 190px;
      }

      &:hover{
            box-shadow: 0 0 25px rgb(0 0 0 / 0.5);
        }
    }
  }
</style>
