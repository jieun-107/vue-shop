import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import HomeView          from '../views/HomeView.vue'
import ProductView       from '../views/ProductView.vue'
import LoginView         from '../views/LoginView.vue'
import CartView          from '../views/CartView.vue'
import OrderCompleteView from '../views/OrderCompleteView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    // meta.requiresAuth: true → Navigation Guard 에서 로그인 여부를 확인합니다
    path: '/cart',
    name: 'cart',
    component: CartView,
    meta: { requiresAuth: true },
  },
  {
    path: '/order-complete',
    name: 'order-complete',
    component: OrderCompleteView,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

// ---------------------------------------------------------------
// Navigation Guard (전역 가드)
// 모든 페이지 이동 전에 실행됩니다.
// to: 이동할 라우트 / from: 현재 라우트 / next: 진행 함수 (생략 가능)
// ---------------------------------------------------------------
router.beforeEach((to) => {
  const authStore = useAuthStore(); // 스토어 가져오기
  if(to.meta.requiresAuth) {
    if(!authStore.isLoggedIn) {
      return { name: 'login', query: { redirect: to.fullPath } }
    }
  }
  
})

export default router
