<template>
  <div class="filter">
    <label>
      Тип предмета:
      <multi-select
        class="filter__multiselector"
        v-model="subjType"
        :options="subjectType"
        mode="tags"
        :close-on-select="false"
        :searchable="true"
        :create-option="true"
        placeholder="Выберите предметы"
      />
    </label>
    <label>
      Тип источника:
      <multi-select
        class="filter__multiselector"
        v-model="srcType"
        :options="srcTypeList"
        mode="tags"
        :close-on-select="false"
        :searchable="true"
        :create-option="true"
        placeholder="Выберите источники"
      />
    </label>
    <label>
      Тип публикации:
      <multi-select
        class="filter__multiselector"
        v-model="docType"
        :options="docTypeList"
        mode="tags"
        :close-on-select="false"
        :searchable="true"
        :create-option="true"
        placeholder="Выбирите тип публикации"
      />
    </label>
    <label>
      Опубликован
      <select class="filter__input" v-model="pubYear['operator']">
        <option value="">Не выбрано</option>
        <option value="equal">в</option>
        <option value="greater">после</option>
        <option value="less">до</option>
      </select>
      <input
        placeholder="Введите год"
        class="filter__input"
        v-model="pubYear['year']"
        type="number"
      />
    </label>
    <label>
      В открытом доступе:
      <input class="filter__check-access" v-model="hasOpenAccess" type="checkbox" />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import scopusService from '@/services/scopusService'
import type ResponseData from '@/types/responseData'

import MultiSelect from '@vueform/multiselect'

export default defineComponent({
  name: 'ScopusFilter',
  components: {
    MultiSelect
  },
  data() {
    return {
      value: null,
      docTypeList: [
        { label: 'Статьи', value: 'ar' },
        { label: 'Выдержки из докладов', value: 'ab' },
        { label: 'Бизнес статьи', value: 'bz' },
        { label: 'Главы книг', value: 'ch' },
        { label: 'Материалы конференций', value: 'cp' },
        { label: 'Отзывы конференций', value: 'cr' },
        { label: 'Редакции', value: 'ed' },
        { label: 'Исправления', value: 'er' },
        { label: 'Письма', value: 'le' },
        { label: 'Заметки', value: 'no' },
        { label: 'Пресс-релизы', value: 'pe' },
        { label: 'Отзывы', value: 're' },
        { label: 'Краткий обзор', value: 'sh' }
      ] as { label: string; value: string }[],
      srcTypeList: [
        { label: 'Журнал', value: 'j' },
        { label: 'Книга', value: 'b' },
        { label: 'Серия  книг', value: 'k' },
        { label: 'Материалы конференции', value: 'p' },
        { label: 'Доклад', value: 'r' },
        { label: 'Ревю', value: 'd' }
      ] as { label: string; value: string }[],
      subjectType: [] as { label: string; value: string }[],
      hasOpenAccess: false as boolean,
      docType: [] as { name: string; code: string }[],
      subjType: null,
      srcType: null,
      pubYear: { operator: '' } as { [key: string]: string },
      data: {} as { [key: string]: { abbrev: string }[] }
    }
  },
  methods: {
    fetchSubjectList() {
      scopusService.getSubjectsList().then((res: ResponseData) => {
        this.data = res.data
      })
    },
    callEmit() {
      this.$emit('filter', {
        OPENACCESS: Number(this.hasOpenAccess),
        DOCTYPE: this.docType,
        SUBJAREA: this.subjType,
        SRCTYPE: this.srcType,
        PUBYEAR: this.pubYear
      })
    },
    fillInput(
      query: any,
      list: { name: string; code: string }[],
      value: { name: string; code: string }[]
    ) {
      if (typeof query === 'string' && query) {
        value.push({
          name: String(list.find((el) => el.code === query)?.name),
          code: String(query)
        })
      } else if (query) {
        for (let i = 0; i < query.length; i++) {
          value.push({
            name: String(list.find((el) => el.code === query[i])?.name),
            code: String(query[i])
          })
        }
      }
    }
  },
  mounted() {
    this.fetchSubjectList()
    if (this.$route.query['doctype']) {
      let query = this.$route.query['doctype']
      this.fillInput(query, this.docTypeList, this.docType)
    }
    if (this.$route.query['srctype']) {
      let query = this.$route.query['srctype']
      this.fillInput(query, this.srcTypeList, this.srcType)
    }
    if (this.$route.query['openaccess']) {
      this.hasOpenAccess = Boolean(this.$route.query['openaccess'])
    }
    if (this.$route.query['pubyear']) {
      this.pubYear['operator'] = String(this.$route.query['pubyear_op'])
      this.pubYear['year'] = String(this.$route.query['pubyear_yr'])
    }
  },
  watch: {
    data() {
      for (let index in this.data) {
        this.subjectType.push({ label: index, value: String(this.data[index][0]['abbrev']) })
      }
      if (this.$route.query['subjtype']) {
        let query = this.$route.query['subjtype']
        this.fillInput(query, this.subjectType, this.subjType)
      }
    }
  }
})
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss">
.filter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__multiselector {
    width: 550px;
    --ms-tag-bg: #486ef2;
    --ms-ring-color: none;
  }

  &__input {
    min-height: 20px;
    line-height: 20px;
    border: none;
    border-radius: 5px;
    background: #fff;
    padding: 0 0 0 5px;
    transition: border 0.1s ease;
    box-sizing: border-box;
    margin-bottom: 8px;
    vertical-align: top;
  }
}
</style>
