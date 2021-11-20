<template>
  <div class="container p-2 lg:p-8 flex flex-col">
    <ul v-if="users.length === 0" class="grid grid-cols-1 gap-6 bg-gray-100 dark:bg-gray-900 rounded p-8 w-full sm:grid-cols-2 lg:grid-cols-3">
      <contact-card-skeleton v-for="i in 9" :key="`skel-${i}`" />
    </ul>
    <ul v-if="users.length &gt; 0" class="grid grid-cols-1 gap-6 bg-gray-100 dark:bg-gray-900 rounded p-8 w-full sm:grid-cols-2 lg:grid-cols-3">
      <contact-card v-for="(user, index) in users" :key="index" :user="user" />
    </ul>
    <div class="text-center mt-4">
      <div class="mb-4">
        <push-button @click="error">
          <icon icon="mdi:error" class="w-6 h-6 text-red-600 mr-2.5" />
          Force PHP Error
        </push-button>
      </div>
      <span>provided by endpoint</span><span>&nbsp;</span>
      <a class="text-blue-400" :href="`${$axios.defaults.baseURL}/example?count=9`">/example</a>
      <span>&nbsp;</span>
      <span class="text-sm">(2 second delay)</span>
    </div>
    <div class="text-center mx-auto mt-4">
      <span class="mr-4">nuxt-tailvue kitchen sink:</span>
      <div class="mt-2 flex mx-auto">
        <n-link to="/modal">
          <push-button theme="whiteLeft" class="-mr-px">
            Modal
          </push-button>
        </n-link>
        <n-link to="/toast">
          <push-button theme="whiteMid">
            toasts
          </push-button>
        </n-link>
        <n-link to="/button">
          <push-button theme="whiteMid">
            buttons
          </push-button>
        </n-link>
        <n-link to="/icon">
          <push-button theme="whiteRight">
            icons
          </push-button>
        </n-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const ctx = useContext()
const users = ref([] as models.Users)
const count = ref(9)
onMounted(() => get(count.value))
async function get (count: number) : Promise<void> {
  await ctx.$sleep(2000)
  users.value = (await ctx.$axios.get('example', { params: { count } })).data.data
}
async function error (): Promise<void> {
  await ctx.$axios.get('/error')
}
</script>

<script lang="ts">export default { auth: false }</script>
