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
      <scopus-filter v-if="hasFilter" ref="filter" @filter="getFilter" />
    </form>
    <button v-if="checkFilter">Сбросить фильтр</button>
    <loading-screen v-if="loading" />
    <ul v-else class="scopus-card__list">
      <li class="scopus-card__list-item" v-for="item in data" :key="item.eid">
        <students-scopus-card :data="item" />
      </li>
    </ul>
    <pagination
      v-if="isActivePagination"
      ref="pagination"
      :isStartPagination="false"
      :totalPages="totalPages"
      @pagination="onPagination"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import scopusService from '@/services/scopusService'

import type ScopusList from '@/types/scopusList'
import type ResponseData from '@/types/responseData'

import LoadingScreen from './common/loading.vue'
import Pagination from './common/pagination.vue'
import ScopusFilter from './ScopusFilter.vue'
import StudentsScopusCard from './StudentsScopusCard.vue'

/* eslint-disable @typescript-eslint/no-explicit-any */

export default defineComponent({
  name: 'ScopusList',
  components: {
    Pagination,
    LoadingScreen,
    ScopusFilter,
    StudentsScopusCard
  },
  data() {
    return {
      data: [] as ScopusList[],
      page: 1 as number,
      size: 25 as number,
      totalPages: [] as number[],
      loading: false as boolean,
      hasFilter: false as boolean,
      search: {} as { type: string; field: string },
      filter: {} as any,
      isActivePagination: false as boolean
    }
  },
  methods: {
    fetchScopusData() {
      scopusService
        .getScopusData(this.size, this.page, this.search, this.filter)
        .then((res: ResponseData) => {
          this.data = res.data.data
          this.translatePublications()
          this.getAllPagesList(res.data.totalPages)
          this.loading = false
        })
    },
    getAllPagesList(pages: number) {
      let newPages = [] as number[]
      for (let n = 1; n <= pages; n++) {
        newPages.push(n)
      }
      this.totalPages = newPages
    },
    scrollView() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    onPagination(data: { nextPage: number }) {
      this.page = data.nextPage
      this.loading = true
      this.fetchScopusData()
      this.scrollView()
    },
    getFilter(data: any) {
      for (let item in data) {
        this.filter[item] = []
        for (let index in data[item]) {
          this.filter[item].push(data[item][index].code)
        }
      }
      this.filter.OPENACCESS = data.OPENACCESS
      if (data.PUBYEAR['year'] && data.PUBYEAR['operator']) {
        this.filter.PUBYEAR = data.PUBYEAR
      }
    },
    searchData(e: Event) {
      e.preventDefault()
      if (this.hasFilter) (this.$refs['filter'] as HTMLFormElement).callEmit()
      if ((this.$refs['searchInput'] as HTMLFormElement).value.trim()) {
        let operator, year
        if (this.filter['PUBYEAR']) {
          operator = this.filter['PUBYEAR']['operator']
          year = this.filter['PUBYEAR']['year']
        }
        this.search['type'] = (this.$refs['searchType'] as HTMLFormElement).value
        this.search['field'] = (this.$refs['searchInput'] as HTMLFormElement).value.trim()
        this.$router.push({
          query: {
            search: this.search['field'],
            type: this.search['type'],
            openaccess: this.filter['OPENACCESS'],
            doctype: this.filter['DOCTYPE'],
            srctype: this.filter['SRCTYPE'],
            subjtype: this.filter['SUBJAREA'],
            pubyear_op: operator,
            pubyear_yr: year
          }
        })
        this.isActivePagination = true
        this.loading = true
        this.fetchScopusData()
        setTimeout(() => {
          ;(this.$refs['pagination'] as HTMLFormElement).page = 1
        }, 0)
        ;(this.$refs['searchInput'] as HTMLFormElement).value = ''
      } else {
        ;(this.$refs['searchInput'] as HTMLFormElement).focus()
      }
    },
    translatePublications() {
      for (let i = 0; i < this.data.length; i++) {
        switch (this.data[i].subtypeDescription) {
          case 'Article':
            this.data[i].subtypeDescription = 'Статья'
            break
          case 'Abstract Report':
            this.data[i].subtypeDescription = 'Выдержка из доклада'
            break
          case 'Book':
            this.data[i].subtypeDescription = 'Книга'
            break
          case 'Business Article':
            this.data[i].subtypeDescription = 'Бизнес статья'
            break
          case 'Book Chapter':
            this.data[i].subtypeDescription = 'Глава книги'
            break
          case 'Conference Paper':
            this.data[i].subtypeDescription = 'Материал конференции'
            break
          case 'Conference Review':
            this.data[i].subtypeDescription = 'Отзыв конференции'
            break
          case 'Editorial':
            this.data[i].subtypeDescription = 'Редакция'
            break
          case 'Erratum':
            this.data[i].subtypeDescription = 'Исправление'
            break
          case 'Letter':
            this.data[i].subtypeDescription = 'Письмо'
            break
          case 'Note':
            this.data[i].subtypeDescription = 'Заметка'
            break
          case 'Press Release':
            this.data[i].subtypeDescription = 'Пресс-релиз'
            break
          case 'Review':
            this.data[i].subtypeDescription = 'Отзыв'
            break
          case 'Short Survey':
            this.data[i].subtypeDescription = 'Краткий обзор'
            break
        }
      }
    }
  },
  computed: {
    checkFilter(): boolean {
      return Object.keys(this.filter).length !== 0
    }
  },
  mounted() {
    if (this.$route.query['openaccess']) {
      this.filter['OPENACCESS'] = Number(this.$route.query['openaccess'])
    }
    if (this.$route.query['doctype']) {
      this.filter['DOCTYPE'] = this.$route.query['doctype']
    }
    if (this.$route.query['subjtype']) {
      this.filter['SUBJAREA'] = this.$route.query['subjtype']
    }
    if (this.$route.query['srctype']) {
      this.filter['SRCTYPE'] = this.$route.query['srctype']
    }
    if (this.$route.query['pubyear']) {
      this.filter['PUBYEAR'] = {}
      this.filter['PUBYEAR']['operator'] = String(this.$route.query['pubyear_op'])
      this.filter['PUBYEAR']['year'] = String(this.$route.query['pubyear_yr'])
    }

    if (this.$route.query.search && this.$route.query.type) {
      this.search['type'] = this.$route.query.type.toString()
      this.search['field'] = this.$route.query.search.toString()
      this.isActivePagination = true
      setTimeout(() => {
        if (this.$route.query.page) {
          ;(this.$refs['pagination'] as HTMLFormElement).page = Number(this.$route.query.page)
        } else {
          ;(this.$refs['pagination'] as HTMLFormElement).page = 1
        }
      }, 0)
    }
  }
})
</script>
