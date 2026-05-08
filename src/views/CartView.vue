<template>
  <div class="page">

    <div class="page-header">
      <h1 class="title">🛒 장바구니</h1>
      <!-- TODO: cartStore.totalCount 를 표시하세요 -->
      <span class="count">총 0개</span>
    </div>

    <!-- 장바구니가 비었을 때 -->
    <!-- TODO: cartStore.items 가 비어있을 때만 보여주세요 (v-if) -->
    <div class="empty">
      <p class="empty-icon">🛒</p>
      <p>장바구니가 비어있어요</p>
      <button class="go-home-btn" @click="router.push('/')">쇼핑 계속하기</button>
    </div>

    <!-- 장바구니에 아이템이 있을 때 -->
    <!-- TODO: items 가 있을 때만 보여주세요 (v-else) -->
    <div class="cart-layout">

      <!-- 왼쪽: 아이템 목록 -->
      <section class="item-list">

        <!-- 전체 선택 / 전체 삭제 -->
        <div class="list-header">
          <span class="item-count">{{ cartStore.items.length }}종류의 상품</span>
          <!--
            TODO: 클릭 시 cartStore.clearCart() 를 호출하세요
                  confirm('전체 삭제하시겠습니까?') 로 확인 후 실행하세요
          -->
          <button class="clear-btn">전체 삭제</button>
        </div>

        <!--
          TODO: cartStore.items 를 v-for 로 순회하며 CartItem 을 렌더링하세요
                - 'change-qty' 이벤트 → handleChangeQty
                - 'remove' 이벤트 → handleRemove
        -->

      </section>

      <!-- 오른쪽: 주문 요약 -->
      <aside class="summary-panel">
        <h2 class="summary-title">주문 요약</h2>

        <div class="summary-rows">
          <div class="summary-row">
            <span>상품 금액</span>
            <!-- TODO: cartStore.subtotal 을 toLocaleString() 으로 표시 -->
            <span>₩0</span>
          </div>
          <div class="summary-row">
            <span>배송비</span>
            <!-- TODO: shippingFee 가 0이면 '무료', 아니면 금액 표시 -->
            <span>₩0</span>
          </div>

          <!-- 무료배송까지 남은 금액 -->
          <!-- TODO: shippingFee > 0 일 때만 이 안내 문구를 보여주세요 (v-if) -->
          <div class="free-shipping-notice">
            ₩{{ (FREE_SHIPPING_THRESHOLD - cartStore.subtotal).toLocaleString() }} 더 담으면 무료배송!
          </div>

          <div class="summary-row total">
            <span>합계</span>
            <!-- TODO: cartStore.totalPrice 를 toLocaleString() 으로 표시 -->
            <span>₩0</span>
          </div>
        </div>

        <!--
          TODO: 클릭 시 handleCheckout 을 호출하세요
                cartStore.items 가 비어있으면 비활성화 (:disabled)
        -->
        <button class="checkout-btn">결제하기</button>

        <button class="continue-btn" @click="router.push('/')">
          쇼핑 계속하기
        </button>
      </aside>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore }  from '../stores/cartStore'
import { useToastStore } from '../stores/toastStore'
import { FREE_SHIPPING_THRESHOLD } from '../data/products'
import CartItem from '../components/CartItem.vue'

const router     = useRouter()
const cartStore  = useCartStore()
const toastStore = useToastStore()

function handleChangeQty({ id, delta }) {
  // TODO: cartStore.changeQty(id, delta) 호출
}

function handleRemove(id) {
  // TODO: cartStore.removeItem(id) 호출
  //       toastStore.show('🗑️ 상품이 삭제되었어요') 호출
}

function handleCheckout() {
  // TODO: 아래 로직을 구현하세요
  //
  // 1. confirm('결제하시겠습니까?') 로 확인
  // 2. 확인했으면 router.push({ name: 'order-complete' }) 로 이동
  //    (장바구니 비우기는 OrderCompleteView 에서 처리합니다)
}
</script>

<style scoped>
.page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1.5rem;
}

.page-header {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 1.5rem;
}

.title { font-size: 22px; font-weight: 700; }
.count { font-size: 14px; color: #888; }

.empty {
  text-align: center;
  padding: 5rem 0;
  color: #aaa;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.empty-icon  { font-size: 48px; }

.go-home-btn {
  margin-top: 8px;
  padding: 10px 24px;
  background: #1a1a1a;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  transition: opacity 0.15s;
}

.go-home-btn:hover { opacity: 0.85; }

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1.5rem;
  align-items: start;
}

@media (max-width: 700px) {
  .cart-layout { grid-template-columns: 1fr; }
}

.item-list {
  background: #fff;
  border: 1px solid #e8e8e3;
  border-radius: 12px;
  padding: 1.25rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e8e8e3;
}

.item-count { font-size: 13px; color: #888; }

.clear-btn {
  background: none;
  border: none;
  font-size: 13px;
  color: #aaa;
  text-decoration: underline;
  transition: color 0.15s;
}

.clear-btn:hover { color: #e74c3c; }

.summary-panel {
  background: #fff;
  border: 1px solid #e8e8e3;
  border-radius: 12px;
  padding: 1.25rem;
  position: sticky;
  top: 80px;
}

.summary-title { font-size: 16px; font-weight: 700; margin-bottom: 1rem; }

.summary-rows  { display: flex; flex-direction: column; gap: 10px; }

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #555;
}

.summary-row.total {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  padding-top: 10px;
  border-top: 1px solid #e8e8e3;
  margin-top: 4px;
}

.free-shipping-notice {
  font-size: 12px;
  color: #27ae60;
  background: #eafaf1;
  padding: 6px 10px;
  border-radius: 6px;
  text-align: center;
}

.checkout-btn {
  width: 100%;
  margin-top: 1.25rem;
  padding: 12px;
  background: #1a1a1a;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: opacity 0.15s;
}

.checkout-btn:hover    { opacity: 0.85; }
.checkout-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.continue-btn {
  width: 100%;
  margin-top: 8px;
  padding: 10px;
  background: #fff;
  color: #1a1a1a;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: background 0.15s;
}

.continue-btn:hover { background: #f5f5f0; }
</style>
