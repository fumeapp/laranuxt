import { mount } from '@vue/test-utils'
import {
  describe,
  expect,
  test,
} from 'vitest'
import ContactCard from '~/components/contact/ContactCard.vue'

describe('ContactCard', () => {
  test('renders contact card for non admin', () => {
    const wrapper = mount(ContactCard, {
      props: {
        user: {} as models.User,
      },

      computed: {
        isAdmin: () => false,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('renders contact card for admin', () => {
    const wrapper = mount(ContactCard, {
      props: {
        user: {} as models.User,
      },

      computed: {
        isAdmin: () => true,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
