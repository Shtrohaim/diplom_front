<template>
  <div class="filter">
    <label>
      Тип предмета:
      <multi-select
        class="filter__multiselector"
        v-model="subjType"
        :options="subjTypeList"
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
      <multi-select
        placeholder="Не выбрано"
        v-model="pubYear['operator']"
        :options="{ equal: 'в', greater: 'после', less: 'до' }"
      />
    </label>
    <label>
      <input
        placeholder="Введите год"
        class="filter__input filter__input--year"
        v-model="pubYear['year']"
        type="number"
      />
      году
    </label>
    <label>
      В открытом доступе:
      <input class="filter__check-access" v-model="hasOpenAccess" type="checkbox" />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, watchEffect } from 'vue'

import MultiSelect from '@vueform/multiselect'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ScopusFilter',
  components: {
    MultiSelect
  },
  props: {
    subjectsList: {
      type: Object as () => { [key: string]: { [key: string]: { abbrev: string } }[] },
      default: () => ({})
    }
  },
  emits: ['filter'],
  setup(props, { emit }) {
    const docTypeList = [
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
    ] as { label: string; value: string }[]

    const srcTypeList = [
      { label: 'Журнал', value: 'j' },
      { label: 'Книга', value: 'b' },
      { label: 'Серия  книг', value: 'k' },
      { label: 'Материалы конференции', value: 'p' },
      { label: 'Доклад', value: 'r' },
      { label: 'Ревю', value: 'd' }
    ] as { label: string; value: string }[]

    const hasOpenAccess = ref(false)
    const { subjectsList } = toRefs(props)
    const subjTypeList = ref([] as { label: string; value: string }[])
    const docType = ref([])
    const subjType = ref([])
    const srcType = ref([])
    const pubYear = ref({ operator: '' } as { [key: string]: string })

    const route = useRoute()
    const fillInput = (query: any, list: { label: string; value: string }[], value: string[]) => {
      if (typeof query === 'string' && query) {
        value.push(String(query))
      } else if (query) {
        for (let i = 0; i < query.length; i++) {
          value.push(String(query[i]))
        }
      }
    }

    const transformSubjects = () => {
      for (let index in subjectsList.value) {
        subjTypeList.value.push({
          label: index,
          value: String(subjectsList.value[index][0]['abbrev'])
        })
      }
      if (route.query['SUBJAREA']) {
        let query = route.query['SUBJAREA']
        fillInput(query, subjTypeList.value, subjType.value)
      }
    }

    onMounted(() => {
      transformSubjects()
      if (route.query['DOCTYPE']) {
        let query = route.query['DOCTYPE']
        fillInput(query, docTypeList, docType.value)
      }
      if (route.query['SRCTYPE']) {
        let query = route.query['SRCTYPE']
        fillInput(query, srcTypeList, srcType.value)
      }
      if (route.query['OPENACCESS']) {
        hasOpenAccess.value = !!Number(route.query['OPENACCESS'])
      }
      if (route.query['pubyear_yr']) {
        pubYear.value['operator'] = String(route.query['pubyear_op'])
        pubYear.value['year'] = String(route.query['pubyear_yr'])
      }
    })

    watchEffect(() => {
      emit('filter', {
        OPENACCESS: Number(hasOpenAccess.value),
        DOCTYPE: docType.value,
        SUBJAREA: subjType.value,
        SRCTYPE: srcType.value,
        PUBYEAR: pubYear.value
      })
    })

    return {
      subjType,
      subjTypeList,
      hasOpenAccess,
      pubYear,
      docType,
      docTypeList,
      srcType,
      srcTypeList
    }
  }
})
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss" scoped>
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
    border-radius: 5px;
    background: #fff;
    transition: border 0.1s ease;
    box-sizing: border-box;
    margin-bottom: 8px;
    vertical-align: top;

    padding: 10px;
    border: 1px solid #d1d5db;
    font-size: inherit;
    outline: none;

    &--year::-webkit-outer-spin-button,
    &--year::-webkit-inner-spin-button {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
    }
  }
}
</style>
