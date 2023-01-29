<template>
    <div class="regions">
        <ul class="regions__list">
            <li v-for="region in catTags" :key="region.id" class="regions__list-item">
                <div class="region-card" @click="$router.push({ name: 'region_news', params: {tableName: region.tableName}  });">
                    <img :src="`http://localhost:3000/img/${region.img}`" width="100" :alt="`Герб ${region.name}`"  />
                    <h3>{{ region.name }}</h3>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type {AxiosInstance} from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    catTags: { id: number, name: string, img: string, tableName: string } []
  }
}

export default defineComponent({
    name:'RegionsList',
    data() {
        return {
            catTags: [] as { id: number, name: string, img: string, tableName: string } [],
            displayStart: 0,
            displayCount: 5,
            activeTag: '',
            catImage: '',
        };
    },
    methods:{
        async fetchCatTags() {
            const tagsResponse = await this.$axios.get('/api/allRegions')
            this.catTags = tagsResponse.data
        }
    },
    async mounted() {
        await this.fetchCatTags()
    },
})

</script>