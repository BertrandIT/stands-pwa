// import { shallowMount } from "@vue/test-utils";
// import HelloWorld from "@/views/HistoryView.vue";

// describe("HistoryView.vue", () => {
//   it("renders props.msg when passed", () => {
//     const stands = [];
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { stands },
//     });
//     expect(wrapper.text()).toMatch(stands);
//   });
// });

import HistoryView from "@/views/HistoryView";
import Filters from "@/components/HistoryView/Filters.vue"
import StandList from "@/components/HistoryView/StandList.vue"
import { createLocalVue, mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'

jest.mock('@/components/HistoryView/Filters.vue');


Vue.use(Vuetify)
const vuetify = new Vuetify()
const localVue = createLocalVue()


describe("Strona główna", () => {
    it("Przegląd historii", async() => {
        const wrapper = await mount(HistoryView, { localVue, vuetify })
        const filter = wrapper.findComponent(Filters)
        const standlist = wrapper.findComponent(StandList)
        await standlist.setProps({
            stands: [{
                    "id": 11325,
                    "barcode": "28773",
                    "deadline": "2022-01-08",
                    "action": "Gotowy do wysyłki",
                    "localization": "B_PVC",
                    "admitDate": "2021-12-10",
                    "name": null
                },
                {
                    "id": 12620,
                    "barcode": "69491",
                    "deadline": "2022-03-31",
                    "action": "Gotowy do wysyłki",
                    "localization": "B_PVC",
                    "admitDate": "2022-02-23",
                    "name": null
                },
                {
                    "id": 12405,
                    "barcode": "51716",
                    "deadline": "2022-03-10",
                    "action": "Gotowy do wysyłki",
                    "localization": "B_PVC",
                    "admitDate": "2022-02-09",
                    "name": null
                },
                {
                    "id": 12567,
                    "barcode": "35063",
                    "deadline": "2022-03-31",
                    "action": "Gotowy do wysyłki",
                    "localization": "B_PVC",
                    "admitDate": "2022-02-21",
                    "name": null
                },
                {
                    "id": 12591,
                    "barcode": "64008",
                    "deadline": "2022-03-31",
                    "action": "Gotowy do wysyłki",
                    "localization": "B_PVC",
                    "admitDate": "2022-02-21",
                    "name": null
                },
                {
                    "id": 4031,
                    "barcode": "BB120",
                    "deadline": "2021-09-28",
                    "action": "Wysłany",
                    "localization": "K-0379",
                    "admitDate": "2021-08-30",
                    "name": "ATAL KONS."
                },
                {
                    "id": 12178,
                    "barcode": "55489",
                    "deadline": "2022-03-01",
                    "action": "Gotowy do wysyłki",
                    "localization": "B_PVC",
                    "admitDate": "2022-01-31",
                    "name": null
                },
                {
                    "id": 11001,
                    "barcode": "BB61",
                    "deadline": null,
                    "action": "Gotowy do wysyłki",
                    "localization": "B_PVC",
                    "admitDate": "2021-11-24",
                    "name": null
                },
                {
                    "id": 9196,
                    "barcode": "51575",
                    "deadline": "2021-08-05",
                    "action": "Zwrócony",
                    "localization": "Zwrócony",
                    "admitDate": "2021-07-07",
                    "name": null
                },
                {
                    "id": 9366,
                    "barcode": "59315",
                    "deadline": "2021-05-07",
                    "action": "Zwrócony",
                    "localization": "Zwrócony",
                    "admitDate": "2021-04-08",
                    "name": null
                },
                {
                    "id": 9443,
                    "barcode": "84065",
                    "deadline": "2021-09-11",
                    "action": "Zwrócony",
                    "localization": "Zwrócony",
                    "admitDate": "2021-08-13",
                    "name": null
                },
                {
                    "id": 10931,
                    "barcode": "59031",
                    "deadline": "2021-12-18",
                    "action": "Zwrócony",
                    "localization": "Zwrócony",
                    "admitDate": "2021-11-19",
                    "name": null
                },
                {
                    "id": 11838,
                    "barcode": "36520",
                    "deadline": "2022-02-12",
                    "action": "Zwrócony",
                    "localization": "Zwrócony",
                    "admitDate": "2022-01-14",
                    "name": null
                },
                {
                    "id": 11898,
                    "barcode": "90827",
                    "deadline": "2022-02-15",
                    "action": "Zwrócony",
                    "localization": "Zwrócony",
                    "admitDate": "2022-01-17",
                    "name": null
                },
                {
                    "id": 11932,
                    "barcode": "83320",
                    "deadline": "2022-02-17",
                    "action": "Zwrócony",
                    "localization": "Zwrócony",
                    "admitDate": "2022-01-19",
                    "name": null
                },
                {
                    "id": 11933,
                    "barcode": "85257",
                    "deadline": "2022-02-17",
                    "action": "Zwrócony",
                    "localization": "Zwrócony",
                    "admitDate": "2022-01-19",
                    "name": null
                },
                {
                    "id": 12023,
                    "barcode": "72298",
                    "deadline": "2022-02-19",
                    "action": "Zwrócony",
                    "localization": "Zwrócony",
                    "admitDate": "2022-01-21",
                    "name": null
                },
                {
                    "id": 12042,
                    "barcode": "28654",
                    "deadline": "2022-02-22",
                    "action": "Zwrócony",
                    "localization": "Zwrócony",
                    "admitDate": "2022-01-24",
                    "name": null
                },
                {
                    "id": 12091,
                    "barcode": "27455",
                    "deadline": "2022-02-24",
                    "action": "Zwrócony",
                    "localization": "Zwrócony",
                    "admitDate": "2022-01-26",
                    "name": null
                },
                {
                    "id": 12104,
                    "barcode": "69535",
                    "deadline": "2022-02-24",
                    "action": "Zwrócony",
                    "localization": "Zwrócony",
                    "admitDate": "2022-01-26",
                    "name": null
                },
                {
                    "id": 12156,
                    "barcode": "76485",
                    "deadline": "2022-02-26",
                    "action": "Zwrócony",
                    "localization": "Zwrócony",
                    "admitDate": "2022-01-28",
                    "name": null
                },
                {
                    "id": 12208,
                    "barcode": "20241",
                    "deadline": "2022-03-01",
                    "action": "Zwrócony",
                    "localization": "Zwrócony",
                    "admitDate": "2022-01-31",
                    "name": null
                },
                {
                    "id": 12210,
                    "barcode": "26428",
                    "deadline": "2022-03-01",
                    "action": "Zwrócony",
                    "localization": "Zwrócony",
                    "admitDate": "2022-01-31",
                    "name": null
                },
            ]
        })
        const textinput = filter.find('input[id=status]');
        const button = filter.find('button')
        await textinput.setValue('Gotowy do wysyłki');
        await button.trigger('click');
        console.log(wrapper.vm.$data.stands)
        expect(standlist.text()).not.toMatch('Gotowy do wysyłki')

    });
});