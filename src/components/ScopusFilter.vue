<template>
  <div class="filter">
    <div class="filter__selector-wrapper">
      <label class="filter__label">
        Тип предмета:
        <multi-select
          class="filter__multiselector"
          v-model="subjType"
          :options="subjTypeList"
          mode="tags"
          :close-on-select="false"
          :create-option="true"
          placeholder="Выберите предметы"
        />
      </label>
      <label class="filter__label">
        Тип источника:
        <multi-select
          class="filter__multiselector"
          v-model="srcType"
          :options="srcTypeList"
          mode="tags"
          :close-on-select="false"
          :create-option="true"
          placeholder="Выберите источники"
        />
      </label>
      <label class="filter__label">
        Тип публикации:
        <multi-select
          class="filter__multiselector"
          v-model="docType"
          :options="docTypeList"
          mode="tags"
          :close-on-select="false"
          :create-option="true"
          placeholder="Выбирите тип публикации"
        />
      </label>
    </div>
    <div class="filter__year-wrapper">
      <label class="filter__label">
        Опубликован:
        <multi-select
          class="filter__multiselector filter__multiselector--operator"
          placeholder="Не выбрано"
          v-model="pubYear['operator']"
          :options="{ equal: 'в', greater: 'после', less: 'до' }"
        />
      </label>
      <label class="filter__label">
        <input
          placeholder="Введите год"
          class="filter__input filter__input--year"
          v-model="pubYear['year']"
          type="number"
        />
        {{ declensionWord }}
      </label>
    </div>
    <label class="filter__label">
      В открытом доступе:
      <input class="filter__check-access" v-model="hasOpenAccess" type="checkbox" />
    </label>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRefs, watchEffect } from 'vue'

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

    const declensionWord = computed(() => {
      return pubYear.value['operator'] === 'equal' && pubYear.value['year']
        ? 'году'
        : (pubYear.value['operator'] === 'greater' || pubYear.value['operator'] === 'less') &&
          pubYear.value['year']
        ? 'года'
        : ''
    })

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

      if (Number(pubYear.value['year']) < 0) {
        pubYear.value['year'] = String(Number(pubYear.value['year']) * -1)
      }
      if (Number(pubYear.value['year']) > new Date().getFullYear()) {
        pubYear.value['year'] = String(new Date().getFullYear())
      }
    })

    return {
      subjType,
      subjTypeList,
      hasOpenAccess,
      pubYear,
      docType,
      docTypeList,
      srcType,
      srcTypeList,
      declensionWord
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

  &__label {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__year-wrapper {
    display: flex;
    align-items: center;
  }

  &__multiselector {
    margin: 10px;
    width: 550px;
    --ms-tag-bg: #486ef2;
    --ms-ring-color: none;
    --ms-option-bg-selected: #486ef2;
    --ms-option-bg-selected-pointed: #486ef2;

    &--operator {
      width: 170px;
    }
  }

  &__check-access {
    position: relative;

    width: 30px;
    height: 30px;

    margin-left: 10px;

    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;

    background: #f24848;
    transition: 0.3s linear;

    border-radius: 4px;

    &::before,
    &::after {
      position: absolute;
      content: '';
      top: 50%;
      left: 50%;
      width: 20px;
      height: 3px;
      background-color: #fff;
      border-radius: 4px;
      transition: 0.2s linear 0.2s;
    }

    &::before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    &:checked {
      background: #486ef2;
      &::before {
        width: 10px;
        transform: translate(-50%, -50%) translate(-4px, 3px) rotate(45deg);
      }

      &::after {
        width: 18px;
        transform: translate(-50%, -50%) translate(4px, 0) rotate(-45deg);
      }
    }
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

    &--year {
      margin: 10px;
    }

    &--year::placeholder {
      color: #9ca3af;
    }

    &--year::-webkit-outer-spin-button,
    &--year::-webkit-inner-spin-button {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
    }
  }
}
</style>
