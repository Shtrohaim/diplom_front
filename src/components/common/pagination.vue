<template>
  <div class="pagination">
    <button
      class="pagination__button pagination__button--reverse"
      type="button"
      @click="pagination(1)"
    >
      <svg class="fill-primary icon36" :class="{ 'fill-disabled': page === 1 }">
        <use href="@/assets/images/double_arrow_enable.svg#icon"></use>
      </svg>
    </button>
    <button
      class="pagination__button pagination__button--reverse"
      type="button"
      @click="pagination(page - 1)"
    >
      <svg class="fill-primary icon36" :class="{ 'fill-disabled': page === 1 }">
        <use href="@/assets/images/arrow_enable.svg#icon"></use>
      </svg>
    </button>
    <ul class="pagination__page-list">
      <li
        v-for="n in filteredItems"
        :key="n"
        class="pagination__page"
        :class="{ 'pagination__page--active': this.page === n }"
        @click="pagination(n)"
      >
        {{ n }}
      </li>
    </ul>
    <button
      class="pagination__button pagination__button--forward"
      type="button"
      @click="pagination(page + 1)"
    >
      <svg class="fill-primary icon36" :class="{ 'fill-disabled': page === totalPages }">
        <use href="@/assets/images/arrow_enable.svg#icon"></use>
      </svg>
    </button>
    <button
      class="pagination__button pagination__button--end"
      type="button"
      @click="pagination(Number(totalPages))"
    >
      <svg class="fill-primary icon36" :class="{ 'fill-disabled': page === totalPages }">
        <use href="@/assets/images/double_arrow_enable.svg#icon"></use>
      </svg>
    </button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRefs, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'SitePagination',
  props: {
    totalPages: {
      type: Number,
      default: () => 1
    },
    page: {
      type: Number,
      default: () => 1
    }
  },
  emits: ['pagination'],
  setup(props, { emit }) {
    const nextPage = ref(0)
    const route = useRoute()
    const router = useRouter()
    const { totalPages, page } = toRefs(props)

    const pagination = (n: number) => {
      let curQuery = route.query
      if (n !== page.value && n > 0 && n <= totalPages.value && !route.query.search) {
        router.push({ query: { page: n } })
      } else if (n !== page.value && n > 0 && n <= totalPages.value && route.query.search) {
        router.push({ query: { ...curQuery, page: n } })
      }
    }

    const filteredItems = computed(() => {
      let begin = 1
      let step = 6
      let end = step
      if (page.value - 1 > 1 && page.value + 2 < totalPages.value) {
        begin = page.value - step / 2 === 0 ? 1 : page.value - step / 2
        end = page.value + step / 2
      } else if (page.value + 2 >= totalPages.value) {
        begin =
          totalPages.value - step !== 0
            ? totalPages.value - step > 0
              ? totalPages.value - step
              : 1
            : 1
        end = totalPages.value
      }
      return Array.from({ length: end - begin + 1 }, (value, index) => begin + index)
    })
    const scrollView = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    onMounted(() => {
      if (route.query.page) {
        nextPage.value = Number(route.query.page)
      } else {
        nextPage.value = 1
      }
    })

    watch(nextPage, () => {
      emit('pagination', {
        nextPage: nextPage.value
      })
      scrollView()
    })

    return { filteredItems, pagination }
  }
})
</script>
<style lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;

  &__page-list {
    display: flex;
  }

  &__page {
    height: 40px;

    text-align: center;

    margin-right: 10px;
    margin-bottom: 2px;

    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;

    border: 4px solid #486ef2;
    border-radius: 1000px;

    font-size: 22px;
    font-weight: bold;

    color: rgb(255 255 255);
    background: #486ef2;

    &:first-child {
      margin-left: 10px;
    }

    &:hover {
      opacity: 80%;
      cursor: pointer;
    }

    &:active {
      color: #486ef2;
      background: rgb(255 255 255);
    }

    &--active {
      color: #486ef2;
      background: rgb(255 255 255);

      &:hover,
      :active {
        cursor: default;
        background: rgb(255 255 255);
        opacity: 100%;
      }
    }
  }

  &__button {
    position: relative;
    width: 40px;
    height: 40px;

    border: none;

    &:hover {
      opacity: 80%;
      cursor: pointer;
    }

    &--disabled {
      &:hover {
        opacity: 100%;
        cursor: default;
      }
    }

    &--reverse {
      transform: scale(-1, 1);
    }
  }
}
</style>
