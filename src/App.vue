<template>
  <div class="app-layout">

    <header class="header">
      <!-- 로고 클릭 시 홈으로 이동 (RouterLink = <a> 태그 대신 사용) -->
      <RouterLink to="/" class="logo">🛍️ Vue Shop</RouterLink>

      <div class="cart-icon-wrap">
        <span class="cart-icon">🛒</span>
        <span class="badge" v-if="cartStore.totalCount > 0">
          {{ cartStore.totalCount }}
        </span>
      </div>
    </header>

    <!-- 현재 라우트에 맞는 View 컴포넌트가 여기에 렌더링됩니다 -->
    <RouterView />

  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from './stores/cartStore'

const cartStore = useCartStore()
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
}

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

.cart-icon-wrap {
  position: relative;
  font-size: 24px;
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
