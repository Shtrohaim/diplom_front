<template>
  <router-link
    class="scopus-card"
    :to="{ name: 'students_id', params: { id: checkId }, query: { doi: publication?.doi } }"
    @click="sendCookie"
  >
    <h2>{{ publication.title }}</h2>
    <div>
      <p v-if="publication?.issn">ISSN: {{ publication.issn }}</p>
      <p v-if="publication?.eIssn">EISSN: {{ publication.eIssn }}</p>
    </div>
    <div>
      <p>Автор: {{ publication.creator }}</p>
      <p>Издатель: {{ publication.publisher }}</p>
    </div>
    <div>
      <p>Вид публикации: {{ publication.subtypeDescription }}</p>
      <p>Количество цитирований: {{ publication['citedby-count'] }}</p>
      <p>Открытый доступ: {{ publication.openaccessFlag }}</p>
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
  align-items: flex-start;
  width: 80%;

  padding: 45px 50px;
  padding-right: 25px;
  margin-bottom: 20px;

  border-radius: 2px;
  box-shadow: 0 0 12px rgb(0 0 0 / 0.5);

  cursor: pointer;

  &:hover {
    width: 85%;
    box-shadow: 0 0 25px rgb(0 0 0 / 0.5);
  }
}
</style>
