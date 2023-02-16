<template>
    <div>
        <label>
            В открытом доступе:
            <input v-model="hasOpenAccess" type="checkbox" />
        </label>
        <label>
            Тип предмета:
            <select v-model="subjType">
                <option value="">Любое</option>
                <option v-for="value, index in subjectType" :key="index" :value="value[0].abbrev">{{ index }}</option>
            </select>
        </label>
        <label>
            Тип источника:
            <select v-model="srcType">
                <option value="">Любое</option>
                <option value="j">Журнал</option>
                <option value="b">Книга</option>
                <option value="k">Серия книг</option>
                <option value="p">Материалы конференции</option>
                <option value="r">Доклад</option>
                <option value="d">Ревю</option>
            </select>
        </label>
        <label>
            Тип документа:
            <select v-model="docType">
                <option value="">Любое</option>
                <option v-for="value, index in docTypeList" :key="index" :value="index">{{ value }}</option>
            </select>
        </label>
        
        <label>
            Опубликован 
            <select v-model="pubYear['operator']">
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

export default defineComponent({
    name: "ScopusFilter",
    data(){
        return {
            docTypeList: { 
                "ar" : "Статьи", "ab" : "Выдержки из докладов",
                "bk" : "Книги", "bz" : "Бизнес статьи", 
                "ch" : "Главы книг", "cp" : "Материалы конференций", 
                "cr" : "Отзывы конференций", "ed" : "Редакции", 
                "er" : "Исправления", "le" : "Письма", 
                "no" : "Заметки", "pe" : "Пресс-релизы",
                "re" : "Отзывы", "sh" : "Краткий обзор",
            },
            subjectType: {} as { [key: string] : {[key: string] : string}[] },
            hasOpenAccess: false as boolean,
            docType: '' as string,
            subjType: '' as string,
            srcType: '' as string,
            pubYear: { operator: 'equal'} as {[key: string] : string},
        }
    },
    methods:{
        fetchSubjectList() {
            scopusService.getSubjectsList().then((res : ResponseData) => {
                this.subjectType = res.data
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
        }
    },
    mounted(){
        this.fetchSubjectList()
        if(this.$route.query['openaccess']){
            this.hasOpenAccess = Boolean(this.$route.query['openaccess'])
            this.docType = String(this.$route.query['doctype'])
            this.subjType = String(this.$route.query['subjtype'])
            this.srcType = String(this.$route.query['srctype'])
            this.pubYear['operator'] = String(this.$route.query['pubyear_op'])
            this.pubYear['year'] = String(this.$route.query['pubyear_yr'])
        }
    },
   
});

</script>