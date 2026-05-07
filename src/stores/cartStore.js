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
  const totalCount = computed(() => {
    return items.value.reduce((acc, item) => {
      return acc + item.qty;
    }, 0);
  })

  // 상품 금액 합계 (배송비 제외)
  const subtotal = computed(() => items.value.reduce((acc, item) => acc + item.price * item.qty, 0))

  // 배송비: subtotal이 FREE_SHIPPING_THRESHOLD 이상이면 0원, 아니면 SHIPPING_FEE
  const shippingFee = computed(() => {
    return subtotal.value >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  })

  // 최종 결제 금액 (subtotal + shippingFee)
  const totalPrice = computed(() => {
    return subtotal.value + shippingFee.value;
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
    const existing = items.value.find(item => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      items.value.push({ ...product, qty: 1 });
    }

    console.log("items value : ", items.value);
  }

  /**
   * 특정 아이템의 수량을 변경합니다.
   * - qty가 0 이하가 되면 removeItem을 호출해 삭제
   * @param {number} id - 변경할 아이템의 id
   * @param {number} delta - 변경량 (+1 또는 -1)
   */
  function changeQty(id, delta) {
    console.log("item id : ", id, "delta : ", delta );
    const item = items.value.find(item => item.id === id);
    console.log("item : ", item );
    if(!item) return;
    item.qty += delta;
    if(item.qty <= 0){
      removeItem(id);
    }
  }

  /**
   * 특정 아이템을 장바구니에서 제거합니다.
   * @param {number} id - 제거할 아이템의 id
   */
  function removeItem(id) {
    // TODO: items.value에서 해당 id를 가진 아이템을 제거하세요
    // 힌트: Array.filter를 사용하면 한 줄로 해결됩니다
    items.value = items.value.filter(item => item.id !== id);
    console.log("remove item : ", items.value);
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
    return items.value.some(item => item.id === id);
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
