<template>
  <div v-if="publication.title && $route.query.doi" class="article-card">
    <h3 class="article-card__title h_md">Информация о публикации</h3>
    <p class="article-card__info p_sm">Название публикации: {{ publication.title }}</p>
    <p class="article-card__info p_sm">Автор: {{ publication.creator }}</p>
    <p class="article-card__info p_sm">DOI: {{ publication.doi }}</p>
    <p class="article-card__info p_sm">
      Количество цитирований: {{ publication['citedby-count'] }}
    </p>
    <p class="article-card__info p_sm">Тип публикации: {{ publication.subtypeDescription }}</p>
    <p class="article-card__info p_sm">Том: {{ publication.volume }}</p>
    <p class="article-card__info p_sm">Доступ: {{ openAccessText }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useCookies } from 'vue3-cookies'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ScopusArticleCard',
  setup() {
    const { cookies } = useCookies()
    const publication = ref({} as any)
    const route = useRoute()

    const openAccessText = computed(() => {
      if (publication.value.openaccessFlag) return 'Открытый'
      else return 'Ограниченный'
    })

    onMounted(() => {
      if (route.query.doi) publication.value = cookies.get(route.query.doi.toString())
    })
    return { publication, openAccessText }
  }
})
</script>

<style lang="scss">
.article-card {
  width: 400px;

  padding: 40px 20px 55px 40px;

  background-color: $white;

  border-radius: 2px;
  box-shadow: 0 0 12px rgb(0 0 0 / 0.5);

  &__title {
    text-align: center;

    margin-bottom: 50px;
  }

  &__info {
    margin-bottom: 15px;

    text-align: left;
    text-indent: 40px;
  }
}
</style>
