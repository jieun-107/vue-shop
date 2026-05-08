<template>
  <main class="main">

    <!-- 왼쪽: 상품 목록 -->
    <section class="product-section">

      <!-- 검색 + 찜 카운트 -->
      <div class="search-row">
        <input class="search-input" v-model="searchQuery" type="text" placeholder="상품명 검색..." />

        <!-- 찜한 상품 수 표시 -->
        <div class="wish-count" v-if="wishlistStore.count > 0">
          ❤️ <span>{{ wishlistStore.count }}</span>개
        </div>
      </div>

      <CategoryFilter
        :categories="CATEGORIES"
        :selected="selectedCategory"
        @update:category="selectedCategory = $event"
      />

      <!-- 검색 결과 없을 때 -->
      <div class="empty-result" v-if="!filteredProducts">
        🔍 '<strong>{{ searchQuery }}</strong>' 에 대한 결과가 없어요.
      </div>

      <div class="product-grid">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @go-detail="handleGoDetail"
          @add-to-cart="handleAddToCart"/>
      </div>

    </section>

    <!-- 오른쪽: 장바구니 패널 -->
    <aside>
      <CartPanel />
    </aside>

  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore }     from '../stores/cartStore'
import { useWishlistStore } from '../stores/wishlistStore'
import { PRODUCTS, CATEGORIES } from '../data/products'
import CategoryFilter from '../components/CategoryFilter.vue'
import ProductCard    from '../components/ProductCard.vue'
import CartPanel      from '../components/CartPanel.vue'

const router         = useRouter()
const cartStore      = useCartStore()
const wishlistStore  = useWishlistStore()

const selectedCategory = ref('전체')

// 검색어
const searchQuery = ref('')

// 카테고리 + 검색어를 동시에 적용한 상품 목록
const filteredProducts = computed(() => {
  return PRODUCTS.filter(p => {
    // 1. 카테고리 조건
    const isCategoryMatch = selectedCategory.value === '전체' || p.category === selectedCategory.value;
    
    // 2. 검색어 조건 (searchQuery.value가 있는지 확인 필수)
    const isSearchMatch = !searchQuery.value || 
                          p.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    // 두 조건을 모두 만족하는 것만 반환
    return isCategoryMatch && isSearchMatch;
  });
})

function handleGoDetail(product) {
  router.push({name: 'product', params: {id: product.id}});
}

function handleAddToCart(product) {
  cartStore.addItem(product);
}
</script>

<style scoped>
.main {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .main { grid-template-columns: 1fr; }
}

.search-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0.75rem;
}

.search-input {
  flex: 1;
  padding: 8px 14px;
  border: 1px solid #e8e8e3;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s;
  font-family: inherit;
}

.search-input:focus { border-color: #aaa; }

.wish-count {
  font-size: 13px;
  color: #e74c3c;
  white-space: nowrap;
  font-weight: 600;
}

.empty-result {
  margin-top: 1rem;
  font-size: 14px;
  color: #aaa;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
</style>
