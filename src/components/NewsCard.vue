<template>
    <div class="news-card">
        <div>
            <img :src="news.image_url[0]" class="news-card__image" />
            <p class="news-card__date">{{ news.date }}</p>
        </div>
        <div class="news-card__text-content">
            <h3 class="news-card__title">{{ news.title }}</h3>
            <p class="news-card__description">{{ setTeaser }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "NewsCard",
    props:{
        news: {} as any
    },
    computed:{
        setTeaser() : string {
            if(Object.keys(this.news.description).length >= 2){
                return `${this.news.description[0].replace(/(<br>)/gi, "")} ${this.news.description[1].replace(/(<br>)/gi, "")}`
            }else{
                return this.news.description[0].replace(/(<br>)/gi, "");
            }
            
        }
    }
})

</script>

<style lang="scss">
.news-card {
    display: flex;

    width: 100%;
    border: 1px solid black;

    padding: 25px;

    &__image {
        width: 180px; 
        height: 180px;

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