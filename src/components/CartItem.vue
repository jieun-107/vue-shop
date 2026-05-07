<template>
  <div class="cart-item">

    <span class="emoji">{{ item.emoji }}</span>

    <div class="info">
      <p class="name">{{ item.name }}</p>
      <p class="subtotal">₩ {{ (item.price * item.qty).toLocaleString() }}</p>
    </div>

    <!-- 수량 조절 버튼 -->
    <div class="qty-control">
      <button class="qty-btn" @click="() => handleChangeQty(-1)">−</button>
      <span class="qty">{{ item.qty }}</span>
      <button class="qty-btn" @click="() => handleChangeQty(1)">+</button>
    </div>

    <!-- 삭제 버튼 -->
    <button class="remove-btn" @click="handleRemove">✕</button>

  </div>
</template>

<script setup>
// props: 부모(CartPanel)로부터 아이템 데이터를 받습니다
const props = defineProps({
  item: {
    type: Object,
    required: true,
    // 구조: { id, name, price, emoji, qty }
  },
})

// emit: 부모에게 보낼 이벤트 목록
const emit = defineEmits(['change-qty', 'remove'])

// 수량 변경 버튼 클릭 시 실행
// delta: +1 (증가) 또는 -1 (감소)
function handleChangeQty(delta) {
  emit('change-qty', { id: props.item.id, delta });
}

// 삭제 버튼 클릭 시 실행
function handleRemove() {
  emit('remove', props.item.id);
}
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0ea;
}

.cart-item:last-child {
  border-bottom: none;
}

.emoji {
  font-size: 22px;
  flex-shrink: 0;
}

.info {
  flex: 1;
  min-width: 0;
}

.name {
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.subtotal {
  font-size: 12px;
  color: #888;
  margin-top: 2px;
}

.qty-control {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.qty-btn {
  width: 24px;
  height: 24px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.1s;
}

.qty-btn:hover {
  background: #f5f5f0;
}

.qty {
  font-size: 13px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.remove-btn {
  width: 22px;
  height: 22px;
  border: none;
  background: none;
  color: #ccc;
  font-size: 12px;
  flex-shrink: 0;
  border-radius: 4px;
  transition: color 0.1s;
}

.remove-btn:hover {
  color: #e74c3c;
}
</style>
