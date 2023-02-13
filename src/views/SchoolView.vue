<template>
    <ul>
      <li v-for="item in data" :key="item.id" @click="tabulation(item)">{{ item.title }}</li>
    </ul>
    <school-info v-if="isInfo" :data="propData" />
    <school-subjects v-else :data="propData" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SchoolData from '@/types/schoolDataType';
import schoolService from '@/services/schoolService'
import SchoolInfo from '@/components/SchoolInfo.vue';
import SchoolSubjects from '@/components/SchoolSubjects.vue';

export default defineComponent({
  name: 'SchoolView',
  components: {
    SchoolInfo,
    SchoolSubjects
  },
  data(){
    return {
      data: [] as SchoolData [],
      isInfo: true as boolean,
      propData: {} as SchoolData,
    }
  },
  methods: {
    getFipiData() {
      schoolService.getFipiInfo(this.$route.params.examName).then((res)=>{
        this.data = res.data
        this.propData = this.data[0]
      })
    },
    tabulation(item : SchoolData) {
      if(typeof(item.info) !== "object"){
        this.isInfo = true;
      }else{
        this.isInfo = false;
      }
      this.propData = item;
    }
  },
  mounted(){
    this.getFipiData();
  }
});
</script>
