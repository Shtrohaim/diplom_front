<template>
    <div class="news-card" @click="goToNews">
        <div class="news-card__info-wrapper">
            <img v-if="news.image_url" :src="news.image_url" class="news-card__image" :alt="news.title" />
            <div class="news-card__date" :class="noImageDateClass(!!news.image_url)">
                <p class="news-card__date-day">{{ changeDayFormat(news.date) }}</p>
                <p class="news-card__date-month">{{ changeMonthFormat(news.date) }}</p>
            </div>
        </div>
        <div class="news-card__text-content">
            <h3 class="news-card__title">{{ news.title }}</h3>
            <p class="news-card__description">{{ news.teaser }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import NewsList from '@/types/newsListType';
import { getRuShortMonth, getDayGeneralFormat } from '@/utils/dates';

export default defineComponent({
    name: "NewsCard",
    props:{
        news: {
            type: Object as PropType<NewsList>,
            default: () => { return {} },
        }
    },
    methods:{
        changeMonthFormat(date : string) : string{
           return getRuShortMonth(date)
        },
        changeDayFormat(date : string) : number{
           return getDayGeneralFormat(date)
        },
        noImageDateClass(hasImage : boolean) : string{
            if(hasImage){
                return ""
            }else{
                return "news-card__date--no-image"
            }
        }, 
        goToNews() {
            this.$router.push({ name: 'news', params: {tableName: this.$route.params.tableName, id: this.news.id }  });
        }
    },
})

</script>

<style lang="scss">
.news-card {
    display: flex;

    width: 100%;
    border-radius: 4px;

    background-color: rgb(255 255 255);

    box-shadow: 0 0 12px rgb(0 0 0 / 0.5);
    cursor: pointer;

    padding: 25px;

    &__info-wrapper {
        position: relative;
    }

    &__date {
        position: absolute;
        top: -2px;
        left: -3px;

        width: 60px;
        height: 60px;

        border-radius: 0 10px 0 10px;

        padding: 5px;

        color: rgb(255 255 255);
        background: linear-gradient(150deg, rgba(72,110,242,1) 0%, rgba(74,110,233,1) 43%, rgba(160,132,236,1) 100%);

        box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);

        font-weight: bold;
        text-align: center;

        &--no-image {
            position: relative;
            margin-right: 10px;
        }

    }

    &__date-day {
        font-size: 24px
    }

    &__date-month {
        font-size: 18px;
    }

    &__image {
        width: 180px; 
        height: 180px;

        border-radius: 2px;

        object-fit: cover;
    }

    &__text-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        margin-left: 30px;
    }

    &__title {
        margin-bottom: 30px;
    }

    &__description {
        position: relative;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -moz-box;
        -moz-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        line-clamp: 5;
        box-orient: vertical;

        text-align: left;

        &::before {
            content:'';
            width:100%;
            height:100%;    
            position:absolute;
            left:0;
            top:0;
            background:linear-gradient(transparent 30px, white);
        }
    }
}
</style>