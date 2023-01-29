import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegionsList from '../views/RegionsListView.vue'
import About from '../views/AboutView.vue'
import { REGIONS_LIST_ROUTE_NAME } from '../constants/routes'

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
    name: 'region_news',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
