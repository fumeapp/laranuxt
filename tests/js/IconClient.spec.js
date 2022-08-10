import { mount } from '@vue/test-utils'
import TransitionScaleIn from '@/client/components/transition/TransitionScaleIn.vue'

test('TransitionScaleIn', () => {
  const wrapper = mount(TransitionScaleIn, {
    props: {
      appear:  true,
    },
  })

  expect(wrapper.text()).toContain('')

})
