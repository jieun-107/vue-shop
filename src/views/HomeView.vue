<template>
  <main class="main">

    <!-- 왼쪽: 상품 목록 -->
    <section class="product-section">

      <CategoryFilter
        :categories="CATEGORIES"
        :selected="selectedCategory"
        @update:category="selectedCategory = $event"
      />

      <div class="product-grid">
        <ProductCard v-for="data in filteredProducts"
          :key="data.id"
          :product="data"
          @go-detail="handleGoDetail(data)"
          @add-to-cart="handleAddToCart(data)" />

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
import { useCartStore } from '../stores/cartStore'
import { PRODUCTS, CATEGORIES } from '../data/products'
import CategoryFilter from '../components/CategoryFilter.vue'
import ProductCard    from '../components/ProductCard.vue'
import CartPanel      from '../components/CartPanel.vue'

const router    = useRouter()
const cartStore = useCartStore()

const selectedCategory = ref('전체')

// TODO: selectedCategory가 '전체'면 PRODUCTS 전체를,
//       아니면 category가 일치하는 상품만 반환하세요
const filteredProducts = computed(() => {
  console.log('PRODUCTS', PRODUCTS);
  console.log('selectedCategory', selectedCategory.value);
  return selectedCategory.value === '전체' ? PRODUCTS : PRODUCTS.filter(product => product.category === selectedCategory.value)
})

// 상품 카드 클릭 → 상세 페이지 이동
// 힌트: router.push({ name: 'product', params: { id: product.id } })
function handleGoDetail(product) {
  // TODO
  router.push({name: 'product', params: { id: product.id }});
}

function handleAddToCart(product) {
  // TODO: cartStore.addItem(product) 호출
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

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
</style>
