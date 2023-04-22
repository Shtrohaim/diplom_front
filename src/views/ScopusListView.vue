<template>
  <div v-if="Object.keys(subjectsList).length > 0">
    <base-search :has-filter="true" :filter-data="queryFilter">
      <select v-model="queryFilter.type">
        <option value="ALL">Все</option>
        <option value="DOI">DOI</option>
        <option value="ISSN">ISSN</option>
        <option value="EISSN">EISSN</option>
        <option value="AUTH">Автор</option>
        <option value="PUBLISHER">Издатель</option>
      </select>
      <label>
        Фильтр:
        <input type="checkbox" v-model="hasFilter" />
      </label>
      <scopus-filter v-if="hasFilter" :subjectsList="subjectsList" @filter="getFilter" />
    </base-search>
    <loading-screen v-if="isLoading" />
    <ul v-else class="scopus-card__list">
      <li class="scopus-card__list-item" v-for="item in publications" :key="item.eid">
        <students-scopus-card :publication="item" />
      </li>
    </ul>
    <pagination
      v-if="String(route.query.search).trim()?.length > 0 && route.query.search"
      :page="currentPage"
      :totalPages="totalPages"
      @pagination="onPagination"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import scopusService from '@/services/scopusService'

import type ScopusListType from '@/types/scopusListType'
import type ResponseData from '@/types/responseData'

import LoadingScreen from '@/components/common/loading.vue'
import Pagination from '@/components/common/pagination.vue'
import ScopusFilter from '@/components/ScopusFilter.vue'
import StudentsScopusCard from '@/components/ScopusCard.vue'
import BaseSearch from '@/components/common/search.vue'
export default defineComponent({
  name: 'ScopusListPage',
  components: {
    BaseSearch,
    Pagination,
    LoadingScreen,
    ScopusFilter,
    StudentsScopusCard
  },
  setup() {
    const route = useRoute()

    const publications = ref([] as ScopusListType[])
    const subjectsList = ref({} as { [key: string]: { [key: string]: { abbrev: string } }[] })

    const currentPage = ref(1)
    const size = 25 as number
    const totalPages = ref(1)

    const isLoading = ref(false)
    const hasFilter = ref(false)

    const requestFilter = ref({} as any)
    const queryFilter = ref({ type: route.query.type ? route.query.type : 'ALL' } as any)

    const fetchScopusData = () => {
      let page = currentPage.value
      let qSearch = { type: queryFilter.value.type, field: route.query.search }
      let qFilter = requestFilter.value
      scopusService.getScopusData({ size, page, qSearch, qFilter }).then((res: ResponseData) => {
        publications.value = res.data.data
        totalPages.value = res.data.totalPages
        isLoading.value = false
      })
    }
    const fetchSubjectList = () => {
      scopusService.getSubjectsList().then((res: ResponseData) => {
        subjectsList.value = res.data
        if (Object.keys(route.query).length > 2) {
          hasFilter.value = true
        }
      })
    }
    const onPagination = (data: { nextPage: number }) => {
      currentPage.value = data.nextPage
      isLoading.value = true
      fetchScopusData()
    }
    const getFilter = (data: any) => {
      for (let item in data) {
        queryFilter.value[item] = []
        if (Array.isArray(data[item])) {
          for (let index in data[item]) {
            queryFilter.value[item].push(data[item][index])
          }
        }
      }
      queryFilter.value.OPENACCESS = data.OPENACCESS
      requestFilter.value = Object.assign({}, queryFilter.value)
      delete requestFilter.value.type

      if (data.PUBYEAR['operator'] && data.PUBYEAR['year']) {
        requestFilter.value.PUBYEAR = data.PUBYEAR
        queryFilter.value.pubyear_yr = data.PUBYEAR['year']
        queryFilter.value.pubyear_op = data.PUBYEAR['operator']
      }
    }

    onMounted(() => {
      fetchSubjectList()
    })

    return {
      publications,
      isLoading,
      hasFilter,
      getFilter,
      currentPage,
      totalPages,
      onPagination,
      route,
      subjectsList,
      queryFilter
    }
  }
})
</script>
