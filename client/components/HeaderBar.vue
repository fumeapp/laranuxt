<template lang="pug">
#HeaderBar
  .container
    .flex.items-center.m-2.justify-center(class="lg:justify-end")
      GroupButton
        template('#start')
          a.flex(href="https://github.com/acidjazz/laranuxt", target="_new")
            IconGithub.w-4.h-4.mr-2(primary="text-gray-900")
            span Github
        template('#middle')
          a.flex.mr-2(href="https://laravel.com", target="_new")
            IconLaravel.w-4.h-4.mr-2(primary="text-red-500")
            span Laravel
        template('#end')
          a.flex(href="https://nuxtjs.org", target="_new")
            IconNuxt.w-4.h-4.mr-2
            span Nuxt.js
</template>

<script>
export default {}
</script>
