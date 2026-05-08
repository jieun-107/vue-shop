import { defineStore } from 'pinia'
import { ref } from 'vue'

// 토스트 알림을 전역에서 띄울 수 있도록 Pinia 스토어로 관리합니다.
// 어느 컴포넌트에서든 useToastStore().show('메시지') 한 줄로 호출할 수 있어요.
export const useToastStore = defineStore('toast', () => {

  // 현재 표시 중인 토스트 메시지
  const message = ref('')

  // 토스트 표시 여부
  const visible = ref(false)

  // 타이머 ID (중복 호출 시 이전 타이머 취소용)
  let timer = null

  /**
   * 토스트 메시지를 표시합니다.
   * duration ms 후 자동으로 사라집니다.
   * @param {string} msg - 표시할 메시지
   * @param {number} duration - 표시 시간 (ms), 기본값 2000
   */
  function show(msg, duration = 2000) {
    // TODO: 아래 로직을 구현하세요
    //
    // 1. 이전 타이머가 있으면 clearTimeout으로 취소
    if(timer) clearTimeout(timer);
    // 2. message.value 에 msg 를 저장
    message.value = msg;
    // 3. visible.value 를 true 로 설정
    visible.value = true;
    // 4. setTimeout으로 duration 후에 visible.value 를 false 로 설정
    //    그리고 timer 에 setTimeout의 반환값을 저장
    timer = setTimeout(() => {
      visible.value = false;
    }, duration);
  }

  return { message, visible, show }
})
