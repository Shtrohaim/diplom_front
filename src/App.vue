<template>
  <site-header />
  <router-view :key="$route.fullPath" />
  <div class="page-top" v-show="scY > 300" @click="goToTop()" title="На вверх страницы"></div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import SiteHeader from "@/components/Header.vue"

  export default defineComponent({
    components:{
      SiteHeader,
    },
    data() {
      return {
        scTimer: 0,
        scY: 0,
      }
    },
    methods:{
      handleScroll() {
        if (this.scTimer) return;
        this.scTimer = setTimeout(() => {
          this.scY = window.scrollY;
          clearTimeout(this.scTimer);
          this.scTimer = 0;
        }, 100);
      },
      goToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
  });
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: rgba(210 210 210 / 10%);
  color: #2c3e50;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

li {
  list-style-type: none;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.page-top{
  position: fixed;
  bottom: 20px;
  right: 10px;

  width: 55px;
  height: 55px;

  border-radius: 50%;

  background-color: #486ef2;

  background-image: url('@/assets/top_icon.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50px;

  box-shadow: 0 3px 15px #000;

  cursor: pointer;

  &:hover {
    opacity: 90%;
  }
}
</style>
