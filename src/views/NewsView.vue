<template>
    <news-page />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NewsPage from '@/components/News.vue';

export default defineComponent({
  name: 'NewsView',
  components: {
      NewsPage,
  },
});
</script>
