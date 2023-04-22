<template>
  <div class="main">
    <nav class="main__navigation">
      <figure class="main__news">
        <figcaption class="main__news-caption">Новости образования</figcaption>
        <ul class="main__news-list">
          <li class="main__news-list-item main__news-list-item--minobr">
            <router-link :to="{ name: 'region_news', params: { tableName: 'news_rus_mno' } }">
              <h2 class="main__route">Министерство науки и высшего образования РФ</h2>
            </router-link>
          </li>
          <li class="main__news-list-item main__news-list-item--minpros">
            <router-link :to="{ name: 'region_news', params: { tableName: 'news_rus_minprof' } }">
              <h2 class="main__route">Министерство просвещения РФ</h2>
            </router-link>
          </li>
          <li class="main__news-list-item main__news-list-item--regions">
            <router-link :to="{ name: 'regions_list' }">
              <h2 class="main__route">Регионы</h2>
            </router-link>
          </li>
        </ul>
      </figure>
      <figure class="main__services">
        <figcaption class="main__services-caption">Информация и сервисы</figcaption>
        <ul class="main__services-list">
          <li class="main__services-list-item main__services-list-item--school">
            <router-link :to="{ name: 'school' }">
              <h2 class="main__route">Школьникам</h2>
            </router-link>
          </li>
          <li class="main__services-list-item main__services-list-item--student">
            <router-link :to="{ name: 'students' }">
              <h2 class="main__route">Студентам</h2>
            </router-link>
          </li>
        </ul>
      </figure>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainPage'
})
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

    text-align: center;

    margin-left: 20px;
    border-radius: 2px;

    background-color: rgb(255 255 255);

    box-shadow: 0 0 12px rgb(0 0 0 / 0.5);
    cursor: pointer;

    background-repeat: no-repeat;
    background-position-x: center;

    &--minobr {
      background-image: url('@/assets/images/minobr_icon.png');
      background-size: 220px;
      background-position-y: 10px;
    }

    &--minpros {
      background-image: url('@/assets/images/minpros_icon.png');
      background-position-y: 20px;
      background-size: 250px;
    }

    &--regions {
      background-size: 330px;
      background-position-y: 55px;
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

    transform: translateX(50%);

    font-size: 18px;
    width: 300px;
  }

  &__services {
    display: flex;
    align-items: center;

    height: 250px;
    width: 100%;

    text-align: center;
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
      background-image: url('@/assets/images/school.png');
      background-size: 180px;
      background-position-y: 20px;
    }

    &--student {
      background-image: url('@/assets/images/student.png');
      background-position-y: 15px;
      background-size: 190px;
    }

    &:hover {
      box-shadow: 0 0 25px rgb(0 0 0 / 0.5);
    }
  }
}
</style>
