<template>
  <div class="school-page content">
    <nav class="school-page__nav">
      <ul class="school-page__list">
        <li
          class="school-page__list-item p_sm"
          :class="{ 'school-page__list-item--active': item.title === this.propData.title }"
          v-for="item in data"
          :key="item.id"
          @click="tabulation(item)"
        >
          {{ item.title }}
        </li>
      </ul>
    </nav>
    <school-info class="school-page__info" v-if="hasInfo" :data="propData" />
    <school-subjects class="school-page__subjects" v-else :data="propData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import type SchoolData from '@/types/schoolDataType'
import schoolService from '@/services/schoolService'
import SchoolInfo from '@/components/SchoolInfo.vue'
import SchoolSubjects from '@/components/SchoolSubjects.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'SchoolPage',
  components: {
    SchoolInfo,
    SchoolSubjects
  },
  setup() {
    const data = ref([] as SchoolData[])
    const hasInfo = ref(true)
    const propData = ref({} as SchoolData)
    const route = useRoute()

    const getExamData = () => {
      schoolService.getFipiInfo(route.params.examName).then((res) => {
        data.value = res.data
        propData.value = data.value[0]
      })
    }

    const tabulation = (item: SchoolData) => {
      hasInfo.value = typeof item.info !== 'object'
      propData.value = item
    }

    onMounted(async () => {
      await getExamData()
    })

    return { tabulation, data, propData, hasInfo }
  }
})
</script>

<style lang="scss">
.school-page {
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__nav {
    width: 80%;
    text-align: center;

    padding: 0;

    margin: 0 auto 60px;
  }

  &__list-item {
    padding: 12px;

    border-radius: 8px;
    box-shadow: 0 8px 12px -5px rgb(0 0 0 / 0.5);

    z-index: 10;

    break-inside: avoid;
    page-break-inside: avoid;

    cursor: pointer;

    &--active {
      margin: -2px -5px;
      padding: 12px 18px;
      box-shadow: 0 15px 20px -5px rgb(0 0 0 / 0.5);
      cursor: default;

      background: $white;
      z-index: 12;
    }
  }
}
</style>
