import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/MainView.vue'
import RegionsList from '../views/RegionsView.vue'
import RegionNewsList from '../views/NewsListView.vue'
import NewsView from '../views/NewsView.vue'
import SchoolView from '../views/SchoolView.vue'
import ScopusListView from '../views/ScopusListView.vue'
import ScopusView from '../views/ScopusView.vue'
import SchoolNavView from '../views/SchoolNavView.vue'
import {
  MAIN_NEWS_ROUTE_NAME,
  REGIONS_LIST_ROUTE_NAME,
  REGION_NEWS_ROUTE_NAME,
  NEWS_ROUTE_NAME,
  SCHOOL_ROUTE_NAME,
  EXAM_ROUTE_NAME,
  SCOPUS_LIST_ROUTE_NAME,
  SCOPUS_ROUTE_NAME
} from '@/constants/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: HomeView
    },
    {
      path: '/news/:tableName',
      name: MAIN_NEWS_ROUTE_NAME,
      component: RegionNewsList,
      meta: {
        title: 'Новости'
      }
    },
    {
      path: '/regions_list',
      name: REGIONS_LIST_ROUTE_NAME,
      component: RegionsList,
      meta: {
        title: 'Регионы'
      }
    },
    {
      path: '/region_news/:tableName',
      name: REGION_NEWS_ROUTE_NAME,
      component: RegionNewsList,
      meta: {
        title: 'Новости'
      }
    },
    {
      path: '/region_news/:tableName/:id',
      name: NEWS_ROUTE_NAME,
      component: NewsView,
      meta: {
        title: 'Новости'
      }
    },
    {
      path: '/school',
      name: SCHOOL_ROUTE_NAME,
      component: SchoolNavView,
      meta: {
        title: 'Школьникам'
      }
    },
    {
      path: '/school/:examName',
      name: EXAM_ROUTE_NAME,
      component: SchoolView,
      meta: {
        title: 'Школьникам'
      }
    },
    {
      path: '/students',
      name: SCOPUS_LIST_ROUTE_NAME,
      component: ScopusListView,
      meta: {
        title: 'Студентам'
      }
    },
    {
      path: '/students/:id',
      name: SCOPUS_ROUTE_NAME,
      component: ScopusView,
      meta: {
        title: 'Студентам'
      }
    }
  ]
})
export default router
