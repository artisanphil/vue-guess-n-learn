import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('Home.vue', () => {
  it('renders index view', () => {
    const wrapper = shallowMount(Home);
    const instructions = 'Please choose a character for the computer to guess';

    expect(wrapper.text()).toMatch(instructions)
  })
})
