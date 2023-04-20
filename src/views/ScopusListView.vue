<template>
  <div>
    <form @submit="searchData">
      <input ref="searchInput" type="text" />
      <select ref="searchType">
        <option value="ALL">Все</option>
        <option value="DOI">DOI</option>
        <option value="ISSN">ISSN</option>
        <option value="EISSN">EISSN</option>
        <option value="AUTHOR">Автор</option>
        <option value="PUBLISHER">Издатель</option>
      </select>
      <button>Поиск</button>
      <label>
        Фильтр:
        <input type="checkbox" @change="hasFilter = !hasFilter" />
      </label>
      <scopus-filter
        v-if="hasFilter"
        :subjectsList="subjectsList"
        ref="filterElement"
        @filter="getFilter"
      />
    </form>
    <button v-if="checkFilter">Сбросить фильтр</button>
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
import { computed, defineComponent, onMounted, ref } from 'vue'

import scopusService from '@/services/scopusService'

import type ScopusListType from '@/types/scopusListType'
import type ResponseData from '@/types/responseData'

import LoadingScreen from '@/components/common/loading.vue'
import Pagination from '@/components/common/pagination.vue'
import ScopusFilter from '@/components/ScopusFilter.vue'
import StudentsScopusCard from '@/components/ScopusCard.vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  name: 'ScopusListPage',
  components: {
    Pagination,
    LoadingScreen,
    ScopusFilter,
    StudentsScopusCard
  },
  setup() {
    const publications = ref([] as ScopusListType[])
    const subjectsList = ref({} as { [key: string]: { [key: string]: { abbrev: string } }[] })

    const currentPage = ref(1)
    const size = 25 as number
    const totalPages = ref(1)
    const isLoading = ref(false)
    const hasFilter = ref(false)
    const search = ref({} as { type: string; field: string })
    const filter = ref({} as any)

    const searchInput = ref()
    const searchType = ref()
    const filterElement = ref()

    const router = useRouter()
    const route = useRoute()

    const checkFilter = computed(() => Object.keys(filter.value).length !== 0)
    const fetchScopusData = () => {
      let page = currentPage.value
      let qSearch = search.value
      let qFilter = filter.value
      scopusService.getScopusData({ size, page, qSearch, qFilter }).then((res: ResponseData) => {
        publications.value = res.data.data
        totalPages.value = res.data.totalPages
        isLoading.value = false
      })
    }
    const fetchSubjectList = () => {
      scopusService.getSubjectsList().then((res: ResponseData) => {
        subjectsList.value = res.data
      })
    }
    const onPagination = (data: { nextPage: number }) => {
      currentPage.value = data.nextPage
      isLoading.value = true
      fetchScopusData()
    }
    const getFilter = (data: any) => {
      for (let item in data) {
        filter.value[item] = []
        for (let index in data[item]) {
          filter.value[item].push(data[item][index])
        }
      }
      filter.value.OPENACCESS = data.OPENACCESS
      if (data.PUBYEAR['year'] && data.PUBYEAR['operator']) {
        filter.value.PUBYEAR = data.PUBYEAR
      }
    }

    const searchData = (event: any) => {
      event.preventDefault()
      if (hasFilter.value) filterElement.value.callEmit()
      if (searchInput.value.value.trim()) {
        let operator, year
        if (filter.value['PUBYEAR']) {
          operator = filter.value['PUBYEAR']['operator']
          year = filter.value['PUBYEAR']['year']
        }
        search.value['type'] = searchType.value.value
        search.value['field'] = searchInput.value.value.trim()
        router.push({
          query: {
            search: search.value['field'],
            type: search.value['type'],
            openaccess: filter.value['OPENACCESS'],
            doctype: filter.value['DOCTYPE'],
            srctype: filter.value['SRCTYPE'],
            subjtype: filter.value['SUBJAREA'],
            pubyear_op: operator,
            pubyear_yr: year
          }
        })
        isLoading.value = true
        searchInput.value.value = ''
      } else {
        searchInput.value.focus()
      }
    }

    onMounted(() => {
      fetchSubjectList()
      if (route.query['openaccess']) {
        filter.value['OPENACCESS'] = Number(route.query['openaccess'])
      }
      if (route.query['doctype']) {
        filter.value['DOCTYPE'] = route.query['doctype']
      }
      if (route.query['subjtype']) {
        filter.value['SUBJAREA'] = route.query['subjtype']
      }
      if (route.query['srctype']) {
        filter.value['SRCTYPE'] = route.query['srctype']
      }
      if (route.query['pubyear']) {
        filter.value['PUBYEAR'] = {}
        filter.value['PUBYEAR']['operator'] = String(route.query['pubyear_op'])
        filter.value['PUBYEAR']['year'] = String(route.query['pubyear_yr'])
      }
      if (route.query.search && route.query.type) {
        search.value['type'] = route.query.type.toString()
        search.value['field'] = route.query.search.toString()
      }
    })

    return {
      publications,
      searchData,
      isLoading,
      hasFilter,
      getFilter,
      currentPage,
      totalPages,
      onPagination,
      searchInput,
      searchType,
      route,
      checkFilter,
      filterElement,
      subjectsList
    }
  }
})
</script>
