<template>
  <div class="mt-12">
    <h1 class="text-center mb-4">
      This page is behind auth middleware
    </h1>
    <span>$api.$user</span>
    <pre class="text-xs border p-4 bg-gray-900 text-gray-100 rounded-lg mb-4"> {{ useApi().$user }} </pre>
    <div class="flex justify-center">
      <u-button to="/"> Go to Index </u-button>
    </div>
  </div>
</template>
