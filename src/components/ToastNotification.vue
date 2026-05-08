<template>
  <Transition>
    <div class="toast" v-if="toastStore.visible">
      {{ toastStore.message }}
    </div>
  </Transition>
</template>

<script setup>
import { useToastStore } from '../stores/toastStore'

const toastStore = useToastStore()
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: #1a1a1a;
  color: #fff;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 100;
  pointer-events: none;
}

/* <Transition name="fade"> 사용 시 적용되는 애니메이션 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(8px);
}
</style>
