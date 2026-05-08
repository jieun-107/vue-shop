<template>
  <div class="card" :class="{ 'in-cart': isAlreadyInCart }" @click="emit('go-detail', product)">

    <div class="emoji">{{ product.emoji }}</div>

    <div class="info">
      <p class="name">{{ product.name }}</p>
      <p class="price">₩{{ product.price.toLocaleString() }}</p>
    </div>

    <!-- 버튼 클릭은 카드 클릭(go-detail)과 분리되어야 하므로 .stop으로 이벤트 전파 차단 -->
    <button
      class="add-btn"
      :class="{ added: isAlreadyInCart }"
      @click.stop="handleAdd"
    >
      {{ isAlreadyInCart ? '✓ 담김' : '+ 담기' }}
    </button>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cartStore'

const props = defineProps({
  product: { type: Object, required: true },
})

const emit = defineEmits(['add-to-cart', 'go-detail'])

const cartStore = useCartStore()

const isAlreadyInCart = computed(() => cartStore.isInCart(props.product.id))

function handleAdd() {
  emit('add-to-cart', props.product)
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
  transition: border-color 0.15s, transform 0.15s;
  cursor: pointer;
}

.card:hover {
  border-color: #aaa;
  transform: translateY(-2px);
}

.card.in-cart { border-color: #27ae60; }

.emoji { font-size: 36px; text-align: center; }

.name { font-size: 14px; font-weight: 600; }
.price { font-size: 13px; color: #888; }

.add-btn {
  margin-top: auto;
  padding: 7px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  font-size: 13px;
  transition: all 0.15s;
}

.add-btn:hover { background: #f5f5f0; }
.add-btn.added { background: #eafaf1; border-color: #27ae60; color: #27ae60; }
</style>
