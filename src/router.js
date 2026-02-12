import { createRouter, createWebHistory } from 'vue-router'
import Editor from './editor/Editor.vue'
import Setting from './setting/Setting.vue'

const routes = [
  { path: '/editor', component: Editor },
  { path: '/setting', component: Setting },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
