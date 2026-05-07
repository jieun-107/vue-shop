<template>
  <div class="filter-bar">
    <!--
      TODO: props.categories 배열을 v-for로 순회하며 버튼을 렌더링하세요.
      - :key 바인딩 필요
      - 현재 선택된 카테고리(props.selected)와 같으면 'active' 클래스 추가
      - 클릭 시 부모에게 'update:category' 이벤트와 해당 카테고리 값을 emit
    -->
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
  // TODO: emit을 사용해 'update:category' 이벤트와 category 값을 부모에게 전달하세요
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
