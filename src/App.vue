<template>
  <div class="app-layout">

    <!-- 상단 헤더 -->
    <header class="header">
      <h1 class="logo">🛍️ Vue Shop</h1>

      <!-- 장바구니 아이콘 + 수량 뱃지 -->
      <div class="cart-icon-wrap">
        <span class="cart-icon">🛒</span>
        <span v-if="cartStore.totalCount > 0" class="badge">{{ cartStore.totalCount }}</span>
      </div>
    </header>

    <!-- 메인 콘텐츠: 상품목록 + 카트 -->
    <main class="main">

      <!-- 왼쪽: 상품 목록 영역 -->
      <section class="product-section">

        <!-- 카테고리 필터 -->
        <CategoryFilter
          :categories="CATEGORIES"
          :selected="selectedCategory"
          @update:category="handleSelect"
        />

        <!-- 상품 카드 목록 -->
        <div class="product-grid">
          <!-- ProductCard 여기에 -->
           <ProductCard v-for="data in filteredProducts" :key="data.id" :product="data" @add-to-cart="handleAddToCart(data)"
           />
        </div>

      </section>

      <!-- 오른쪽: 장바구니 패널 -->
      <aside class="cart-section">
        <CartPanel />
      </aside>

    </main>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from './stores/cartStore'
import { PRODUCTS, CATEGORIES } from './data/products'
import CategoryFilter from './components/CategoryFilter.vue'
import ProductCard    from './components/ProductCard.vue'
import CartPanel      from './components/CartPanel.vue'

// Pinia 스토어 가져오기
const cartStore = useCartStore()

// 현재 선택된 카테고리 (기본값: '전체')
const selectedCategory = ref('전체')

// 카테고리로 필터링된 상품 목록
const filteredProducts = computed(() => {
  if(selectedCategory.value === '전체') return PRODUCTS;
  return PRODUCTS.filter(product => product.category === selectedCategory.value);
})

function handleAddToCart(product) {
  cartStore.addItem(product);
  console.log('Added to cart:', product);
}

function handleSelect(category) {
  selectedCategory.value = category;
}

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

.main {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .main {
    grid-template-columns: 1fr;
  }
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
</style>
