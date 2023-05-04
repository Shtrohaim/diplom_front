<template>
  <router-link
    class="scopus-card"
    :to="{ name: 'students_id', params: { id: checkId }, query: { doi: publication?.doi } }"
    @click="sendCookie"
  >
    <h2 class="scopus-card__title h_md">{{ publication.title }}</h2>
    <div class="scopus-card__id-info p_sm">
      <p v-if="publication?.issn">ISSN: {{ publication.issn }}</p>
      <p v-if="publication?.eIssn">EISSN: {{ publication.eIssn }}</p>
    </div>
    <div class="scopus-card__creator-info p_sm">
      <p>Автор: {{ publication.creator }}</p>
      <p>Издатель: {{ publication.publisher }}</p>
    </div>
    <div class="scopus-card__publication-info p_sm">
      <p>Вид публикации: {{ publication.subtypeDescription }}</p>
      <p>Количество цитирований: {{ publication['citedby-count'] }}</p>
      <p class="scopus-card__openaccess">
        Открытый доступ:
        <svg class="icon28">
          <use
            v-if="publication?.openaccessFlag"
            href="@/assets/images/icon_correct.svg#icon"
          ></use>
          <use v-else href="@/assets/images/icon_incorrect.svg#icon"></use>
        </svg>
      </p>
    </div>
  </router-link>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import { useCookies } from 'vue3-cookies'
import type ScopusListType from '@/types/scopusListType'

export default defineComponent({
  name: 'ScopusCard',
  props: {
    publication: {
      type: Object as () => ScopusListType,
      default: () => ({})
    }
  },
  setup(props) {
    const { publication } = toRefs(props)
    const { cookies } = useCookies()

    const checkId = computed(() => {
      if (publication.value.issn) return publication.value.issn
      else return publication.value.eIssn
    })

    const sendCookie = () => {
      cookies.set(publication.value.doi, JSON.stringify(publication.value))
    }

    return { checkId, sendCookie }
  }
})
</script>

<style lang="scss">
.scopus-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;

  padding: 50px;
  margin: 0 auto 20px;

  border-radius: 2px;
  box-shadow: 0 0 12px rgb(0 0 0 / 0.5);

  cursor: pointer;

  color: $black;

  @media (max-width: 769px) {
    padding: 30px;
  }

  &__title {
    align-self: center;
    text-align: center;

    margin-bottom: 20px;
  }

  &__id-info {
    display: flex;
    justify-content: space-around;

    width: 50%;

    margin-bottom: 20px;
  }

  &__creator-info {
    text-align: center;
    margin-bottom: 25px;

    line-height: 30px;
  }

  &__publication-info {
    display: flex;
    justify-content: space-around;
    align-items: center;

    width: 100%;
  }

  &__openaccess {
    display: flex;
    align-items: center;

    svg {
      margin-left: 8px;
    }
  }

  &:hover {
    width: 91%;
    box-shadow: 0 0 25px rgb(0 0 0 / 0.5);
  }
}
</style>
