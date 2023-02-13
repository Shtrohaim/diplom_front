<template>
    <div class="school-subjects">
        <h2 class="school-subjects__title">{{ data.title }}</h2>
        <p class="school-subjects__description">{{ data.description }}</p>
        <ul class="school-subjects__list">
            <li class="school-subjects__list-item" v-for="subject in Object.keys(data.info)" :key="subject"> 
                <div class="school-subjects__card subject-card">
                    <h3 class="subject-card__title">{{ subject }}</h3>
                    <a class="subject-card__link" v-for="link in Object.keys(data.info[subject])" :key="link" :href="data.info[subject][link]" target="_blank">{{ link }}</a>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import SchoolData from '@/types/schoolDataType';

export default defineComponent({
    name: 'SchoolSubjects',
    props: {
        data: {
            type: Object as PropType<SchoolData>,
            default: () => { return {} },
        }
    }
});
</script>