<template>
  <div class="regions content">
    <input
      class="regions__search-bar"
      type="text"
      v-model="search"
      placeholder="Республика Хакасия"
    />
    <loading-screen v-if="isLoading" />
    <ul v-else class="regions__list">
      <li v-for="region in filteredRegions" :key="region.id" class="regions__list-item">
        <region-card :region="region" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import RegionCard from '@/components/RegionCard.vue'
import type Regions from '@/types/regionsType'
import regionsServices from '@/services/regionsService'
import type ResponseData from '@/types/responseData'
import LoadingScreen from '@/components/common/loading.vue'

export default defineComponent({
  name: 'RegionsListPage',
  components: {
    LoadingScreen,
    RegionCard
  },
  setup() {
    const regions = ref([] as Regions[])
    const search = ref('')
    const isLoading = ref(true)
    const fetchRegions = () => {
      regionsServices.getAllRegions().then((response: ResponseData) => {
        regions.value = response.data
        isLoading.value = false
      })
    }

    const filteredRegions = computed(() => {
      return regions.value.filter((p: Regions) => {
        return p.name.toLowerCase().indexOf(search.value.toLowerCase()) != -1
      })
    })

    onMounted(async () => {
      isLoading.value = true
      await fetchRegions()
    })
    return { filteredRegions, search, isLoading }
  }
})
</script>

<style lang="scss">
.regions {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__search-bar {
    width: 30%;
    height: 30px;

    margin-bottom: 25px;

    border-radius: 100px;
    border-color: rgb(0 102 150);

    text-align: center;

    &::placeholder {
      font-weight: bold;
      opacity: 0.4;
      text-align: center;
    }
  }

  &__list {
    columns: 4 300px;
    column-width: 300px;
  }

  &__list-item {
    margin: 0 auto;
    width: 310px;
    margin-bottom: 15px;
  }
}
</style>
