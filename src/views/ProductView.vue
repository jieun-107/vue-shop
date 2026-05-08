<template>
  <div class="page">

    <!-- 상품을 찾지 못했을 때 -->
    <div v-if="!product" class="not-found">
      <p>😢 상품을 찾을 수 없어요.</p>
      <button class="back-btn" @click="router.push('/')">목록으로 돌아가기</button>
    </div>

    <!-- 상품이 있을 때 -->
    <template v-else>

      <!-- 뒤로가기 버튼 -->
      <button class="back-btn" @click="router.back()">← 목록으로</button>

      <div class="detail-card">

        <!-- 상품 이미지 영역 -->
        <div class="image-area">
          <span class="big-emoji">{{ product.emoji }}</span>
        </div>

        <!-- 상품 정보 -->
        <div class="info-area">

          <span class="category-tag">{{ product.category }}</span>

          <h1 class="name">{{ product.name }}</h1>

          <p class="price">₩{{product.price.toLocaleString()}}</p>

          <p class="desc">{{ product.description }}</p>

          <!-- 배송 안내 -->
          <div class="shipping-notice">
            <span>🚚</span>
            <span>{{ product.price * qty >= FREE_SHIPPING_THRESHOLD ? '무료배송' : `배송비: ₩${SHIPPING_FEE.toLocaleString()}` }}</span>
          </div>

          <!-- 수량 선택 -->
          <div class="qty-row">
            <span class="qty-label">수량</span>
            <div class="qty-control">
              <button class="qty-btn" @click="qty > 1 && qty--">−</button>
              <span class="qty-num">{{ qty }}</span>
              <button class="qty-btn" @click="qty++">+</button>
            </div>
          </div>

          <!-- 소계 -->
          <p class="subtotal">합계: <strong>₩{{ (product.price * qty).toLocaleString() }}</strong></p>

          <!-- 버튼 -->
          <div class="btn-group">
            <button class="cart-btn" @click="handleAddToCart">{{ isInCart ? '✓ 장바구니에 있음' : '🛒 장바구니 담기' }}</button>

            <button class="home-btn" @click="router.push('/')">계속 쇼핑하기</button>
          </div>

        </div>
      </div>

      <!-- 관련 상품 -->
      <section class="related">
        <h2 class="related-title">같은 카테고리 상품</h2>
        <div class="related-grid">
          <div class="related-card"
            v-for="data in relatedProducts"
            :key="data.id"
            @click="router.push({name: 'product', params: { id: data.id }});">
            <span class="related-emoji">{{data.emoji}}</span>
            <p class="related-name">{{ data.name }}</p>
            <p class="related-price">₩{{ data.price }}</p>
          </div>
        </div>
      </section>

    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { PRODUCTS, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '../data/products'

// useRoute(): 현재 URL 정보 (params.id 등)
// useRouter(): 페이지 이동 (push, back 등)
const route     = useRoute()
const router    = useRouter()
const cartStore = useCartStore()

// URL 파라미터 :id 로 상품 찾기
// 힌트: route.params.id는 문자열이므로 Number()로 변환 필요
const product = computed(() => {
  return PRODUCTS.find(p => p.id === Number(route.params.id))
})

// 같은 카테고리의 다른 상품 (현재 상품 제외, 최대 4개)
const relatedProducts = computed(() => {
  // TODO: PRODUCTS에서 같은 category이고 현재 상품이 아닌 것을 최대 4개 반환하세요
  return PRODUCTS.filter(p => p.category === product.value.category && p.id !== product.value.id).slice(0, 4);
})

// 이 상품이 카트에 담겨 있는지
const isInCart = computed(() => {
  return cartStore.isInCart(product.value.id);
})

// 선택 수량 (기본값 1)
const qty = ref(1)

// 장바구니 담기
function handleAddToCart() {
  // TODO: qty 만큼 cartStore.addItem(product.value) 을 반복 호출하세요
  for(let i=0; i<Number(qty.value) ; i++){
    cartStore.addItem(product.value);
  }
}
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem;
}

.back-btn {
  background: none;
  border: none;
  color: #888;
  font-size: 14px;
  padding: 0;
  margin-bottom: 1.25rem;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: color 0.15s;
}

.back-btn:hover { color: #1a1a1a; }

.detail-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  background: #fff;
  border: 1px solid #e8e8e3;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
}

@media (max-width: 640px) {
  .detail-card { grid-template-columns: 1fr; }
}

.image-area {
  background: #f5f5f0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 260px;
}

.big-emoji { font-size: 100px; }

.category-tag {
  display: inline-block;
  padding: 3px 10px;
  background: #f0f0ea;
  border-radius: 20px;
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.name {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
}

.price {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.desc {
  font-size: 14px;
  color: #666;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.shipping-notice {
  display: flex;
  gap: 6px;
  font-size: 13px;
  color: #27ae60;
  background: #eafaf1;
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 1.25rem;
}

.qty-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.qty-label { font-size: 14px; font-weight: 600; }

.qty-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-btn {
  width: 28px;
  height: 28px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.1s;
}

.qty-btn:hover { background: #f5f5f0; }
.qty-num { font-size: 15px; font-weight: 600; min-width: 24px; text-align: center; }

.subtotal {
  font-size: 14px;
  color: #888;
  margin-bottom: 1.25rem;
}

.subtotal strong { color: #1a1a1a; font-size: 16px; }

.btn-group { display: flex; flex-direction: column; gap: 8px; }

.cart-btn {
  padding: 12px;
  background: #1a1a1a;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: opacity 0.15s;
}

.cart-btn:hover { opacity: 0.85; }

.home-btn {
  padding: 12px;
  background: #fff;
  color: #1a1a1a;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: background 0.15s;
}

.home-btn:hover { background: #f5f5f0; }

.related-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 1rem;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.75rem;
}

.related-card {
  background: #fff;
  border: 1px solid #e8e8e3;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.15s;
}

.related-card:hover { border-color: #aaa; }
.related-emoji { font-size: 28px; display: block; margin-bottom: 6px; }
.related-name { font-size: 13px; font-weight: 600; margin-bottom: 4px; }
.related-price { font-size: 12px; color: #888; }

.not-found {
  text-align: center;
  padding: 4rem 0;
  color: #aaa;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
</style>
