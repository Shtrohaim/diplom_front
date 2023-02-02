<template>
      <div class="region-card" @click="goToRegion" @click.middle="openInNewTab">
            <img class="region-card__image" :src="`http://localhost:3000/img/${region.img}`" :alt="`Герб ${region.name}`"  />
            <h3>{{ region.name }}</h3>
        </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Regions from '@/types/regionsType';

export default defineComponent({
    name: 'RegionCard',
    props: {
        region: {
            type: Object as PropType<Regions>,
            default: () => { return {} },
        } 
    },
    methods:{
        goToRegion(){
            localStorage.page = 1
            localStorage.pageName = this.region.tableName
            this.$router.push({ name: 'region_news', params: {tableName: this.region.tableName}  });
        },
        openInNewTab (){
            const routeData = this.$router.resolve({ name: 'region_news', params: {tableName: this.region.tableName}  });
            window.open(routeData.href, '_blank')
        }
    }

});

</script>

<style lang="scss">
    .region-card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        margin: 0 auto;

        width: 95%;
        padding: 20px;

        order: 999;
        
        border-radius: 2px;
        box-shadow: 0 0 12px rgb(0 0 0 / 0.5);
        cursor: pointer;

        page-break-inside: avoid;
        break-inside: avoid;

        &__image{
            width: 100px;
        }

        &:hover{
            width: 100%;
            box-shadow: 0 0 25px rgb(0 0 0 / 0.5);
        }
    }
</style>