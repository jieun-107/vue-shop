<template>
  <div class="page">
    <div class="complete-card">

      <div class="icon">🎉</div>
      <h1 class="title">주문이 완료되었어요!</h1>

      <!-- TODO: authStore.user.name 을 표시하세요 -->
      <p class="subtitle">
        <strong>이름</strong>님, 주문해 주셔서 감사합니다.
      </p>

      <!-- 주문 요약 -->
      <div class="order-summary">
        <div class="summary-row">
          <span>주문 번호</span>
          <!-- TODO: orderNumber 를 표시하세요 -->
          <span class="value">#000000</span>
        </div>
        <div class="summary-row">
          <span>결제 금액</span>
          <!-- TODO: paidAmount 를 toLocaleString() 으로 표시하세요 -->
          <span class="value">₩0</span>
        </div>
        <div class="summary-row">
          <span>예상 배송일</span>
          <!-- TODO: deliveryDate 를 표시하세요 -->
          <span class="value">날짜</span>
        </div>
      </div>

      <!-- 주문한 상품 목록 -->
      <div class="ordered-items">
        <p class="items-title">주문 상품</p>
        <!--
          TODO: orderedItems 를 v-for 로 순회하며 각 상품을 표시하세요
                표시 내용: emoji + name + qty + 소계(price * qty)
        -->
        <div class="item-row">
          <span>상품명 x 1</span>
          <span>₩0</span>
        </div>
      </div>

      <div class="btn-group">
        <!-- TODO: 클릭 시 홈으로 이동 -->
        <button class="home-btn">홈으로 돌아가기</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { useAuthStore } from '../stores/authStore'

const router    = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

// 주문 완료 시점의 스냅샷을 저장합니다.
// cartStore를 바로 비우면 화면에 표시할 데이터가 사라지므로
// onMounted에서 먼저 저장하고 나서 cart를 비웁니다.
const orderedItems = ref([])
const paidAmount   = ref(0)
const orderNumber  = ref('')
const deliveryDate = ref('')

onMounted(() => {
  // TODO: 아래 로직을 구현하세요
  //
  // 1. orderedItems.value 에 cartStore.items 를 복사해서 저장
  //    (직접 참조하면 clearCart 후 비워지므로 [...cartStore.items] 로 복사)
  //
  // 2. paidAmount.value 에 cartStore.totalPrice 저장
  //
  // 3. orderNumber.value 에 랜덤 6자리 숫자 생성해서 저장
  //    힌트: String(Math.floor(Math.random() * 900000) + 100000)
  //
  // 4. deliveryDate.value 에 오늘로부터 3일 후 날짜를 'M월 D일' 형식으로 저장
  //    힌트: new Date(), setDate(), getMonth(), getDate()
  //
  // 5. cartStore.clearCart() 호출해서 장바구니 비우기
})
</script>

<style scoped>
.page {
  min-height: calc(100vh - 65px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.complete-card {
  background: #fff;
  border: 1px solid #e8e8e3;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 460px;
  text-align: center;
}

.icon     { font-size: 56px; margin-bottom: 1rem; }
.title    { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
.subtitle { font-size: 14px; color: #666; margin-bottom: 1.5rem; }

.order-summary {
  background: #f5f5f0;
  border-radius: 10px;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  margin-bottom: 1.25rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #555;
}

.value { font-weight: 600; color: #1a1a1a; }

.ordered-items {
  text-align: left;
  border: 1px solid #e8e8e3;
  border-radius: 10px;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
}

.items-title {
  font-size: 13px;
  font-weight: 600;
  color: #888;
  margin-bottom: 10px;
}

.item-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 6px 0;
  border-bottom: 1px solid #f0f0ea;
  color: #333;
}

.item-row:last-child { border-bottom: none; }

.btn-group { display: flex; flex-direction: column; gap: 8px; }

.home-btn {
  width: 100%;
  padding: 12px;
  background: #1a1a1a;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: opacity 0.15s;
}

.home-btn:hover { opacity: 0.85; }
</style>
