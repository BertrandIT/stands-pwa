import { mount } from "@vue/test-utils";
import HistoryView from "@/views/HistoryView";


describe("Strona główna", () => {
  it("Przegląd historii", () => {
    const msg = "Logi";
    const wrapper = mount(HistoryView);
    expect(wrapper.text()).toMatch(msg);
  });
});
