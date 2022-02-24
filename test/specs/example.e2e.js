const libHomeView = require('../libHomeView/libHomeView.js')
const sleep = (ms) => new Promise((r)=> setTimeout(r, ms))

// describe('Filtr test', () => {
//     it('filtrowanie po statusie', async () => {
//         await browser.url(`http://localhost:8080`);
//         libHomeView.clickButton(" Przegląd historii ");

//         $("#status").click();
//         $('v-list-item__content')[2].click();
//         await sleep(2000);
//         $('.v-btn--is-elevated').click();
//         found = false;
//         $$('.v-card__title.d-flex.py-2').forEach(element => {
//             found=element.children[3].innerText!="Gotowy do wysyłki";            
            
//         });
//         await sleep(2000);
//         expect(found).toEqual(false);
//     });

    
// });

describe('Filtr test', () => {
    it('filtrowanie po lokalizacji', async () => {
        await browser.url(`http://localhost:8080`);
        libHomeView.clickButton(" Przegląd historii ");
        $("#lokalizacja").click();
        $$('.v-list-item__content')[23].click();
        await sleep(5000);
        $('.v-btn--is-elevated').click();
        await sleep(2000)
        found = false;
        $$('.v-card__title.d-flex.py-2').forEach(element => {
            found=element.children[4].innerText!="B_PVC";            
        });
        await sleep(2000);
        expect(found).toEqual(false);
    });

    
});

