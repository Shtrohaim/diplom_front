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

<style lang="scss">
    .school-info {
        &__title {
            margin-bottom: 40px;
            font-size: 28px;
        }

        &__description {
            text-align: left;
            margin: 0 auto;
            font-size: 24px;
            width: 75%;

            a {
                color: rgb(72 110 242);
            }

            ul {
                margin-bottom: 20px;
            }

            li {
                list-style-type: disc;
                margin-left: 50px;
            }
        }
    }
</style>