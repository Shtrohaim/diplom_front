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
        :class="paginationClass(n)"
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
      <svg
        class="fill-primary icon36"
        :class="{ 'fill-disabled': page === totalPages[totalPages.length - 1] }"
      >
        <use href="@/assets/images/arrow_enable.svg#icon"></use>
      </svg>
    </button>
    <button
      class="pagination__button pagination__button--end"
      type="button"
      @click="pagination(totalPages[totalPages.length - 1])"
    >
      <svg
        class="fill-primary icon36"
        :class="{ 'fill-disabled': page === totalPages[totalPages.length - 1] }"
      >
        <use href="@/assets/images/double_arrow_enable.svg#icon"></use>
      </svg>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyPagination',
  props: {
    totalPages: {
      type: Array as any,
      default: () => []
    },
    isStartPagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 0 as number
    }
  },
  methods: {
    pagination(n: number) {
      let curQuery = this.$route.query
      if (
        n !== this.page &&
        n > 0 &&
        n <= this.totalPages[this.totalPages.length - 1] &&
        !this.$route.query.search
      ) {
        this.page =
          n > this.totalPages[this.totalPages.length - 1]
            ? this.totalPages[this.totalPages.length - 1]
            : n < 1
            ? 1
            : n
        this.$router.push({ query: { page: this.page } })
      } else if (
        n !== this.page &&
        n > 0 &&
        n <= this.totalPages[this.totalPages.length - 1] &&
        this.$route.query.search
      ) {
        this.page =
          n > this.totalPages[this.totalPages.length - 1]
            ? this.totalPages[this.totalPages.length - 1]
            : n < 1
            ? 1
            : n
        this.$router.push({ query: { ...curQuery, page: this.page } })
      }
    },
    paginationClass(pageNumber: number): string {
      return this.page === pageNumber ? 'pagination__page--active' : ''
    }
  },
  computed: {
    filteredItems(): number[] {
      let begin = 0
      let step = 6
      let end = step
      if (this.page - 1 > 1 && this.page + 2 < this.totalPages[this.totalPages.length - 1]) {
        begin = this.page - step / 2
        end = this.page + step / 2
      } else if (this.page - 1 <= 1) {
        begin = 0
        end = step
      } else if (this.page + 2 >= this.totalPages[this.totalPages.length - 1]) {
        begin =
          this.totalPages[this.totalPages.length - 1] - step >= 0
            ? this.totalPages[this.totalPages.length - 1] - step
            : 0
        end = this.totalPages[this.totalPages.length - 1]
      }
      return this.totalPages.slice(begin, end)
    }
  },
  mounted() {
    if (this.$route.query.page && this.isStartPagination) {
      this.page = Number(this.$route.query.page)
    } else if (this.isStartPagination) {
      this.page = 1
    }
  },
  watch: {
    page() {
      this.$emit('pagination', {
        nextPage: this.page
      })
    }
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
