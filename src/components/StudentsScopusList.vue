<template>
    <div>
        <form :onSubmit="searchData">
            <input ref="searchInput" type="text" />
            <select ref="searchType">
                <option value="ALL">Все</option>
                <option value="DOI">DOI</option>
                <option value="ISSN">ISSN</option>
                <option value="EISSN">EISSN</option>
                <option value="AUTHOR">Автор</option>
                <option value="PUBLISHER">Издатель</option>
            </select>
            <button>Search</button>
        </form>
        <loading-screen v-if="loading" />
        <ul v-else>
            <li v-for="item in data" :key="item.eid">
                <div>
                    <h2>{{ item.title }}</h2>
                    <p>{{ item.doi }}</p>
                </div>
            </li>
        </ul>
        <pagination v-if="isActivePagination" ref="pagination" :isStartPagination="false" :totalPages="totalPages" @pagination="onPagination"  />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Pagination from './common/pagination.vue';
import scopusService from '@/services/scopusService'
import ScopusList from '@/types/scopusList'
import ResponseData from '@/types/responseData';
import LoadingScreen from './common/loading.vue'

export default defineComponent({
    name: 'ScopusList',
    components:{
        Pagination, LoadingScreen
    },
    data(){
        return {
            data: [] as ScopusList[],
            page: 1 as number,
            size: 25 as number,
            totalPages: [] as number [],
            loading: false as boolean,
            search: {} as { type: string, field: string},
            filter: {} as string,
            isActivePagination: false as boolean,
        }
    },
    methods:{
        fetchScopusData() {
            scopusService.getScopusData(this.size, this.page, this.search, this.filter).then((res : ResponseData) => {
                this.data = res.data.data
                this.getAllPagesList(res.data.totalPages)
                this.loading = false
            })
        },
        getAllPagesList(pages: number) {
          let newPages = [] as number [];
          for(let n = 1; n <= pages; n++){
              newPages.push(n);
          }
          this.totalPages = newPages
        },
        scrollView() {
            window.scrollTo({
              top: 0,
              behavior: "smooth"
          })
        },
        onPagination (data : {nextPage: number}) {
          this.page = data.nextPage;
          this.loading = true;
          this.fetchScopusData();
          this.scrollView();
        },
        searchData(e : Event) {
          e.preventDefault();
          if((this.$refs['searchInput'] as HTMLFormElement).value.trim()){
            this.search['type'] = (this.$refs['searchType'] as HTMLFormElement).value
            this.search['field'] = (this.$refs['searchInput'] as HTMLFormElement).value.trim()
            this.$router.push({query: {search: this.search['field'], type: this.search['type']}})
            this.isActivePagination = true;
            this.loading = true;
            this.fetchScopusData();
            setTimeout(() => {
                (this.$refs['pagination'] as HTMLFormElement).page = 1;
                }, 0);
            (this.$refs['searchInput'] as HTMLFormElement).value = ""
          }else{
            (this.$refs['searchInput'] as HTMLFormElement).focus()
          }
        
        }
    }, 
    mounted(){
            if(this.$route.query.search && this.$route.query.type){
                this.search['type'] = this.$route.query.type.toString();
                this.search['field'] = this.$route.query.toString();
                this.isActivePagination = true;
                setTimeout(() => {
                    if(this.$route.query.page){
                        (this.$refs['pagination'] as HTMLFormElement).page = Number(this.$route.query.page);
                    }else{
                        (this.$refs['pagination'] as HTMLFormElement).page = 1;
                    }
                }, 0)
            }
        }
});
</script>