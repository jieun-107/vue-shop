import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '../data/products'

// defineStore(스토어이름, setup함수)
// Pinia는 Vue 컴포넌트 어디서든 가져다 쓸 수 있는 전역 상태 저장소입니다.
export const useCartStore = defineStore('cart', () => {

  // ----------------------------------------------------------------
  // 📦 state: 반응형 데이터 (ref 사용)
  // ----------------------------------------------------------------

  // 장바구니 아이템 목록
  // 각 아이템의 구조: { id, name, price, emoji, category, qty }
  const items = ref([])


  // ----------------------------------------------------------------
  // 🔢 getters: 계산된 값 (computed 사용)
  // ----------------------------------------------------------------

  // 장바구니 전체 수량 합계
  // 힌트: items.value 배열을 reduce로 순회하며 qty를 더하세요
  const totalCount = computed(() => {
    // TODO: items 배열의 모든 qty를 합산해서 반환하세요
    return 0
  })

  // 상품 금액 합계 (배송비 제외)
  // 힌트: 각 아이템의 price * qty 를 모두 더하면 됩니다
  const subtotal = computed(() => {
    // TODO: price * qty 의 합계를 반환하세요
    return 0
  })

  // 배송비: subtotal이 FREE_SHIPPING_THRESHOLD 이상이면 0원, 아니면 SHIPPING_FEE
  const shippingFee = computed(() => {
    // TODO: 조건에 따라 0 또는 SHIPPING_FEE를 반환하세요
    return SHIPPING_FEE
  })

  // 최종 결제 금액 (subtotal + shippingFee)
  const totalPrice = computed(() => {
    // TODO: subtotal과 shippingFee를 더해서 반환하세요
    return 0
  })


  // ----------------------------------------------------------------
  // ⚙️ actions: 상태를 바꾸는 함수들
  // ----------------------------------------------------------------

  /**
   * 상품을 장바구니에 추가합니다.
   * - 이미 있는 상품이면 수량(qty)만 1 증가
   * - 없는 상품이면 qty: 1 과 함께 items에 추가
   * @param {Object} product - PRODUCTS 배열의 상품 객체
   */
  function addItem(product) {
    // TODO: 아래 로직을 구현하세요
    //
    // 1. items.value에서 product.id와 같은 아이템을 찾는다 (find 사용)
    // 2. 찾았으면 → existing.qty를 1 증가
    // 3. 못 찾았으면 → items.value에 { ...product, qty: 1 } 을 push
  }

  /**
   * 특정 아이템의 수량을 변경합니다.
   * - qty가 0 이하가 되면 removeItem을 호출해 삭제
   * @param {number} id - 변경할 아이템의 id
   * @param {number} delta - 변경량 (+1 또는 -1)
   */
  function changeQty(id, delta) {
    // TODO: 아래 로직을 구현하세요
    //
    // 1. items.value에서 id로 아이템을 찾는다
    // 2. 아이템이 없으면 함수를 종료한다 (early return)
    // 3. item.qty에 delta를 더한다
    // 4. item.qty가 0 이하면 removeItem(id)를 호출한다
  }

  /**
   * 특정 아이템을 장바구니에서 제거합니다.
   * @param {number} id - 제거할 아이템의 id
   */
  function removeItem(id) {
    // TODO: items.value에서 해당 id를 가진 아이템을 제거하세요
    // 힌트: Array.filter를 사용하면 한 줄로 해결됩니다
  }

  /**
   * 장바구니를 전부 비웁니다.
   */
  function clearCart() {
    // TODO: items.value를 빈 배열로 초기화하세요
  }

  /**
   * 특정 상품이 장바구니에 담겨 있는지 확인합니다.
   * @param {number} id - 확인할 상품 id
   * @returns {boolean}
   */
  function isInCart(id) {
    // TODO: items.value에 해당 id의 아이템이 있으면 true, 없으면 false를 반환하세요
    // 힌트: Array.some을 사용하세요
    return false
  }


  // 외부에서 사용할 수 있도록 반환
  return {
    items,
    totalCount,
    subtotal,
    shippingFee,
    totalPrice,
    addItem,
    changeQty,
    removeItem,
    clearCart,
    isInCart,
  }
})
