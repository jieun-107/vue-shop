<template>
  <div class="card" :class="{ 'in-cart': isAlreadyInCart }">

    <div class="emoji">{{ product.emoji }}</div>

    <div class="info">
      <p class="name">{{ product.name }}</p>
      <!-- TODO: product.price를 toLocaleString()으로 포맷해서 표시하세요 -->
      <p class="price">₩{{ product.price }}</p>
    </div>

    <!--
      TODO: 버튼 클릭 시 handleAdd 함수를 호출하세요 (@click)
      - isAlreadyInCart가 true면 버튼 텍스트를 '✓ 담김'으로,
        false면 '+ 담기'로 표시하세요 (삼항 연산자 또는 v-if/v-else)
    -->
    <button class="add-btn" :class="{ added: isAlreadyInCart }">
      + 담기
    </button>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cartStore'

// props: 부모(App.vue)로부터 상품 데이터를 받습니다
const props = defineProps({
  product: {
    type: Object,
    required: true,
    // 구조: { id, name, price, emoji, category }
  },
})

// emit: 부모에게 보낼 이벤트 목록
const emit = defineEmits(['add-to-cart'])

const cartStore = useCartStore()

// 이 상품이 이미 장바구니에 담겼는지 여부
// TODO: cartStore.isInCart(props.product.id)를 computed로 감싸서 반환하세요
const isAlreadyInCart = computed(() => {
  return false
})

// 담기 버튼 클릭 시 실행
function handleAdd() {
  // TODO: emit으로 'add-to-cart' 이벤트와 props.product를 부모에게 전달하세요
}
</script>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #e8e8e3;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: border-color 0.15s;
}

.card.in-cart {
  border-color: #27ae60;
}

.emoji {
  font-size: 36px;
  text-align: center;
}

.name {
  font-size: 14px;
  font-weight: 600;
}

.price {
  font-size: 13px;
  color: #888;
}

.add-btn {
  margin-top: auto;
  padding: 7px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  font-size: 13px;
  transition: all 0.15s;
}

.add-btn:hover {
  background: #f5f5f0;
}

.add-btn.added {
  background: #eafaf1;
  border-color: #27ae60;
  color: #27ae60;
}
</style>
