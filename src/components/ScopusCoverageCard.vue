<template>
     <div v-if="data.coverageEndYear" class="coverage-card">
        <h3 class="coverage-card__title">Период покрытия Scopus</h3>
        <div v-if="data.coverageEndYear >= currentYear" class="coverage-card__wrapper">
            <p>{{ data.coverageStartYear }}</p>
            <div class="coverage-card__bar">
                <div class="coverage-card__progress" :style="{ width: progressBar + '%' }" >{{ currentYear }} </div>
            </div>
            <p>{{ data.coverageEndYear }}</p>
        </div>
        <div v-else class="coverage-card__message">
            Более не поддерживается!
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: "ScopusCoverageCard",
        props:{
            data: {
                type: Object,
                default: () => { return {} },
            },
        },
        data(){
            return{
                progressBar: 0 as number,
                currentYear: new Date().getFullYear() as number,
            }
        },
        methods:{
            progressYears(){ 
                const currentProcent = ((this.currentYear - this.data.coverageStartYear) * 100) / (this.data.coverageEndYear - this.data.coverageStartYear) 
                if(this.progressBar < currentProcent){
                    this.progressBar++
                    setTimeout(() => this.progressYears(), 15);
                }
            }
        },
        watch: {
            data(){
                this.progressYears()
            }  
        }
    });
</script>

<style lang="scss">
    .coverage-card{
        width: 700px;

        padding-top: 20px;
        padding-bottom: 20px;

        background-color: #ffffff;
        border-radius: 4px;

        box-shadow: 0 0 12px rgb(0 0 0 / 0.5);

        &__title {
            margin-bottom: 50px;

            font-size: 26px;
        }
        
        &__wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &__bar{
            border: 3px solid black;
            width: 500px;
            height: 30px;

            margin: 0 8px;

            border-radius: 10px;

            z-index: 10;
        }

        &__progress{
            height: 100%;
            padding-top: 6px;
            padding-right: 15px;

            color: #ffffff;

            background-color:#486ef2;
            text-align: end;

            font-size: 12px;
            
            border-radius: 5px;

            z-index: 0;
        }

        &__message {
            font-size: 32px;
        }
    }
    
</style>