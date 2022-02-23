
import AdmitStands from "@/views/AdmitStands";
import HomeView from "@/views/HomeView";
import {mount} from "@vue/test-utils";

test('Calls save() when pressing save button', () => {
  const wrapper = mount(HomeView);
  const button = wrapper.find('#homebutton-0')
  button.trigger('click')
  expect(wrapper.emitted('Przyjęcie')).toHaveLength(1)
})

// const localVue = createLocalVue()
// localVue.use(VueRouter)

// describe("HomeView", () => {
//   it("renders a child component via routing", async () => {
//     const router = new VueRouter({ routes })
//     const wrapper = mount(App, { 
//       localVue,
//       router
//     })

//     router.push("/admitStands")
//     await wrapper.vm.$nextTick()

//     expect(wrapper.findComponent(AdmitStands).exists()).toBe(true)
//   })
// })