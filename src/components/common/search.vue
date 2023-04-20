<template>
  <div class="search">
    <form class="search__form" @submit="search">
      <input ref="searchInput" class="search__input" type="text" placeholder="Искать..." />
      <button class="search__form-button"></button>
    </form>
    <slot></slot>
    <div v-if="$route.query.search" @click="dropSearch" class="search__drop">
      Сбросить поиск <span></span>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, toRefs, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'BaseSearch',
  emits: ['search'],
  props: {
    hasFilter: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const searchInput = ref()
    const router = useRouter()
    const route = useRoute()
    const { hasFilter } = toRefs(props)

    const search = (event) => {
      event.preventDefault()
      if (hasFilter.value) {
        emit('search', {
          searchText: searchInput.value.value
        })
      } else if (searchInput.value.value.trim()) {
        router.push({ query: { search: searchInput.value.value.trim() } })
        searchInput.value = ''
      } else {
        searchInput.value.focus()
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
  &__form {
    position: relative;
    margin-right: 10px;
    width: 100%;
  }

  &__input {
    width: 100%;
    height: 35px;

    border-radius: 100px;
    border-color: rgb(0 102 150);

    text-align: center;

    &::placeholder {
      font-weight: bold;
      opacity: 0.4;
      text-align: center;
    }
  }

  &__drop {
    position: relative;
    display: inline-block;

    padding: 15px;
    padding-right: 35px;

    border-radius: 25px;

    background-color: rgb(72 110 242);
    color: rgb(255 255 255);

    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }

    span {
      position: absolute;
      right: 15px;
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
    top: 3px;
    right: 12px;

    border-radius: 8px;
    border: 0 solid;

    width: 30px;
    height: 30px;

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
