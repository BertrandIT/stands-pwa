import { mount } from "@vue/test-utils";
import ReturnStands from "@/views/ReturnStands";


describe("Strona główna", () => {
  it("Zwrot stojaków", () => {
    const msg = "Zwrot";
    const wrapper = mount(ReturnStands);
    expect(wrapper.text()).toMatch(msg);
  });
});
