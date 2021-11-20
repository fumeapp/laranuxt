
<template>
<header class="bg-indigo-800">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
    <div class="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
      <div class="flex items-center">
        <icon-client icon="cib:laravel" class="w-10 h-10 text-white" />
        <icon-client icon="simple-icons:nuxtdotjs" class="w-10 h-10 text-white -ml-1" />
        <div class="hidden ml-10 space-x-8 lg:block">
          <a href="#" class="text-base font-medium text-white hover:text-indigo-50" key="Solutions">
            Solutions
          </a>

          <a href="#" class="text-base font-medium text-white hover:text-indigo-50" key="Pricing">
            Pricing
          </a>

          <a href="#" class="text-base font-medium text-white hover:text-indigo-50" key="Docs">
            Docs
          </a>

          <a href="#" class="text-base font-medium text-white hover:text-indigo-50" key="Company">
            Company
          </a>
        </div>
      </div>
      <div class="ml-10 space-x-4">
        <push-button theme="indigo" @click="show">Sign In</push-button>
      </div>
    </div>
    <div class="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
      <a href="#" class="text-base font-medium text-white hover:text-indigo-50" key="Solutions">
        Solutions
      </a>

      <a href="#" class="text-base font-medium text-white hover:text-indigo-50" key="Pricing">
        Pricing
      </a>

      <a href="#" class="text-base font-medium text-white hover:text-indigo-50" key="Docs">
        Docs
      </a>

      <a href="#" class="text-base font-medium text-white hover:text-indigo-50" key="Company">
        Company
      </a>
    </div>
  </nav>
</header>
<modal-base v-if="modal" :destroyed="off">
  <header-login-modal @off="off" />
</modal-base>
</template>
<script lang="ts" setup>
import { PushButton, ModalBase } from 'tailvue'
const modal = ref(false)
function show (): void {
  modal.value = true
}
function off(): void {
  modal.value = false
}
</script>
