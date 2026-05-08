// 쇼핑몰에서 사용할 상품 더미 데이터입니다.
// 실제 프로젝트에서는 API(fetch)로 서버에서 받아오게 됩니다.

export const PRODUCTS = [
  { id: 1, name: '아메리카노',  price: 4500, emoji: '☕', category: '음료',   description: '깔끔하고 진한 에스프레소에 물을 더해 부드럽게 즐기는 클래식 커피입니다. 산미와 쓴맛의 균형이 좋아 데일리 커피로 제격이에요.' },
  { id: 2, name: '카페라떼',   price: 5000, emoji: '🥛', category: '음료',   description: '에스프레소와 스팀 밀크를 황금 비율로 블렌딩한 부드러운 라떼입니다. 우유의 고소함이 커피 향과 잘 어울려요.' },
  { id: 3, name: '녹차라떼',   price: 5500, emoji: '🍵', category: '음료',   description: '국내산 말차 파우더와 스팀 밀크로 만든 진한 녹차라떼입니다. 은은한 쌉싸름함과 고소한 우유 맛이 일품이에요.' },
  { id: 4, name: '크루아상',   price: 3800, emoji: '🥐', category: '빵',    description: '버터를 겹겹이 쌓아 구운 프랑스식 페이스트리입니다. 겉은 바삭하고 속은 촉촉하며 풍부한 버터 향이 납니다.' },
  { id: 5, name: '베이글',     price: 3200, emoji: '🥯', category: '빵',    description: '쫄깃한 식감이 특징인 뉴욕 스타일 베이글입니다. 크림치즈와 함께 먹으면 더욱 맛있어요.' },
  { id: 6, name: '치즈케이크', price: 6500, emoji: '🍰', category: '디저트', description: '부드럽고 크리미한 뉴욕 스타일 치즈케이크입니다. 묵직한 크림치즈와 달콤한 시트가 입에서 살살 녹아요.' },
  { id: 7, name: '마카롱',     price: 2500, emoji: '🍪', category: '디저트', description: '알록달록 예쁜 프랑스 정통 마카롱입니다. 바삭한 껍질과 부드러운 필링이 조화롭게 어우러져요.' },
  { id: 8, name: '초콜릿',     price: 4000, emoji: '🍫', category: '디저트', description: '벨기에산 고급 카카오로 만든 수제 초콜릿입니다. 깊은 카카오 향과 달콤 쌉싸름한 맛이 특징이에요.' },
]

export const CATEGORIES = ['전체', '음료', '빵', '디저트']

// 무료 배송 기준 금액
export const FREE_SHIPPING_THRESHOLD = 30000

// 기본 배송비
export const SHIPPING_FEE = 3000
