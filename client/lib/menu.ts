import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'
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
    private route: RouteLocationNormalizedLoaded,
    private router: Router,
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

  public profileGroup: DropdownGroup = [
    [
      {
        icon: 'carbon:user-profile',
        name: 'Your Profile',
        action: () => this.router.push('/profile'),
      },
      {
        icon: 'mdi-devices',
        name: 'Your Devices',
        action: () => this.router.push('/sessions'),
      },
    ],
    [
      {
        icon: 'heroicons-outline:logout',
        name: 'Logout',
        action: async () => await this.logout(),
      },
    ],
  ]

  private async logout() {
    await this.api.logout(this.router)
  }

  public isCurrent = (item: MenuItem) =>
    typeof this.route.name === 'string' && item.names.includes(this.route.name)
}
