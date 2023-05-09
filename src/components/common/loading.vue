<template>
  <div class="loading"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoadingScreen'
})
</script>

<style lang="scss">
.loading {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid rgb(72 110 242);
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  margin: 10vh auto 190vh;

  @media (min-width: 320px) and (max-width: 769px) {
    border: 8px solid #f3f3f3;
    border-top: 8px solid rgb(72 110 242);
    width: 60px;
    height: 60px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
