<template>
    <div>
        <label>
            В открытом доступе:
            <input v-model="hasOpenAccess" type="checkbox" />
        </label>
        <label>
            Тип предмета:
            <multi-select v-model="subjType" :options="subjectType" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name" track-by="code" />
        </label>
        <label>
            Тип источника:
            <multi-select v-model="srcType" :options="srcTypeList" :multiple="true" :close-on-select="false" :clear-on-select="false"  placeholder="Pick some" label="name" track-by="code" />
        </label>
        <label>
            Тип документа:
            <multi-select v-model="docType" :options="docTypeList" :multiple="true" :close-on-select="false" :clear-on-select="false"  placeholder="Pick some" label="name" track-by="code" />
        </label>
        <label>
            Опубликован 
            <select v-model="pubYear['operator']">
                <option value="">Не выбрано</option>
                <option value="equal">в</option>
                <option value="greater">после</option>
                <option value="less">до</option>
            </select>
            <input v-model="pubYear['year']" type="number" />
        </label>               
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import scopusService from '@/services/scopusService'
import ResponseData from '@/types/responseData';

import MultiSelect from 'vue-multiselect'
import { LocationQueryValue } from 'vue-router';

export default defineComponent({
    name: "ScopusFilter",
    components: {
        MultiSelect
    },
    data(){
        return {
            docTypeList: [
                { name: "Статьи", code: 'ar' },
                { name: 'Выдержки из докладов', code: 'ab' },
                { name: 'Бизнес статьи', code: 'bz' },
                { name: 'Главы книг', code: 'ch' },
                { name: 'Материалы конференций', code: 'cp' },
                { name: 'Отзывы конференций', code: 'cr' },
                { name: 'Редакции', code: 'ed' },
                { name: 'Исправления', code: 'er' },
                { name: 'Письма', code: 'le' },
                { name: 'Заметки', code: 'no' },
                { name: 'Пресс-релизы', code: 'pe' },
                { name: 'Отзывы', code: 're' },
                { name: 'Краткий обзор', code: 'sh' }
            ] as { name :string, code :string} [],
            srcTypeList: [
                { name: "Журнал", code: 'j' },
                { name: 'Книга', code: 'b' },
                { name: 'Серия  книг', code: 'k' },
                { name: 'Материалы конференции', code: 'p' },
                { name: 'Доклад', code: 'r' },
                { name: 'Ревю', code: 'd' },
            ] as { name :string, code :string} [],
            subjectType: [] as { name :string, code :string} [],
            hasOpenAccess: false as boolean,
            docType: [] as { name :string, code :string} [],
            subjType: [] as { name :string, code :string} [],
            srcType: [] as { name :string, code :string} [],
            pubYear: { operator: ''} as {[key: string] : string},
            data: {} as {[key: string] :{abbrev: string}[]}
        }
    },
    methods:{
        fetchSubjectList() {
            scopusService.getSubjectsList().then((res : ResponseData) => {
                this.data = res.data
            })       
        },
        callEmit(){
            this.$emit("filter", {
                OPENACCESS: Number(this.hasOpenAccess),
                DOCTYPE: this.docType,
                SUBJAREA: this.subjType,
                SRCTYPE: this.srcType,
                PUBYEAR: this.pubYear,
            });
        },
        fillInput(query : string | LocationQueryValue[], list :{ name :string, code :string} [], value :{ name :string, code :string} []){
            if(typeof(query) === 'string' && query){
                value.push({name: String(list.find((el) => el.code === query)?.name), code: String(query)})
            }else if(query){
                for(let i = 0; i < query.length; i++){
                    value.push({name: String(list.find((el) => el.code === query[i])?.name), code: String(query[i])})
                }
            }
        }
    },
    mounted(){
        this.fetchSubjectList()
        if(this.$route.query['doctype']){
            let query = this.$route.query['doctype']
            this.fillInput(query, this.docTypeList, this.docType)
        }
        if(this.$route.query['srctype']){
            let query = this.$route.query['srctype']
            this.fillInput(query, this.srcTypeList, this.srcType)
        }
        if(this.$route.query['openaccess']){
            this.hasOpenAccess = Boolean(this.$route.query['openaccess'])
        }
        if(this.$route.query['pubyear']){
            this.pubYear['operator'] = String(this.$route.query['pubyear_op'])
            this.pubYear['year'] = String(this.$route.query['pubyear_yr'])
        }
    },
    watch: {
        data(){
            for(let index in this.data){
                this.subjectType.push({name: index, code: String(this.data[index][0]['abbrev'])})
            }
            if(this.$route.query['subjtype']){
                let query = this.$route.query['subjtype']
                this.fillInput(query, this.subjectType, this.subjType)
            }
        }
    }
   
});

</script>

<style src="/home/deorel/diplom_app/diplom_front/node_modules/vue-multiselect/dist/vue3-multiselect.css"></style>

<style lang="scss">

</style>