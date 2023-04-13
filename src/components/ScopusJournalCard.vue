<template>
    <div v-if="data['subject-area']" class="journal-card">
        <h3 class="journal-card__title">Информация об издателе</h3>
        <p class="journal-card__info">Название: {{ data.title }}</p>
        <p class="journal-card__info">Тип издателя: {{ data.aggregationType }}</p>
        <p class="journal-card__info">Публикуется в {{ data.publisher }}</p>
        <p v-if="data.eIssn" class="journal-card__info">EISSN: {{ data.eIssn }}</p>
        <p v-if="data.issn" class="journal-card__info">ISSN: {{ data.issn }}</p>
        <p class="journal-card__info">Отрасль знаний: {{ data['subject-area'][0]['$'] }}</p>
        <p v-if="data['subject-area'].length > 1" class="journal-card__info">Подотрасль: <span v-for="subarea in filteredAreas" :key="subarea['@code']">{{ subarea['$'] }}</span></p>
        <a :href="data['origin-link']" class="journal-card__link">Перейти на сайт издателя</a>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: "ScopusJournalCard",
        props:{
            data: {
                type: Object,
                default: () => { return {} },
            },
        },
        computed: {
            filteredAreas(): any {
                let areas = this.data['subject-area'].slice()
                areas.shift()
                return areas;
            },
        },
    });
</script>

<style lang="scss">
    .journal-card {
        width: 400px;

        padding-top: 40px;
        padding-bottom: 55px;
        padding-left: 40px;
        padding-right: 20px;

        background-color: #ffffff;

        border-radius: 2px;
        box-shadow: 0 0 12px rgb(0 0 0 / 0.5);

        &__title {
            margin-bottom: 50px;

            font-size: 26px;
        }

        &__info {
            margin-bottom: 5px;

            font-size: 22px;
            text-align: left;

            span {
                &::after {
                    content: ", ";
                }
                
            }

            span:last-child {
                &::after {
                    content: "";
                }
            }
        }

        &__link {
            display: block;

            margin-top: 40px;
            font-size: 26px;

            color: #486ef2;
        }
    }
</style>