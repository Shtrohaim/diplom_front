<template>
    <div class="school-subjects">
        <h2 class="school-subjects__title">{{ data.title }}</h2>
        <p class="school-subjects__description">{{ data.description }}</p>
        <ul class="school-subjects__list">
            <li class="school-subjects__list-item" v-for="subject in Object.keys(data.info)" :key="subject"> 
                <subject-card class="school-subjects__card" :data="data" :subject="subject" />
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import SchoolData from '@/types/schoolDataType';
import SubjectCard from './SubjectCard.vue';

export default defineComponent({
    name: 'SchoolSubjects',
    props: {
        data: {
            type: Object as PropType<SchoolData>,
            default: () => { return {} },
        }
    },
    components:{
        SubjectCard,
    }
});
</script>
<style lang="scss">
    .school-subjects {
        &__list {
            columns: 3 450px;
        }

        &__list-item {
            width: 450px;
            margin: 0 auto;
        }

        &__title {
            margin-bottom: 40px;
            font-size: 28px;
        }

        &__description {
            margin: 0 auto;
            width: 80%;
            margin-bottom: 50px;
            font-size: 24px;
        }
    }
</style>