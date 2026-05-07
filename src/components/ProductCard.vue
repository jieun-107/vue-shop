<template>
  <div class="card" :class="{ 'in-cart': isAlreadyInCart }">

    <div class="emoji">{{ product.emoji }}</div>

    <div class="info">
      <p class="name">{{ product.name }}</p>
      <p class="price">₩{{ product.price.toLocaleString() }}</p>
    </div>

    <button class="add-btn" :class="{ added: isAlreadyInCart }" @click="handleAdd">
      {{ isAlreadyInCart ? '✓ 담김' : '+ 담기' }}
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
const isAlreadyInCart = computed(() => {
  return cartStore.isInCart(props.product.id);
})

// 담기 버튼 클릭 시 실행
function handleAdd() {
  emit('add-to-cart', props.product);
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
