<template>
  <scopus-list />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ScopusList from '@/components/StudentsScopusList.vue'

export default defineComponent({
  name: 'ScopusListView',
  components: {
    ScopusList
  }
})
</script>
