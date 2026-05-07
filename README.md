# 🛍️ Vue Shop — 학습용 실습 예제

Vue 3 + Pinia로 만드는 쇼핑몰 카트입니다.
각 파일에 `TODO` 주석이 있는 곳을 직접 채워보세요!

---

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:5173 열기

---

## 파일 구조

```
src/
├── main.js                  # 앱 진입점, Pinia 등록
├── App.vue                  # 최상위 컴포넌트
├── style.css                # 전역 스타일
│
├── data/
│   └── products.js          # 상품 더미 데이터
│
├── stores/
│   └── cartStore.js         # Pinia 전역 상태 (★ 핵심)
│
└── components/
    ├── CategoryFilter.vue   # 카테고리 필터 버튼
    ├── ProductCard.vue      # 상품 카드 1개
    ├── CartPanel.vue        # 우측 장바구니 패널
    └── CartItem.vue         # 카트 안의 아이템 1개
```

---

## 실습 순서 (추천)

### 1단계 — Pinia 스토어 완성하기 (`cartStore.js`)
가장 먼저! 나머지 컴포넌트들이 여기 의존합니다.

| TODO | 배우는 개념 |
|------|------------|
| `totalCount` computed | `Array.reduce` |
| `subtotal` computed | `price * qty` 합산 |
| `shippingFee` computed | 조건부 반환 |
| `totalPrice` computed | computed 간 의존 |
| `addItem` action | `find` + `push` |
| `changeQty` action | 조건부 삭제 |
| `removeItem` action | `Array.filter` |
| `clearCart` action | 배열 초기화 |
| `isInCart` action | `Array.some` |

### 2단계 — ProductCard.vue
- `isAlreadyInCart` computed 완성
- `handleAdd` emit 완성
- 템플릿에 가격 포맷 및 버튼 텍스트 조건 추가

### 3단계 — CategoryFilter.vue
- `handleSelect` emit 완성
- `v-for`로 버튼 목록 렌더링
- `active` 클래스 동적 바인딩

### 4단계 — CartItem.vue
- 아이템 소계(`price * qty`) 표시
- `handleChangeQty`, `handleRemove` emit 완성
- 버튼에 `@click` 연결

### 5단계 — CartPanel.vue
- `v-if/v-else`로 빈 카트 / 아이템 목록 전환
- `CartItem` v-for 렌더링 + 이벤트 처리
- 금액 포맷 및 배송비 조건 표시
- `handleCheckout` 완성

### 6단계 — App.vue 마무리
- `filteredProducts` computed 완성
- `CategoryFilter` 이벤트 연결
- `ProductCard` v-for 렌더링
- 헤더 뱃지 v-if 조건 추가

---

## 핵심 Vue 개념 요약

| 개념 | 사용된 곳 | 설명 |
|------|----------|------|
| `ref` | cartStore | 반응형 원시값/배열 |
| `computed` | cartStore, ProductCard | 의존값 자동 재계산 |
| `defineProps` | 모든 컴포넌트 | 부모→자식 데이터 전달 |
| `defineEmits` | 모든 컴포넌트 | 자식→부모 이벤트 전달 |
| `v-for` | App, CartPanel | 리스트 렌더링 |
| `v-if / v-else` | App, CartPanel | 조건부 렌더링 |
| `:class` | ProductCard, CategoryFilter | 동적 클래스 바인딩 |
| `@click` | 모든 버튼 | 클릭 이벤트 처리 |
| `Pinia` | cartStore | 전역 상태 관리 |
