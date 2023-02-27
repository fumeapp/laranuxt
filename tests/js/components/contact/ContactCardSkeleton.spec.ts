import { mount } from '@vue/test-utils'
import {
  describe,
  expect,
  test,
} from 'vitest'
import ContactCardSkeleton from '~/components/contact/ContactCardSkeleton.vue'

describe('ContactCardSkeleton', () => {
  test('renders contact card skelton', () => {
    const wrapper = mount(ContactCardSkeleton)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
