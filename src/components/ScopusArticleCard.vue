<template>
    <div v-if="data.title && $route.query.doi" class="article-card">
        <h3 class="article-card__title">Информация о публикации</h3>
        <p class="article-card__info">Название публикации: {{ data.title }}</p>
        <p class="article-card__info">Автор: {{ data.creator }}</p>
        <p class="article-card__info">DOI: {{ data.doi }}</p>
        <p class="article-card__info">Количество цитирований: {{ data['citedby-count'] }}</p>
        <p class="article-card__info">Тип публикации: {{ data.subtypeDescription }}</p>
        <p class="article-card__info">Том: {{ data.volume }}</p>
        <p class="article-card__info">Доступ: {{ openaccessText }}</p>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useCookies } from 'vue3-cookies'

    export default defineComponent({
        setup() {
            const { cookies } = useCookies();
            return { cookies };
        },
        name: "ScopusArticleCard",
        data(){
            return {
                data : {} as any
            } 
        },
        computed:{
            openaccessText() : string {
                if(this.data.openaccessFlag)
                    return "Открытый"
                else
                    return "Ограниченный"
            }
        },
        mounted(){
            if(this.$route.query.doi)
                this.data = this.cookies.get(this.$route.query.doi.toString());
        }
    });
</script>

<style lang="scss">
    .article-card {
        width: 400px;

        padding-top: 40px;
        padding-bottom: 55px;
        padding-left: 40px;
        padding-right: 20px;

        background-color: #ffffff;

        border-radius: 2px;
        box-shadow: 0 0 12px rgb(0 0 0 / 0.5);

        &__title {
            text-align: center;

            margin-bottom: 50px;

            font-size: 26px;
        }

        &__info {
            margin-bottom: 15px;

            font-size: 22px;
            text-align: left;
            text-indent: 40px;
        }
    }
</style>