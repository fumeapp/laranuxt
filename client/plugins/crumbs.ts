import { defineNuxtPlugin } from '#app'

export interface BreadCrumb {
  name: string
  to?: string
  icon?: string
}

class Crumbs {

  public list = ref<BreadCrumb[]>([])
  public actions = ref<BreadCrumb[]>([])

  public set(crumbs: BreadCrumb[]): void {
    this.list.value = crumbs
    this.actions.value = []
  }

  public action(actions: BreadCrumb[]): void {
    this.actions.value = actions
  }

}

export default defineNuxtPlugin(async () => ({ provide: { crumbs: new Crumbs() } }))

declare module '#app' {
  interface NuxtApp {
    $crumbs: typeof Crumbs
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $crumbs: typeof Crumbs
  }
}


