<template>
  <div class="filter-bar">
    <button 
      v-for="category in props.categories" 
      :key="category"
      class="filter-btn"
      :class="{ 'active': props.selected === category }"
      @click="() => emit('update:category', category)">{{ category }}</button>
  </div>
</template>

<script setup>
// props: 부모로부터 받는 데이터
const props = defineProps({
  categories: {
    type: Array,
    required: true,
    // 예: ['전체', '음료', '빵', '디저트']
  },
  selected: {
    type: String,
    required: true,
    // 현재 선택된 카테고리
  },
})

// emit: 부모에게 보내는 이벤트 목록 선언
const emit = defineEmits(['update:category'])

// 카테고리 버튼 클릭 핸들러
function handleSelect(category) {
  emit('update:category', category);
}
</script>

<style scoped>
.filter-bar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 6px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: #fff;
  color: #555;
  font-size: 13px;
  transition: all 0.15s;
}

.filter-btn:hover {
  border-color: #aaa;
}

.filter-btn.active {
  background: #1a1a1a;
  border-color: #1a1a1a;
  color: #fff;
}
</style>
