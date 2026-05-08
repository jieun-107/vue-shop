import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// cartStore.js 와 구조가 거의 같습니다.
// 새로운 Pinia 스토어를 만드는 연습을 해보세요!
export const useWishlistStore = defineStore('wishlist', () => {

  // 찜한 상품 id 목록
  // 예: [1, 3, 5]
  const ids = ref([])


  // 찜한 상품 수
  const count = computed(() => {
    return ids.value.length
  })

  /**
   * 특정 상품이 찜 목록에 있는지 확인합니다.
   * @param {number} id
   * @returns {boolean}
   */
  function isWished(id) {
    return ids.value.includes(id);
  }

  /**
   * 찜하기 토글 — 이미 있으면 제거, 없으면 추가
   * @param {number} id
   */
  function toggle(id) {
    isWished(id) 
      ? ids.value = ids.value.filter(i => i !== id)
      : ids.value.push(id);
  }

  return { ids, count, isWished, toggle }
})
