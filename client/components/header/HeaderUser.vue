<template>
  <div class="flex items-center justify-center space-x-2">
    <img :src="$auth.user.avatar" class="w-9 h-9 rounded-full" alt="Profile Image">
    <div>{{ $auth.user.name }}</div>
  </div>
</template>
