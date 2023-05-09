<template>
  <div class="search">
    <form class="search__form" @submit="search">
      <div class="search__bar">
        <input ref="searchInput" class="search__input" type="text" placeholder="Искать..." />
        <button class="search__form-button"></button>
      </div>
      <div v-if="$route.query.search" @click="dropSearch" class="search__drop p_sm">
        Сбросить поиск <span></span>
      </div>
      <slot></slot>
    </form>
  </div>
</template>

<script>
import { ref, defineComponent, toRefs, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'BaseSearch',
  props: {
    hasFilter: {
      type: Boolean,
      default: false
    },
    filterData: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const searchInput = ref()
    const router = useRouter()
    const route = useRoute()
    const { hasFilter, filterData } = toRefs(props)

    const search = (event) => {
      event.preventDefault()
      if (!searchInput.value.value.trim()) {
        searchInput.value.focus()
      } else if (hasFilter.value) {
        filterData.value.search = searchInput.value.value.trim()
        if (filterData.value.OPENACCESS == null) delete filterData.value.OPENACCESS
        router.push({ query: filterData.value })
      } else {
        router.push({ query: { search: searchInput.value.value.trim() } })
        searchInput.value = ''
      }
    }
    const dropSearch = () => {
      router.push(route.path)
    }

    onMounted(() => {
      if (route.query.search) {
        searchInput.value.value = String(route.query.search).trim()
      }
    })
    return { search, searchInput, dropSearch }
  }
})
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  &__form {
    display: grid;
    grid-template-columns: 35% 30% 35%;
    align-items: center;
    grid-row-gap: 5px;

    margin-right: 10px;
    width: 100%;

    @media (max-width: 1024px) {
      grid-template-columns: 27% 46% 27%;
    }

    @media (min-width: 320px) and (max-width: 640px) {
      grid-template-columns: 66% 34%;
    }
  }

  &__bar {
    position: relative;
    width: 100%;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    justify-self: end;

    @media (min-width: 320px) and (max-width: 640px) {
      grid-column-start: 1;
      grid-column-end: 2;
      max-width: 300px;
    }
  }

  &__input {
    width: 100%;
    height: 40px;

    border-radius: 100px;
    border-color: rgb(0 102 150);

    padding: 10px 45px 10px 20px;

    text-align: center;

    font-size: 24px;

    @media (max-width: 1023px) {
      height: 35px;
      font-size: 20px;
    }

    @media (min-width: 320px) and (max-width: 640px) {
      font-size: 16px;
    }

    &::placeholder {
      color: $gray-placeholder;
      text-align: center;
    }
  }

  &__drop {
    margin-right: 10px;

    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;

    justify-self: end;

    position: relative;
    display: inline-block;

    padding: 12px 35px 15px 15px;

    border-radius: 25px;

    background-color: rgb(72 110 242);
    color: rgb(255 255 255);

    cursor: pointer;

    @media (min-width: 641px) and (max-width: 1023px) {
      padding-top: 14px;
    }

    @media (min-width: 320px) and (max-width: 640px) {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 2;
      grid-row-end: 3;
      margin: 0 auto;

      padding: 12px 35px 12px 15px;
    }

    &:hover {
      opacity: 0.9;
    }

    span {
      position: absolute;
      right: 10px;
      top: 15px;
      width: 10px;
      height: 10px;

      @media (min-width: 320px) and (max-width: 640px) {
        top: 11px;
      }
    }

    span:before,
    span:after {
      position: absolute;
      content: ' ';
      height: 16px;
      width: 2px;
      background-color: rgb(255 255 255);
    }
    span:before {
      transform: rotate(45deg);
    }
    span:after {
      transform: rotate(-45deg);
    }
  }

  &__form-button {
    position: absolute;
    top: 50%;
    right: 12px;

    transform: translateY(-50%);

    border-radius: 8px;
    border: 0 solid;

    width: 35px;
    height: 35px;

    background-color: rgba(210 210 210 / 0);
    background-image: url('@/assets/images/search.svg');
    background-repeat: no-repeat;
    background-size: 70%;
    background-position: center;

    @media (max-width: 1023px) {
      width: 30px;
      height: 30px;
    }

    &:hover {
      background-color: rgba(210 210 210 / 20%);
      cursor: pointer;
    }
  }
}
</style>
