<script setup lang="ts">
const { setCrumbs } = useCrumbs()
setCrumbs([{ name: 'List of Users', to: '/', icon: 'i-mdi-account-group' }])

const users = ref<models.UserResults>(undefined)
const get = async () => users.value = await useApi().index<models.UserResults>('/example', { count: 9 })
const error = async () => await useApi().get('/error')

get()

const test = () => {
  useToast().add({
    icon: 'i-mdi-alert',
    title: 'this is a test',
  })
}
</script>

<template>
  <div class="mx-auto container p-2 lg:p-8 flex flex-col">
    <ul v-if="!users" class="grid grid-cols-1 gap-6 bg-gray-100 dark:bg-gray-900 rounded p-8 w-full sm:grid-cols-2 lg:grid-cols-3">
      <contact-card-skeleton v-for="i in 9" :key="`user-${i}`" />
    </ul>
    <ul v-else class="grid grid-cols-1 gap-6 bg-gray-100 dark:bg-gray-900 rounded p-8 w-full sm:grid-cols-2 lg:grid-cols-3">
      <contact-card v-for="(user, index) in users.data" :key="index" :user="user" />
    </ul>
    <div class="text-center mt-4">
      <span>provided by endpoint</span><span>&nbsp;</span>
      <a class="text-blue-400" target="_new" href="http://localhost:8000/example?count=9">/example</a>
      <span>&nbsp;</span>
      <span class="text-sm">(1 second delay)</span>
      <div class="mt-4 flex justify-center space-x-2">
        <u-button @click="get" icon="i-mdi-refresh">
          get()
        </u-button>
        <u-button @click="test">toast test </u-button>
        <u-button @click="error" color="red" icon="i-mdi-error">
          Force PHP Error
        </u-button>
      </div>
    </div>
  </div>
</template>
