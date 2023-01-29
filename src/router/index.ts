import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegionsList from '../views/RegionsListView.vue'
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
