<template>
    <div class="regions">
        <input class="regions__search-bar" type="text" v-model="search" placeholder="Республика Хакасия" />
        <ul class="regions__list">
            <li v-for="region in filteredRegions" :key="region.id" class="regions__list-item">
                <region-card :region="region" />
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import regionsServices from '../services/regionsService'
import Regions from "@/types/regionsType";
import ResponseData from "@/types/responseData";
import RegionCard from '@/components/RegionCard.vue';

export default defineComponent({
    name:'RegionsList',
    components: { RegionCard },
    data() {
        return {
            data: [] as Regions [],
            search: "",
        };
    },
    methods:{
        fetchRegions() {
            return regionsServices.getAllRegions().then((data : ResponseData) =>{
                this.data = data.data
            })
        }
    },
    computed:{
        filteredRegions() : any{
            return this.data.filter((p : any) => {
                return p.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
            })
        }
    },
    mounted() {
        this.fetchRegions()
    },
})

</script>

<style lang="scss">

.regions {
    &__search-bar{
        width: 30%;
        height: 30px;

        margin-bottom: 25px;

        border-radius: 100px;
        border-color: rgb(0, 102, 150);

        text-align: center;

        &::placeholder {
            font-weight: bold;
            opacity: 0.4;
            text-align: center;
        }

    }

    &__list {
        columns: 4 300px;
        column-width: 300px;
    }

    &__list-item {
        margin: 0 auto;
        width: 310px;
        margin-bottom: 15px;
    }
}

</style>