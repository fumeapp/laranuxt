<template>
  <li class="col-span-1 bg-white dark:bg-gray-700 rounded-lg shadow">
    <div class="w-full flex items-center justify-between p-6 space-x-6">
      <div class="flex-1 truncate">
        <div class="flex items-center space-x-3">
          <h3 class="text-gray-900 text-sm leading-5 font-medium truncate skeleton w-32">
            &nbsp;
          </h3>
        </div>
        <p class="mt-1 text-gray-500 text-sm leading-5 truncate skeleton w-36">
          &nbsp;
        </p>
      </div>
      <div class="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden skeleton" />
    </div>
    <div class="border-t border-gray-200 dark:border-gray-500">
      <div class="-mt-px flex">
        <div class="w-0 flex-1 flex border-r border-gray-200 dark:border-gray-500">
          <a
            class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg transition ease-in-out duration-150 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
            href="#"
          >
            <div class="skeleton w-20 h-full">
              &nbsp;
            </div>
          </a>
        </div>
        <div class="-ml-px w-0 flex-1 flex">
          <a
            class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-br-lg transition ease-in-out duration-150 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
            href="#"
          >
            <div class="skeleton w-20 h-full">
              &nbsp;
            </div>
          </a>
        </div>
      </div>
    </div>
  </li>
</template>

<style>
.skeleton {
  --text-opacity: 0;
  background-image: linear-gradient(100deg, #edf2f7 0%, #f4f7fa 20%, #edf2f7 40%);
  background-position: 50%;
  background-size: 200%;
  animation: skeleton 1.25s infinite linear;
}

.skeleton-teal {
  background-image: linear-gradient(100deg, #b4c5f8 0%, #cad8f9 20%, #b4c5f8 40%);
}

.skeleton-white {
  background-image: linear-gradient(100deg, #f9fafb 0%, #ffffff 20%, #f9fafb 40%);
}

.dark .skeleton {
  background-image: linear-gradient(100deg, #374151 0%, #404954 20%, #374151 40%);
}

@keyframes skeleton {
  0% {
    background-position: 50%;
  }
  50%, 100% {
    background-position: -100%
  }
}

.fresh {
  animation: fresh 2s ease-in-out;
}

@keyframes fresh {
  0% { @apply bg-auto; }
  20% { @apply bg-green-100; }
  100% { @apply bg-auto; }
}
</style>
