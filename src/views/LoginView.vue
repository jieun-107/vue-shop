<template>
  <div class="page">
    <div class="login-card">

      <h1 class="title">🔐 로그인</h1>
      <p class="subtitle">로그인하면 장바구니와 주문 기능을 사용할 수 있어요.</p>

      <!-- 에러 메시지 -->
      <div class="error-msg" v-if="errorMsg">{{ errorMsg }}</div>

      <div class="form">

        <div class="field">
          <label class="label">이메일</label>
          <!--
            TODO: v-model로 email 과 연결하세요
                  @keyup.enter 로 handleLogin을 호출하세요 (엔터키 로그인)
          -->
          <input
            class="input"
            type="email"
            placeholder="example@email.com"
            v-model="email"
            @keyup.enter="handleLogin"
          />
        </div>

        <div class="field">
          <label class="label">비밀번호</label>
          <!--
            TODO: v-model로 password 와 연결하세요
                  @keyup.enter 로 handleLogin을 호출하세요
          -->
          <input
            class="input"
            type="password"
            placeholder="비밀번호를 입력하세요"
            v-model="password"
            @keyup.enter="handleLogin"
          />
        </div>

        <!--
          TODO: 클릭 시 handleLogin 을 호출하세요
                isLoading 이 true 면 버튼을 비활성화하고 텍스트를 '로그인 중...' 으로 바꾸세요
        -->
        <button class="login-btn" @click="handleLogin" :disabled="isLoading">
          {{ isLoading ? '로그인 중...' : '로그인' }}
        </button>

        <button class="back-btn" @click="router.push('/')">
          ← 홈으로 돌아가기
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router    = useRouter()
const route     = useRoute()
const authStore = useAuthStore()

const email    = ref('')
const password = ref('')
const errorMsg = ref('')
const isLoading = ref(false)

async function handleLogin() {
  try {
    await new Promise(res => setTimeout(res, 600));

    const success = authStore.login(email.value, password.value);

    if (success) {
      const targetPath = route.query.redirect || '/';
      router.push(targetPath);
    } else {
      errorMsg.value = '이메일과 비밀번호를 입력해주세요.';
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.page {
  min-height: calc(100vh - 65px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.login-card {
  background: #fff;
  border: 1px solid #e8e8e3;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 400px;
}

.title    { font-size: 22px; font-weight: 700; margin-bottom: 6px; }
.subtitle { font-size: 13px; color: #888; margin-bottom: 1.5rem; }

.error-msg {
  background: #fef2f2;
  color: #e74c3c;
  font-size: 13px;
  padding: 10px 14px;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.form   { display: flex; flex-direction: column; gap: 1rem; }
.field  { display: flex; flex-direction: column; gap: 6px; }
.label  { font-size: 13px; font-weight: 600; }

.input {
  padding: 10px 14px;
  border: 1px solid #e8e8e3;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s;
}

.input:focus { border-color: #aaa; }

.login-btn {
  padding: 12px;
  background: #1a1a1a;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  margin-top: 0.5rem;
  transition: opacity 0.15s;
}

.login-btn:hover    { opacity: 0.85; }
.login-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.back-btn {
  background: none;
  border: none;
  font-size: 13px;
  color: #888;
  padding: 0;
  text-align: center;
  transition: color 0.15s;
}

.back-btn:hover { color: #1a1a1a; }
</style>
