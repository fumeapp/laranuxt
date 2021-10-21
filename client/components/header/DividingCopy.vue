<template>
  <div class="mt-6 relative">
    <div class="absolute inset-0 flex items-center">
      <div class="w-full border-t border-gray-300 dark:border-gray-600" />
    </div>
    <div class="relative flex justify-center text-sm leading-5">
      <span class="px-2 bg-white dark:bg-gray-800 text-gray-500">
        <slot />
      </span>
    </div>
  </div>
</template>
