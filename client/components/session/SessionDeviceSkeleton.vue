<template>
  <div class="bg-white dark:bg-gray-950 rounded-lg shadow relative">
    <div class="absolute right-0 top-0 m-2">
      <u-button theme="text" size="xs" class="shadow-none" name="i-mdi-trash" />
    </div>
    <div class="flex items-center justify-center py-4 border-gray-200 dark:border-gray-800 border-b">
      <u-skeleton style="width: 72px; height: 72px;" />
    </div>
    <div class="p-4">
      <div>
        <div class="flex items-center text-gray-900 mb-1">
          <u-icon
            name="i-mdi-laptop"
            class="w-4 h-4 mr-1.5 text-gray-200"
          />
          <u-skeleton class="w-32 h-4 skeleton" />
        </div>
        <div class="flex items-center text-gray-500 text-sm mb-1">
          <u-icon
            name="i-mdi-application-outline"
            class="w-4 h-4 mr-1.5 text-gray-200"
          />
          <u-skeleton class="w-32 h-4 skeleton" />
        </div>
        <div class="flex items-center text-gray-500 text-sm mb-1">
          <u-icon name="i-mdi-map" class="w-4 h-4 mr-1.5 text-gray-200" />
          <u-skeleton class="w-20 h-4 skeleton" />
        </div>
        <div class="flex items-center text-gray-500 text-sm mb-1">
          <u-icon name="i-mdi-envelope" class="w-4 h-4 mr-1.5 text-gray-200" />
          <u-skeleton class="w-20 h-4 skeleton" />
        </div>
        <div class="flex items-center text-gray-500 text-sm mb-1">
          <u-icon name="i-mdi-clock" class="w-4 h-4 mr-1.5 text-gray-200" />
          <u-skeleton class="w-14 h-4 skeleton" />
        </div>
        <div class="flex items-center text-gray-500 text-sm mb-1">
          <u-icon name="i-mdi-clock" class="w-4 h-4 mr-1.5 text-gray-200" />
          <u-skeleton class="w-14 h-4 skeleton" />
        </div>
      </div>
    </div>
  </div>
</template>
