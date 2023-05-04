<template>
  <div class="subject-card" :class="subjectModifier">
    <h3 class="subject-card__title h_md">{{ subject }}</h3>
    <a
      class="subject-card__link p_sm"
      v-for="(value, index) in data"
      :key="index"
      :href="value"
      target="_blank"
      >{{ index }}</a
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: 'SubjectCard',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    subject: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { subject } = toRefs(props)

    const subjectModifier = computed(() => {
      switch (subject.value) {
        case 'Русский язык':
          return 'subject-card--russian'
        case 'Химия':
          return 'subject-card--chemistry'
        case 'Физика':
          return 'subject-card--physics'
        case 'История':
          return 'subject-card--history'
        case 'Биология':
          return 'subject-card--biology'
        case 'География':
          return 'subject-card--geography'
        case 'Литература':
          return 'subject-card--literature'
        case 'Математика':
          return 'subject-card--mathematics'
        case 'Информатика':
          return 'subject-card--informatics'
        case 'Информатика и ИКТ':
          return 'subject-card--informatics'
        case 'Немецкий язык':
          return 'subject-card--german'
        case 'Испанский язык':
          return 'subject-card--spanish'
        case 'Обществознание':
          return 'subject-card--society'
        case 'Английский язык':
          return 'subject-card--english'
        case 'Французский язык':
          return 'subject-card--french'
        case 'Китайский язык':
          return 'subject-card--chinese'
        case 'Иностранный язык':
          return 'subject-card--foreign-language'
      }
      return ''
    })
    return { subjectModifier }
  }
})
</script>

<style lang="scss">
.subject-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 100%;

  padding: 35px 35px 45px 35px;
  margin-bottom: 20px;

  border-radius: 2px;
  box-shadow: 0 0 12px rgb(0 0 0 / 0.5);

  background-repeat: no-repeat;
  background-size: 95px;
  background-position: 20px;

  page-break-inside: avoid;
  break-inside: avoid;

  @media (max-width: 769px) {
    background-size: 75px;

    padding: 25px 25px 25px 25px;
  }

  &__title {
    margin-bottom: 32px;
  }

  &__link {
    display: flex;
    flex-direction: column;

    color: rgb(72 110 242);

    margin-bottom: 10px;

    overflow-wrap: anywhere;
  }

  &--chemistry {
    background-image: url('@/assets/images/subjectsIcon/chemistry.png');
  }

  &--informatics {
    background-image: url('@/assets/images/subjectsIcon/informatics.png');
  }

  &--mathematics {
    background-image: url('@/assets/images/subjectsIcon/mathematics.png');
  }

  &--biology {
    background-image: url('@/assets/images/subjectsIcon/biology.png');
  }

  &--chinese {
    background-image: url('@/assets/images/subjectsIcon/chinese.png');
  }

  &--foreign-language {
    background-image: url('@/assets/images/subjectsIcon/foreign-language.png');
  }

  &--french {
    background-image: url('@/assets/images/subjectsIcon/french.png');
  }

  &--geography {
    background-image: url('@/assets/images/subjectsIcon/geography.png');
  }

  &--history {
    background-image: url('@/assets/images/subjectsIcon/history.png');
  }

  &--literature {
    background-image: url('@/assets/images/subjectsIcon/literature.png');
  }

  &--physics {
    background-image: url('@/assets/images/subjectsIcon/physics.png');
  }

  &--russian {
    background-image: url('@/assets/images/subjectsIcon/russian.png');
  }

  &--society {
    background-image: url('@/assets/images/subjectsIcon/society.png');
  }

  &--spanish {
    background-image: url('@/assets/images/subjectsIcon/spanish.png');
  }

  &--english {
    background-image: url('@/assets/images/subjectsIcon/english.png');
  }

  &--german {
    background-image: url('@/assets/images/subjectsIcon/german.png');
  }
}
</style>
