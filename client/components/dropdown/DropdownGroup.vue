<script lang="ts" setup>
import { Icon } from '@iconify/vue'

/** Menu item */
export interface DropdownItem {
  /* Icon component shown next to the name */
  icon?: string
  /* Menu item name shown */
  name: string
  /* Action that is executed on click */
  action: () => unknown
  /* Additional tailwindcss classes added to the items icon */
  iconClass?: string
}
export type DropdownGroup = DropdownItem[][]
export type DropdownItems = DropdownItem[]

export interface Props {
  groups: DropdownGroup
  width?: string
  mt?: string
}

withDefaults(defineProps<Props>(), {
  width: 'w-44',
  mt: 'mt-2',
})

const emit = defineEmits<{ (event: 'action', value: string): void }>()

const action = (action: string | (() => void)): void => {
  if (typeof action === 'function')
    action()
  else emit('action', action)
}
</script>

<template>
  <div
    class="origin-top-right border dark:border-gray-700 z-20 absolute right-0 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-600"
    :class="[mt, width]"
  >
    <div v-for="(items, i) in groups" :key="i" class="py-1">
      <div
        v-for="item in items"
        :key="item.name"
        class="cursor-pointer group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300"
        role="menuitem"
        @click="action(item.action)"
      >
        <Icon
          v-if="item.icon"
          :icon="item.icon"
          class="w-5 h-5 mr-3 text-gray-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-300"
          :class="item.iconClass ? item.iconClass : ''"
        />
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
