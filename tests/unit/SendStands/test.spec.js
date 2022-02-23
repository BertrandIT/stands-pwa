import { mount } from "@vue/test-utils";
import SendStands from "@/views/SendStands";


describe("Strona główna", () => {
  it("Wysyłka stojaków", () => {
    const msg = "Wysyłka";
    const wrapper = mount(SendStands);
    expect(wrapper.text()).toMatch(msg);
  });
});
