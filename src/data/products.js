// 쇼핑몰에서 사용할 상품 더미 데이터입니다.
// 실제 프로젝트에서는 API(fetch)로 서버에서 받아오게 됩니다.

export const PRODUCTS = [
  { id: 1, name: '아메리카노',  price: 4500,  emoji: '☕', category: '음료' },
  { id: 2, name: '카페라떼',   price: 5000,  emoji: '🥛', category: '음료' },
  { id: 3, name: '녹차라떼',   price: 5500,  emoji: '🍵', category: '음료' },
  { id: 4, name: '크루아상',   price: 3800,  emoji: '🥐', category: '빵'  },
  { id: 5, name: '베이글',     price: 3200,  emoji: '🥯', category: '빵'  },
  { id: 6, name: '치즈케이크', price: 6500,  emoji: '🍰', category: '디저트' },
  { id: 7, name: '마카롱',     price: 2500,  emoji: '🍪', category: '디저트' },
  { id: 8, name: '초콜릿',     price: 4000,  emoji: '🍫', category: '디저트' },
]

export const CATEGORIES = ['전체', '음료', '빵', '디저트']

// 무료 배송 기준 금액
export const FREE_SHIPPING_THRESHOLD = 30000

// 기본 배송비
export const SHIPPING_FEE = 3000
