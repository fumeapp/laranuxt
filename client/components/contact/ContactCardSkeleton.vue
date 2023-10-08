<template>
  <li class="col-span-1 bg-white dark:bg-gray-950 rounded-lg shadow">
    <div class="w-full flex items-center justify-between p-6 space-x-6">
      <div class="flex-1 truncate">
        <div class="flex items-center space-x-3">
          <u-skeleton class="w-32 text-sm leading-5 font-medium h-5" />
        </div>
        <u-skeleton class="mt-1 w-36 h-5" />
      </div>
      <u-skeleton class="w-10 h-10 rounded-full" />
    </div>
    <div class="border-t border-gray-200 dark:border-gray-800">
      <div class="-mt-px flex">
        <div class="w-0 flex-1 flex border-r border-gray-200 dark:border-gray-800">
          <a
            class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg transition ease-in-out duration-150 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
            href="#"
          >
            <u-skeleton class="w-20 h-full" />
          </a>
        </div>
        <div class="-ml-px w-0 flex-1 flex">
          <a
            class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-br-lg transition ease-in-out duration-150 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
            href="#"
          >
            <u-skeleton class="w-20 h-6" />
          </a>
        </div>
      </div>
    </div>
  </li>
</template>
