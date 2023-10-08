<script lang="ts" setup>
const { confirming, params } = useConfirm()
function action (): void {
  confirming.value = false
  params.value.action()
}
</script>

<template>
  <u-modal v-model="confirming" :ui="{ width: 'sm:max-w-sm' }">
    <u-card>
      <template #header>
        <span class="font-semibold" v-html="params.title" />
      </template>
      <div v-html="params.message" />
      <template #footer>
        <div class="flex justify-end space-x-2">
          <u-button color="white" @click="confirming = false"> Cancel </u-button>
          <u-button color="red" variant="solid" @click="action"> {{ params.label }}</u-button>
        </div>
      </template>
    </u-card>
  </u-modal>
</template>
