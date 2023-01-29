<template>
  <div class="about">
    <p v-html=""></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type {AxiosInstance} from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    a: { id: number, title: string, description: string[], image_url: string[], date: string } []
  }
}

export default defineComponent({
    name:'RegionsList',
    data() {
        return {
            a: [] as { id: number, title: string, description: string[], image_url: string[], date: string } [],
            displayStart: 0,
            displayCount: 5,
            activeTag: '',
            catImage: 'Cat <br> here!',
        };
    },
    methods:{
        async fetchCatTags() {
            const newsResponse = await this.$axios.get(`/api/table/${this.$route.params.tableName}`)
            this.a = newsResponse.data
            console.log(this.a)
        }
    },
    async mounted() {
        await this.fetchCatTags()
    },
})

</script>