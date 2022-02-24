const libHomeView = require('../libHomeView/libHomeView.js')
const sleep = (ms) => new Promise((r)=> setTimeout(r, ms))

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url(`http://localhost:8080`);
        libHomeView.clickButton(" Przegląd historii ");

        $("#status").click();
        $('v-list-item__content')[2].click();
        await sleep(2000);
        $('.v-btn--is-elevated').click();
        found = false;
        $$('.v-card__title.d-flex.py-2').forEach(element => {
            found=element.children[3].innerText!="Gotowy do wysyłki";            
            
        });
        await sleep(2000);
        expect(found).toEqual(false);
    });
});

