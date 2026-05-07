<template>
  <div class="cart-panel">
    <h2 class="title">장바구니</h2>

    <!-- 장바구니가 비었을 때 -->
    <!-- TODO: cartStore.items 배열이 비어있을 때 이 블록을 보여주세요 (v-if) -->
    <div class="empty">
      <p>🛒</p>
      <p>장바구니가 비어있어요</p>
    </div>

    <!-- 장바구니에 아이템이 있을 때 -->
    <!-- TODO: items가 있을 때 이 블록을 보여주세요 (v-else) -->
    <div>

      <!-- 아이템 목록 -->
      <!-- TODO: cartStore.items를 v-for로 순회하며 CartItem을 렌더링하세요 -->
      <!--       CartItem에서 오는 'change-qty', 'remove' 이벤트도 처리하세요 -->
      <div class="item-list">
        <!-- CartItem 여기에 -->
      </div>

      <!-- 금액 요약 -->
      <div class="summary">
        <div class="summary-row">
          <span>상품 금액</span>
          <!-- TODO: cartStore.subtotal을 toLocaleString()으로 포맷해서 표시하세요 -->
          <span>₩{{ cartStore.subtotal }}</span>
        </div>
        <div class="summary-row">
          <span>배송비</span>
          <!-- TODO: shippingFee가 0이면 '무료', 아니면 금액을 표시하세요 -->
          <span>₩{{ cartStore.shippingFee }}</span>
        </div>
        <div class="summary-row total">
          <span>합계</span>
          <!-- TODO: cartStore.totalPrice를 toLocaleString()으로 포맷해서 표시하세요 -->
          <span>₩{{ cartStore.totalPrice }}</span>
        </div>
      </div>

      <!-- 결제 버튼 -->
      <!--
        TODO: 버튼 클릭 시 handleCheckout 함수를 호출하세요
        - cartStore.items가 비어있으면 버튼을 비활성화하세요 (:disabled)
      -->
      <button class="checkout-btn">
        결제하기
      </button>

    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore'
import CartItem from './CartItem.vue'

const cartStore = useCartStore()

// 수량 변경: CartItem에서 { id, delta } 형태의 payload를 받습니다
function handleChangeQty({ id, delta }) {
  // TODO: cartStore.changeQty(id, delta)를 호출하세요
}

// 아이템 제거: CartItem에서 id를 받습니다
function handleRemove(id) {
  // TODO: cartStore.removeItem(id)를 호출하세요
}

// 결제 버튼 클릭
function handleCheckout() {
  // TODO: 아래를 구현하세요
  // 1. confirm('결제하시겠습니까?') 로 확인
  // 2. 확인하면 cartStore.clearCart() 호출
  // 3. alert('결제가 완료되었습니다! 🎉') 표시
}
</script>

<style scoped>
.cart-panel {
  background: #fff;
  border: 1px solid #e8e8e3;
  border-radius: 12px;
  padding: 1.25rem;
  position: sticky;
  top: 80px;
}

.title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 1rem;
}

.empty {
  text-align: center;
  padding: 2rem 0;
  color: #aaa;
  font-size: 14px;
  line-height: 2;
}

.item-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 1rem;
}

.summary {
  border-top: 1px solid #e8e8e3;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #777;
}

.summary-row.total {
  font-size: 15px;
  font-weight: 700;
  color: #1a1a1a;
  padding-top: 8px;
  border-top: 1px solid #e8e8e3;
  margin-top: 4px;
}

.checkout-btn {
  width: 100%;
  margin-top: 1rem;
  padding: 12px;
  background: #1a1a1a;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: opacity 0.15s;
}

.checkout-btn:hover {
  opacity: 0.85;
}

.checkout-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
</style>
