<template lang="pug">
#HeaderBar
  .container
    .flex.items-center.m-2.justify-center(class="lg:justify-start")
      LinkButton.mr-2(href="https://github.com/acidjazz/laranuxt")
        IconGithub.w-4.h-4.mr-2(primary="text-gray-900")
        span Github
      LinkButton.mr-2(href="https://laravel.com")
        IconLaravel.w-4.h-4.mr-2(primary="text-red-500")
        span Laravel
      LinkButton(href="https://nuxtjs.org")
        IconNuxt.w-4.h-4.mr-2
        span Nuxt.js
</template>

<script>
export default {}
</script>
