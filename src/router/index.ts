import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegionsList from '../views/RegionsListView.vue'
import RegionNewsList from '../views/RegionNewsListView.vue'
import NewsView from '../views/NewsView.vue'
import SchoolView from '../views/SchoolView.vue'
import ScopusListView from '../views/ScopusListView.vue'
import ScopusView from '../views/ScopusView.vue'
import SchoolNavView from '../views/SchoolNavView.vue'
import { MAIN_NEWS_ROUTE_NAME, REGIONS_LIST_ROUTE_NAME, REGION_NEWS_ROUTE_NAME, NEWS_ROUTE_NAME, SCHOOL_ROUTE_NAME, EXAM_ROUTE_NAME, SCOPUS_LIST_ROUTE_NAME, SCOPUS_ROUTE_NAME } from '../constants/routes'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: HomeView
  },
  {
    path: '/news/:tableName',
    name: MAIN_NEWS_ROUTE_NAME,
    component: RegionNewsList
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
    path: '/school',
    name: SCHOOL_ROUTE_NAME,
    component: SchoolNavView
  },
  {
    path: '/school/:examName',
    name: EXAM_ROUTE_NAME,
    component: SchoolView
  },
  {
    path: '/students',
    name: SCOPUS_LIST_ROUTE_NAME,
    component: ScopusListView
  },
  {
    path: '/students/:id',
    name: SCOPUS_ROUTE_NAME,
    component: ScopusView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
