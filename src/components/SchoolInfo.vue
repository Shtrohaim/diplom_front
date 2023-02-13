<template>
    <div class="school-info">
        <h2 class="school-info__title">{{ data.title }}</h2>
        <p class="school-info__description" v-html="data.description"></p>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import SchoolData from '@/types/schoolDataType';

export default defineComponent({
    name: 'SchoolInfo',
    props: {
        data: {
            type: Object as PropType<SchoolData>,
            default: () => { return {} },
        }
    }
});
</script>