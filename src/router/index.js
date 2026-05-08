import { createRouter, createWebHistory } from 'vue-router'
import HomeView    from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'

// 라우트 정의
// path: URL 경로
// name: 라우트 이름 (router.push({ name: '...' }) 로 사용)
// component: 해당 경로에서 렌더링할 컴포넌트
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/product/:id',   // :id → 동적 라우트 파라미터
    name: 'product',
    component: ProductView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // 페이지 이동 시 스크롤 최상단으로
  scrollBehavior: () => ({ top: 0 }),
})

export default router
