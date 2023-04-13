<template>
  <div class="scopus-card" @click="goToScopusPage" @click.middle="openInNewTab">
    <h2>{{ data.title }}</h2>
    <div>
      <p v-if="data.issn">ISSN: {{ data.issn }}</p>
      <p v-if="data.eIssn">EISSN: {{ data.eIssn }}</p>
    </div>
    <div>
      <p>Автор: {{ data.creator }}</p>
      <p>Издатель: {{ data.publisher }}</p>
    </div>
    <div>
      <p>Вид публикации: {{ data.subtypeDescription }}</p>
      <p>Количество цитирований: {{ data['citedby-count'] }}</p>
      <p>Открытый доступ: {{ data.openaccessFlag }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCookies } from 'vue3-cookies'

export default defineComponent({
  setup() {
    const { cookies } = useCookies()
    return { cookies }
  },
  name: 'SrudentScopusCard',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    goToScopusPage() {
      const id = this.checkId()
      this.cookies.set(this.data.doi, JSON.stringify(this.data))
      this.$router.push({ name: 'students_id', params: { id: id }, query: { doi: this.data.doi } })
    },
    openInNewTab() {
      const id = this.checkId()
      this.cookies.set(this.data.doi, JSON.stringify(this.data))
      const routeData = this.$router.resolve({
        name: 'students_id',
        params: { id: id },
        query: { doi: this.data.doi }
      })
      window.open(routeData.href, '_blank')
    },
    checkId(): number {
      if (this.data.issn) return this.data.issn
      else return this.data.eIssn
    }
  },
  computed: {}
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
