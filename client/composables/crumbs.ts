import { ref } from 'vue'
import type { BreadCrumb } from '@/types/frontend'

const list = ref<BreadCrumb[]>([])
const actions = ref<BreadCrumb[]>([])

export const useCrumbs = () => {
  const setCrumbs = (crumbs: BreadCrumb[]): void => {
    list.value = crumbs
    actions.value = []
  }

  const setActions = (crumbs: BreadCrumb[]): void => {
    actions.value = crumbs
  }

  return { list, actions, setCrumbs, setActions }
}
