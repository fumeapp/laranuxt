import { mount } from '@vue/test-utils'
import IconClient from '@/client/components/IconCLient.vue'

test('IconClient', () => {
  const wrapper = mount(IconClient, {
    props: {
      icon: 'mdi-check',
    },
  })

  expect(wrapper.text()).toContain('mdi-check')

})
