import type { DropdownGroup } from '@/components/dropdown/DropdownGroup.vue'
import type Api from '@/lib/api'

interface MenuItem {
  name: string
  icon: string
  to: string
  names: string[]
  gated: boolean
}

export default class {
  constructor(
    private api: Api,
  ) { }

  public main(): MenuItem[] {
    if (this.api.loggedIn.value)
      return this.items()
    return this.items().filter(item => !item.gated)
  }

  public items(): MenuItem[] {
    return [
      {
        name: 'Home',
        icon: 'mdi-view-dashboard',
        to: '/',
        names: ['index'],
        gated: false,
      },
      {
        name: 'Gated',
        icon: 'fluent:people-team-24-regular',
        to: '/gated',
        names: ['gated'],
        gated: true,
      },
      {
        name: 'User Sessions',
        icon: 'mdi-devices',
        to: '/sessions',
        gated: true,
        names: ['sessions'],
      },
    ]
  }
  private async logout() {
    await this.api.logout()
  }

  public isCurrent = (item: MenuItem) =>
    typeof useRoute().name === 'string' && item.names.includes(useRoute().name as string)
}
