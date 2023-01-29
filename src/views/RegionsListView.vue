<template>
      <RegionsList />
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import RegionsList from '@/components/RegionsList.vue';
  
  export default defineComponent({
    name: 'RegionsListView',
    components: {
        RegionsList,
    },
  });
  </script>
  