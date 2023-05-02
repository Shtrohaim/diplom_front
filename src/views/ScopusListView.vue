<template>
  <div
    class="scopus-list content"
    :class="{ 'scopus-list--no-publication': publications === null || publications?.length === 0 }"
    v-if="Object.keys(subjectsList).length > 0"
  >
    <base-search class="scopus-list__search" :has-filter="true" :filter-data="queryFilter">
      <multi-select
        class="scopus-list__select"
        :canClear="false"
        :canDeselect="false"
        placeholder="Не выбрано"
        v-model="queryFilter.type"
        :options="searchType"
      />
      <label class="scopus-list__open-filter p_sm">
        {{ hasFilter ? 'Скрыть фильтр' : 'Показать фильтр' }}
        <input class="visually-hidden" type="checkbox" v-model="hasFilter" />
      </label>
      <scopus-filter
        class="scopus-list__filter"
        :class="{ 'visually-hidden': !hasFilter }"
        :subjectsList="subjectsList"
        @filter="getFilter"
      />
    </base-search>
    <loading-screen v-if="isLoading" />
    <div class="scopus-list__no-found" v-else-if="route.query.search && publications === null">
      По вашему запросу {{ route.query.search }}, в категории {{ searchType[route.query.type] }},
      ничего не найдено!
    </div>
    <ul v-else class="scopus-list__list">
      <li class="scopus-list__list-item" v-for="item in publications" :key="item.eid">
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
  <loading-screen v-else />
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
import MultiSelect from '@vueform/multiselect'
export default defineComponent({
  name: 'ScopusListPage',
  components: {
    BaseSearch,
    Pagination,
    LoadingScreen,
    ScopusFilter,
    StudentsScopusCard,
    MultiSelect
  },
  setup() {
    const route = useRoute()

    const publications = ref([] as ScopusListType[])
    const subjectsList = ref({} as { [key: string]: { [key: string]: { abbrev: string } }[] })
    const searchType = {
      ALL: 'Все',
      DOI: 'DOI',
      ISSN: 'ISSN',
      EISSN: 'EISSN',
      AUTH: 'Автор',
      PUBLISHER: 'Издатель'
    }

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
      scopusService
        .getScopusData({ size, page, qSearch, qFilter })
        .then((res: ResponseData) => {
          publications.value = Object.keys(res.data.data?.[0]).length !== 0 ? res.data.data : null
          totalPages.value = res.data.totalPages
          isLoading.value = false
        })
        .catch(() => {
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
      } else {
        delete queryFilter.value.pubyear_yr
        delete queryFilter.value.pubyear_op
      }

      console.log(queryFilter.value)
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
      queryFilter,
      searchType
    }
  }
})
</script>
<style lang="scss">
.scopus-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &--no-publication {
    height: 85vh;
  }

  &__no-found {
    margin-bottom: 50px;
  }

  &__list {
    width: 70%;
  }

  &__select {
    width: 205px;

    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 2;

    justify-self: start;
    margin: 0 0 0 10px;

    --ms-ring-color: none;
    --ms-option-bg-selected: #486ef2;
    --ms-option-bg-selected-pointed: #486ef2;
    --ms-font-size: 18px;
    --ms-option-font-size: 18px;
  }

  &__filter {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 3;
    justify-self: center;
  }

  &__open-filter {
    user-select: none;
    cursor: pointer;

    opacity: 55%;
    text-decoration: underline dotted;
    text-underline-offset: 6px;

    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 3;
    grid-row-end: 4;

    justify-self: center;
    margin-top: 20px;
    margin-bottom: 40px;

    &:hover {
      opacity: 75%;
    }
  }
}
</style>
