import {
  describe,
  expect,
  test,
} from 'vitest'
import type { BreadCrumb } from '@/types/frontend'
import { useCrumbs } from '~/composables/crumbs'

describe('useCrumbs', () => {
  test('sets crumbs', () => {
    const { setCrumbs, list } = useCrumbs()
    const crumbs = [{ name: 'foo', to: '/foo' }] as BreadCrumb[]
    setCrumbs(crumbs)
    expect(list.value).toEqual(crumbs)
  })

  test('sets actions', () => {
    const { setActions, actions } = useCrumbs()
    const crumbs = [{ name: 'foo', to: '/foo' }] as BreadCrumb[]
    setActions(crumbs)
    expect(actions.value).toEqual(crumbs)
  })
})
