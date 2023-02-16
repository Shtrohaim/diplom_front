<template>
    <div class="subject-card" :class="subjectModifier">
        <h3 class="subject-card__title">{{ subject }}</h3>
        <a class="subject-card__link" v-for="value, index in data" :key="index" :href="value" target="_blank">{{ index }}</a>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SubjectCard',
    props:{
        data:{
            type: Object,
            default: () => { return {} },
        },
        subject:{
            type: String,
            default: '',
        }
    },
    computed: {
        subjectModifier () : string {
            switch(this.subject){
                case "Русский язык":
                    return "subject-card--russian"
                case "Химия":
                    return "subject-card--chemistry"
                case "Физика":
                    return "subject-card--physics"
                case "История":
                    return "subject-card--history"
                case "Биология":
                    return "subject-card--biology"
                case "География":
                    return "subject-card--geography"
                case "Литература":
                    return "subject-card--literature"
                case "Математика":
                    return "subject-card--mathematics"
                case "Информатика":
                    return "subject-card--informatics"
                case "Информатика и ИКТ":
                    return "subject-card--informatics"
                case "Немецкий язык":
                    return "subject-card--german"
                case "Испанский язык":
                    return "subject-card--spanish"
                case "Обществознание":
                    return "subject-card--society"
                case "Английский язык":
                    return "subject-card--english"
                case "Французский язык":
                    return "subject-card--french"
                case "Китайский язык":
                    return "subject-card--chinese"
                case "Иностранный язык":
                    return "subject-card--foreign-language"
            }
            return ''
        }
    }
});

</script>

<style lang="scss">
    .subject-card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        width: 100%;
    
        padding: 45px 50px;
        padding-right: 25px;
        margin-bottom: 20px;

        border-radius: 2px;
        box-shadow: 0 0 12px rgb(0 0 0 / 0.5);

        background-repeat: no-repeat;
        background-size: 95px;
        background-position: 20px;

        page-break-inside: avoid;
        break-inside: avoid;

        &__title {
            margin-bottom: 32px;
            font-size: 24px;
        }

        &__link {
            display: flex;
            flex-direction: column;

            color: rgb(72 110 242);

            margin-bottom: 10px;
            
            font-size: 20px;
            overflow-wrap: anywhere;
        }

        &--chemistry {
            background-image: url('@/assets/subjectsIcon/chemistry.png');
        }

        &--informatics {
            background-image: url('@/assets/subjectsIcon/informatics.png');
        }
        
        &--mathematics {
            background-image: url('@/assets/subjectsIcon/mathematics.png');
        }

        &--biology {
            background-image: url('@/assets/subjectsIcon/biology.png');
        }
        
        &--chinese {
            background-image: url('@/assets/subjectsIcon/chinese.png');

        }

        &--foreign-language {
            background-image: url('@/assets/subjectsIcon/foreign-language.png');

        }

        &--french {
            background-image: url('@/assets/subjectsIcon/french.png');

        }

        &--geography {
            background-image: url('@/assets/subjectsIcon/geography.png');

        }

        &--history {
            background-image: url('@/assets/subjectsIcon/history.png');

        }

        &--literature {
            background-image: url('@/assets/subjectsIcon/literature.png');

        }

        &--physics {
            background-image: url('@/assets/subjectsIcon/physics.png');

        }

        &--russian {
            background-image: url('@/assets/subjectsIcon/russian.png');

        }

        &--society {
            background-image: url('@/assets/subjectsIcon/society.png');

        }

        &--spanish {
            background-image: url('@/assets/subjectsIcon/spanish.png');

        }

        &--english {
            background-image: url('@/assets/subjectsIcon/english.png');

        }

        &--german {
            background-image: url('@/assets/subjectsIcon/german.png');

        }

    }
</style>