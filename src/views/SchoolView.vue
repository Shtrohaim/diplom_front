<template>
  <div class="school-page">
    <nav class="school-page__nav">
      <ul class="school-page__list">
        <li class="school-page__list-item" :class="activeTab(item)" v-for="item in data" :key="item.id" @click="tabulation(item)">{{ item.title }}</li>
      </ul>
    </nav>
    <school-info class="school-page__info" v-if="isInfo" :data="propData" />
    <school-subjects class="school-page__subjects" v-else :data="propData" />
  </div>
  
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
    SchoolSubjects,
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
    },
    activeTab(item : SchoolData) : string {
      return item.title === this.propData.title ? "school-page__list-item--active" : ""
    }
  },
  mounted(){
    this.getFipiData();
  }
});
</script>

<style lang="scss">
  .school-page {
    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    &__nav {
      width: 80%;
      margin: 0 auto;

      text-align: center;

      padding: 0;

      margin-bottom: 60px;
    }

    &__list-item {

      padding: 12px;

      border-radius: 8px;
      box-shadow: 0 8px 12px -5px rgb(0 0 0 / 0.5);
      
      z-index: 10px;

      break-inside: none;
      page-break-inside: none;

      cursor:pointer;

      &--active {
        margin: -2px -5px;
        padding: 12px 18px;
        box-shadow: 0 15px 20px -5px rgb(0 0 0 / 0.5);
        cursor: default;

        background: #fbfbfb;
        z-index: 12;
      } 
    }
  }
</style>
