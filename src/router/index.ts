import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegionsList from '../views/RegionsListView.vue'
import RegionNewsList from '../views/RegionNewsListView.vue'
import NewsView from '../views/NewsView.vue'
import SchoolView from '../views/SchoolView.vue'
import StudentsView from '../views/StudentsView.vue'
import { REGIONS_LIST_ROUTE_NAME, REGION_NEWS_ROUTE_NAME, NEWS_ROUTE_NAME, SCHOOL_ROUTE_NAME, STUDENTS_ROUTE_NAME } from '../constants/routes'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/regions_list',
    name: REGIONS_LIST_ROUTE_NAME,
    component: RegionsList
  },
  {
    path: '/region_news/:tableName',
    name: REGION_NEWS_ROUTE_NAME,
    component: RegionNewsList
  },
  {
    path: '/region_news/:tableName/:id',
    name: NEWS_ROUTE_NAME,
    component: NewsView
  },
  {
    path: '/school/:examName',
    name: SCHOOL_ROUTE_NAME,
    component: SchoolView
  },
  {
    path: '/students',
    name: STUDENTS_ROUTE_NAME,
    component: StudentsView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
