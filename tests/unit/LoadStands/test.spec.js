import { mount } from "@vue/test-utils";
import LoadStands from "@/views/LoadStands";


describe("Strona główna", () => {
  it("Załadunek stojakó", () => {
    const msg = "Załadunek";
    const wrapper = mount(LoadStands);
    expect(wrapper.text()).toMatch(msg);
  });
});
