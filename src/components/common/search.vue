<template>
  <div class="search">
    <form class="search__form" @submit="search">
      <div class="search__bar">
        <input ref="searchInput" class="search__input p_sm" type="text" placeholder="Искать..." />
        <button class="search__form-button"></button>
      </div>
      <div v-if="$route.query.search" @click="dropSearch" class="search__drop">
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

<style lang="scss">
.search {
  width: 100%;
  &__form {
    display: grid;
    grid-template-columns: 35% 30% 35%;
    align-items: center;

    margin-right: 10px;
    width: 100%;
  }

  &__bar {
    position: relative;
    width: 100%;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    justify-self: start;
  }

  &__input {
    width: 100%;
    height: 50px;

    border-radius: 100px;
    border-color: rgb(0 102 150);

    padding: 10px 45px 10px 20px;

    text-align: center;

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

    font-size: 20px;

    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }

    span {
      position: absolute;
      right: 10px;
      top: 15px;
      width: 10px;
      height: 10px;
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

    &:hover {
      background-color: rgba(210 210 210 / 20%);
      cursor: pointer;
    }
  }
}
</style>
