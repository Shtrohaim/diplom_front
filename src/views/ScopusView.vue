<template>
    <div class="scopus-info">
        <scopus-article-card class="scopus-info__article-card" />
        <scopus-score-card :data="data" class="scopus-info__score-card"/>
        <scopus-coverage-card :data="data" class="scopus-info__coverage-card" />
        <scopus-journal-card :data="data" class="scopus-info__journal-card" />
    </div>  
</template>
  
<script lang="ts">
    import { defineComponent } from 'vue';
    import ScopusScoreCard from '@/components/ScopusScoreCard.vue';
    import ScopusCoverageCard from '@/components/ScopusCoverageCard.vue';
    import ScopusArticleCard from '@/components/ScopusArticleCard.vue';
    import ScopusJournalCard from '@/components/ScopusJournalCard.vue';

    import scopusService from '@/services/scopusService';

    export default defineComponent({
        name: 'ScopusView',
        components: { 
            ScopusScoreCard, 
            ScopusCoverageCard,
            ScopusArticleCard,
            ScopusJournalCard
        },
        data(){
            return{
                data: [] as any
            }
        },
        methods:{
            fetchData(){
                scopusService.getScopusIssn(this.$route.params.id).then((res)=>{
                    this.data = res.data
                    this.translateTypes()
                })
            },
            translateTypes(){
                switch(this.data.aggregationType){
                    case "tradejournal":
                        this.data.aggregationType = "Ревю"
                        break;
                    case "journal":
                        this.data.aggregationType = "Журнал"
                        break;
                    case "conferenceproceeding":
                        this.data.aggregationType = "Материалы конференции"
                        break;
                    case "bookseries":
                        this.data.aggregationType = "Серия книг"
                        break;
                }
            },
        },
        mounted(){
            this.fetchData()
        }
        
    });
</script>

<style lang="scss">
    .scopus-info {
        display: grid;
        grid-template-columns: 54% 46%;
        grid-row-gap: 20px;
        padding: 20px;

        &__article-card {
            grid-column-start: 1;
            grid-column-end: 2;
            grid-row-start: 1;
            grid-row-end: 3;

            margin: 0 auto;

            width: 600px;
        }

        &__journal-card {
            grid-column-start: 1;
            grid-column-end: 3;
            grid-row-start: 3;
            grid-row-end: 4;

            margin: 0 auto;

            width: 900px;
        }

        &__score-card {
            margin: 0 auto;
        }

        &__journal-card {
            margin: 0 auto;
        }

    }

</style>