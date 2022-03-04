const libHomeView = require('../libHomeView/libHomeView.js')
const sleep = (ms) => new Promise((r)=> setTimeout(r, ms))

describe('Filtr test', async() => {
    it('filtrowanie po statusie - zwrócony', async () => {
        await browser.url(`http://localhost:8080`);
        libHomeView.clickButton(" Przegląd historii ");
        await browser.pause(2000)
        const myButton = await $$('.v-select__selections')[0];
        await browser.pause(5000)
        await myButton.click()
        await browser.pause(2000)
        $('#Zwrocony').click();
        await browser.pause(2000)
        const filtr = await $('#filter-button')
        await filtr.click()
        await browser.pause(2000)
        var found = false;
        await $$('.v-card__title.d-flex.py-2').forEach(async(element) => {
            const el = await element.$$('.text-body-2')[2].getText();
            found = el!='Zwrócony';
        });
        expect(found).toEqual(false);
    });
});

describe('Filtr test', async() => {
    it('filtrowanie po statusie - gotowy do wysyłki', async () => {
        await browser.url(`http://localhost:8080`);
        libHomeView.clickButton(" Przegląd historii ");
        await browser.pause(2000)
        const myButton = await $$('.v-select__selections')[0];
        await browser.pause(5000)
        await myButton.click()
        await browser.pause(2000)
        $('#Gotowy').click();
        await browser.pause(2000)
        const filtr = await $('#filter-button')
        await filtr.click()
<<<<<<< HEAD
=======
        await browser.pause(2000)
>>>>>>> 239c39aa05b57b158ce5d953166a142fac767389
        var found = false;
        await $$('.v-card__title.d-flex.py-2').forEach(async(element) => {
            const el = await element.$$('.text-body-2')[2].getText();
            found = el!='Gotowy do wysyłki';
            console.log(el);
        });
        expect(found).toEqual(false);
    });
});

// describe('Filtr test', () => {
<<<<<<< HEAD
=======
//     it('filtrowanie po statusie - gotowy do wysyłki', async () => {
//         await browser.url(`http://localhost:8080`);
//         libHomeView.clickButton(" Przegląd historii ");
//         $("#status").click();
//         $("#Gotowy").click();
//         await sleep(2000);
//         $$('#filter-button').click();
//         found = false;
//         $$('.v-card__title.d-flex.py-2').forEach(element => {
//             found=element.children[3].innerText!="Gotowy do wysyłki";            
            
//         });
//         await sleep(2000);
//         expect(found).toEqual(false);
//     });
// });

// describe('Filtr test', () => {
>>>>>>> 239c39aa05b57b158ce5d953166a142fac767389
//     it('filtrowanie po statusie - wysłany', async () => {
//         await browser.url(`http://localhost:8080`);
//         libHomeView.clickButton(" Przegląd historii ");
//         $("#status").click();
//         $("#Wyslany").click();
//         await sleep(2000);
//         $$('#filter-button').click();
//         found = false;
//         $$('.v-card__title.d-flex.py-2').forEach(element => {
//             found=element.children[3].innerText!="Wysłany";            
            
//         });
//         await sleep(2000);
//         expect(found).toEqual(false);
//     });
// });

// describe('Filtr test', () => {
//     it('filtrowanie po statusie - zmiana lokalizacji', async () => {
//         await browser.url(`http://localhost:8080`);
//         libHomeView.clickButton(" Przegląd historii ");
//         $("#status").click();
//         $("#Zmiana").click();
//         await sleep(2000);
//         $$('#filter-button').click();
//         found = false;
//         $$('.v-card__title.d-flex.py-2').forEach(element => {
//             found=element.children[3].innerText!="Zmiana lokalizacji";            
            
//         });
//         await sleep(2000);
//         expect(found).toEqual(false);
//     });
// });

// describe('Filtr test', () => {
//     it('filtrowanie po statusie - przyjęcie na stan', async () => {
//         await browser.url(`http://localhost:8080`);
//         libHomeView.clickButton(" Przegląd historii ");
//         $("#status").click();
//         $("#Przyjecie").click();
//         await sleep(2000);
//         $$('#filter-button').click();
//         found = false;
//         $$('.v-card__title.d-flex.py-2').forEach(element => {
//             found=element.children[3].innerText!="Przyjęcie na stan";            
            
//         });
//         await sleep(2000);
//         expect(found).toEqual(false);
//     });
// });

// describe('Filtr test', () => {
//     it('filtrowanie po lokalizacji - PVC', async () => {
//         await browser.url(`http://localhost:8080`);
//         libHomeView.clickButton(" Przegląd historii ");
//         $("#localization-select").click();
//         $$('#PVC').click();
//         await sleep(5000);
//         $$('#filter-button').click();
//         await sleep(2000)
//         found = false;
//         $$('.v-card__title.d-flex.py-2').forEach(element => {
//             found=element.children[4].innerText!="B_PVC";            
//         });
//         await sleep(2000);
//         expect(found).toEqual(false);
//     });
// });

// describe('Filtr test', () => {
//     it('filtrowanie po lokalizacji - ALU', async () => {
//         await browser.url(`http://localhost:8080`);
//         libHomeView.clickButton(" Przegląd historii ");
//         $("#localization-select").click();
//         $$('#ALU').click();
//         await sleep(5000);
//         $$('#filter-button').click();
//         await sleep(2000)
//         found = false;
//         $$('.v-card__title.d-flex.py-2').forEach(element => {
//             found=element.children[4].innerText!="B_ALU";            
//         });
//         await sleep(2000);
//         expect(found).toEqual(false);
//     });
// });

// describe('Filtr test', () => {
//     it('filtrowanie po lokalizacji', async () => {
//         await browser.url(`http://localhost:8080`);
//         libHomeView.clickButton(" Przegląd historii ");
//         $("#localization-select").click();
//         $$('#DRE').click();
//         await sleep(5000);
//         $$('#filter-button').click();
//         await sleep(2000)
//         found = false;
//         $$('.v-card__title.d-flex.py-2').forEach(element => {
//             found=element.children[4].innerText!="B_DRE";            
//         });
//         await sleep(2000);
//         expect(found).toEqual(false);
//     });
// });
// describe('Filtr test', () => {
//     it('filtrowanie deadline - zbliżający się termin', async () => {
//         await browser.url(`http://localhost:8080`);
//         libHomeView.clickButton(" Przegląd historii ");
//         $("#deadline-select").click();
//         $$('#Zblizajacy_sie_termin').click();
//         await sleep(5000);
//         $$('#filter-button').click();
//         await sleep(2000)
//         found = false;
//         $$('.v-card__title.d-flex.py-2').forEach(element => {
//             found=element.children[2].innerText!="Zbliżający się termin";            
//         });
//         await sleep(2000);
//         expect(found).toEqual(false);
//     });
// });   
// describe('Filtr test', () => {
//     it('filtrowanie deadline - po terminie', async () => {
//         await browser.url(`http://localhost:8080`);
//         libHomeView.clickButton(" Przegląd historii ");
//         $("#deadline-select").click();
//         $$('#Po_terminie').click();
//         await sleep(5000);
//         $$('#filter-button').click();
//         await sleep(2000)
//         found = false;
//         $$('.v-card__title.d-flex.py-2').forEach(element => {
//             found=element.children[2].innerText!="Po terminie";            
//         });
//         await sleep(2000);
//         expect(found).toEqual(false);
//     });

    
// });

// describe('Filtr test', () => {
//         it('filtrowanie - numer sojaka', async() => {
//             await browser.url(`http://localhost:8080`);
//             libHomeView.clickButton(" Przegląd historii ");
//             $('#stand-barcode').addValue('35063');
//             await browser.pause(5000)
//             $('#filter-button').click();
//         });
//     });

//     describe('Filtr test', () => {
//         it('filtrowanie - data', async() => {
//             await browser.url(`http://localhost:8080`);
//             libHomeView.clickButton(" Przegląd historii ");
//             $('#admit-stand-date').setValue('24-02-2022');
//             await browser.pause(5000)
//             $('#filter-button').click();
//             await browser.pause(5000)
//         });
//     });
    

