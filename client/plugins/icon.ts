import { Icon } from '@iconify/vue2'
import Vue from 'vue'
Vue.component('Iconify', Icon)
Vue.component('Icon', {
  props: { icon: String },
  template: '<client-only> <iconify :icon="icon" /> </client-only>',
})
