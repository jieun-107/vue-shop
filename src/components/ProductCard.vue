<template>
  <div class="card" :class="{ 'in-cart': isAlreadyInCart }" @click="emit('go-detail', product)">

    <!-- 찜하기 버튼 -->
    <button class="wish-btn" @click.stop="handleWish">
      {{ isWished ? '❤️' : '🤍' }}
    </button>

    <div class="emoji">{{ product.emoji }}</div>

    <div class="info">
      <p class="name">{{ product.name }}</p>
      <p class="price">₩{{ product.price.toLocaleString() }}</p>
    </div>

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
import { useCartStore }     from '../stores/cartStore'
import { useWishlistStore } from '../stores/wishlistStore'
import { useToastStore }    from '../stores/toastStore'

const props = defineProps({
  product: { type: Object, required: true },
})

const emit = defineEmits(['add-to-cart', 'go-detail'])

const cartStore     = useCartStore()
const wishlistStore = useWishlistStore()
const toastStore    = useToastStore()

const isAlreadyInCart = computed(() => cartStore.isInCart(props.product.id))

// 이 상품이 찜 목록에 있는지
const isWished = computed(() => {
  return wishlistStore.isWished(props.product.id)
})

function handleAdd() {
  emit('add-to-cart', props.product)
  toastStore.show(`🛒 ${props.product.name} 담겼어요!`)
}

function handleWish() {
  wishlistStore.toggle(props.product.id);
  if (isWished.value) {
    toastStore.show(`❤️ ${props.product.name} 찜했어요!`)
  } else {
    toastStore.show('🤍 찜 해제했어요')
  }
}
</script>

<style scoped>
.card {
  position: relative;
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

.wish-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 18px;
  padding: 2px;
  line-height: 1;
}

.emoji { font-size: 36px; text-align: center; }
.name  { font-size: 14px; font-weight: 600; }
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

.add-btn:hover  { background: #f5f5f0; }
.add-btn.added  { background: #eafaf1; border-color: #27ae60; color: #27ae60; }
</style>
