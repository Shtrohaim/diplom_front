<template>
  <div class="filter">
    <div class="filter__selector-wrapper">
      <label class="filter__label p_sm">
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
      <label class="filter__label p_sm">
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
      <label class="filter__label p_sm">
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
      <label class="filter__label p_sm">
        Опубликован:
        <multi-select
          class="filter__multiselector filter__multiselector--operator"
          placeholder="Не выбрано"
          v-model="pubYear['operator']"
          :options="{ equal: 'в', greater: 'после', less: 'до' }"
        />
      </label>
      <label class="filter__label p_sm">
        <input
          placeholder="Введите год"
          class="filter__input filter__input--year p_sm"
          v-model="pubYear['year']"
          type="number"
        />
        {{ declensionWord }}
      </label>
    </div>
    <label class="filter__label p_sm">
      В открытом доступе:
      <checkbox-tristate class="filter__check-access" v-model="hasOpenAccess" />
    </label>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRefs, watchEffect } from 'vue'

import MultiSelect from '@vueform/multiselect'
import CheckboxTristate from '@/components/common/checkboxTristate.vue'

import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ScopusFilter',
  components: {
    MultiSelect,
    CheckboxTristate
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

    const hasOpenAccess = ref(null)
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
      let openacces = null
      if (hasOpenAccess.value === true) {
        openacces = 1
      } else if (hasOpenAccess.value === false) {
        openacces = 0
      }
      emit('filter', {
        OPENACCESS: openacces,
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
    --ms-font-size: 18px;
    --ms-option-font-size: 18px;
    --ms-tag-font-size: 18px;

    &--operator {
      max-width: 180px;
    }
  }

  &__input {
    min-height: 20px;
    line-height: 20px;
    border-radius: 5px;
    background: $white;
    transition: border 0.1s ease;
    box-sizing: border-box;
    margin-bottom: 8px;
    vertical-align: top;

    padding: 10px;
    border: 1px solid $gray-light;
    outline: none;

    &--year {
      margin: 10px;
    }

    &--year::placeholder {
      color: $gray-placeholder;
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
