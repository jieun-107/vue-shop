<template>
  <div class="app-layout">

    <header class="header">
      <RouterLink to="/" class="logo">🛍️ Vue Shop</RouterLink>

      <nav class="nav">

        <!-- 로그인 상태일 때 -->
        <div class="user-info" v-if="authStore.isLoggedIn">
          <span class="username">{{ authStore.user.name }}</span>님

          <button class="logout-btn" @click="authStore.logout(); router.push('/')">로그아웃</button>
        </div>

        <!-- 로그아웃 상태일 때 -->
        <RouterLink v-else to="/login" class="login-link">로그인</RouterLink>

        <!-- 장바구니 아이콘 → /cart 페이지로 이동 -->
        <!--
          TODO: RouterLink 로 '/cart' 경로와 연결하세요
                cartStore.totalCount > 0 일 때만 뱃지를 표시하세요
        -->
        <RouterLink to="/cart">
          <div class="cart-icon-wrap" v-if="cartStore.totalCount > 0">
            <span>🛒</span>
            <span class="badge">{{ cartStore.totalCount }}</span>
          </div>
        </RouterLink>
      </nav>
    </header>

    <RouterView />

    <ToastNotification />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from './stores/cartStore'
import { useAuthStore } from './stores/authStore'
import ToastNotification from './components/ToastNotification.vue'

const cartStore = useCartStore()
const authStore = useAuthStore()
</script>

<style scoped>
.app-layout { min-height: 100vh; }

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #fff;
  border-bottom: 1px solid #e8e8e3;
  position: sticky;
  top: 0;
  z-index: 10;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
  color: inherit;
}

.nav {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #555;
}

.username { font-weight: 600; color: #1a1a1a; }

.logout-btn {
  background: none;
  border: none;
  font-size: 13px;
  color: #aaa;
  text-decoration: underline;
  padding: 0;
  transition: color 0.15s;
}

.logout-btn:hover { color: #e74c3c; }

.login-link {
  font-size: 14px;
  color: #555;
  text-decoration: none;
  transition: color 0.15s;
}

.login-link:hover { color: #1a1a1a; }

.cart-icon-wrap {
  position: relative;
  font-size: 24px;
  text-decoration: none;
  color: inherit;
}

.badge {
  position: absolute;
  top: -6px;
  right: -10px;
  background: #e74c3c;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}
</style>
