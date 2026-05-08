import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 로그인 상태를 전역으로 관리하는 스토어입니다.
// Navigation Guard에서 이 스토어를 참조해 접근 제어를 합니다.
export const useAuthStore = defineStore('auth', () => {

  // 로그인한 유저 정보 (로그아웃 상태면 null)
  // 구조: { name: string, email: string } | null
  const user = ref(null)

  // 로그인 여부
  const isLoggedIn = computed(() => {
    return user.value !== null ? true : false
  })

  /**
   * 로그인 처리
   * 실제 프로젝트에서는 API 호출 후 응답으로 받은 유저 정보를 저장합니다.
   * 여기서는 간단히 입력값을 그대로 저장합니다.
   * @param {string} email
   * @param {string} password - 실습용이라 검증 없이 통과
   * @returns {boolean} 성공 여부
   */
  function login(email, password) {
    if(!email || !password){
      return false
    }
    user.value = { name: email.split('@')[0], email: email}
    return true
  }

  /**
   * 로그아웃 처리
   */
  function logout() {
    user.value = null;
  }

  return { user, isLoggedIn, login, logout }
})
