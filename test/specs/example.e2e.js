const chromedriver = require('chromedriver');
const libHomeView = require('../libHomeView/libHomeView.js')
const Logowanie = require('../libLogowanie/libLogowanie.js')
const {Builder, By, Key} = require ("selenium-webdriver");
const assert = require ("assert")
const expect = require ("expect");
const { time } = require('console');
let driver

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function Filtruj(id) {
    await driver.findElement(By.id('przeglad')).click();
    await sleep(8000)
    const elementFiltr = await driver.findElements(By.className('v-select__selections'));
    await sleep(2000)
    elementFiltr[0].click();
    await sleep(2000)
    await driver.findElement(By.id(id)).click();
    await sleep(2000)
    await driver.findElement(By.id('filter-button')).click();
   // expect(tytul).toEqual(nrStojaka)
   await sleep(2000)
    var found = false;
    //const wynik = await driver.findElements(By.css("div[class='v-card__title d-flex py-2']"));
   // driver.execute_script("return document.querySelector");
    await sleep(3000)
    const wynik = await driver.findElements(By.js("return document.querySelectorAll('span.text-body-2')"))
    
    //console.log(wynik)
    await sleep(3000)
    
    wynik.forEach(async(element, idx) => {
    const proba = await element.getText();
       console.log(proba);
    });
   
//     wynik.forEach(async(element) => {
//        const el = element.findElement(By.className('text-body-2')[2]).getText();
//        found = el!='ZW';
//        console.log(el)
//    });
   
    expect(found).toEqual(false);
    await driver.quit()
    driver = null;

}

describe('Wysyłka stojaka', async(done) =>{
    it('Wyszukanie po nr stojaka', async() =>{
         //launch the browser
    driver = await new Builder().forBrowser("firefox").build()
    //navigate to application
    await driver.get('http://localhost:8080')
        await Logowanie.Logowanie('admin', 'admin123', driver)
        await Filtruj('Zwrocony')
    }).catch(done);
});

// describe('Filtr test', async() => {
//     it('filtrowanie po statusie - zwrócony', async () => {
//         await browser.url(`http://localhost:8080`);
//         libHomeView.clickButton(" Przegląd historii ");
//         await browser.pause(2000)
//         const myButton = await $$('.v-select__selections')[0];
//         await browser.pause(5000)
//         await myButton.click()
//         await browser.pause(2000)
//         $('#Zwrocony').click();
//         await browser.pause(2000)
//         const filtr = await $('#filter-button')
//         await filtr.click()
//         await browser.pause(2000)
//         var found = false;
//         await $$('.v-card__title.d-flex.py-2').forEach(async(element) => {
//             const el = await element.$$('.text-body-2')[2].getText();
//             found = el!='Zwrócony';
//         });
//         expect(found).toEqual(false);
//     });
// });

// describe('Filtr test', async() => {
//     it('filtrowanie po statusie - gotowy do wysyłki', async () => {
//         await browser.url(`http://localhost:8080`);
//         libHomeView.clickButton(" Przegląd historii ");
//         await browser.pause(2000)
//         const myButton = await $$('.v-select__selections')[0];
//         await browser.pause(5000)
//         await myButton.click()
//         await browser.pause(2000)
//         $('#Gotowy').click();
//         await browser.pause(2000)
//         const filtr = await $('#filter-button')
//         await filtr.click()
//         await browser.pause(2000)
//         var found = false;
//         await $$('.v-card__title.d-flex.py-2').forEach(async(element) => {
//             const el = await element.$$('.text-body-2')[2].getText();
//             found = el!='Gotowy do wysyłki';
//             console.log(el);
//         });

// describe('My Login application', () => {
//     it('should login with valid credentials', async () => {
//         expect(found).toEqual(false);
//     });
// });

// describe('Filtr test', () => {
// const libHomeView = require('../libHomeView/libHomeView.js')
// const sleep = (ms) => new Promise((r)=> setTimeout(r, ms))

// describe('Filtr test', async() => {
//     it('filtrowanie po statusie - zwrócony', async () => {
//         await browser.url(`http://localhost:8080`);
//         libHomeView.clickButton(" Przegląd historii ");
//         await browser.pause(2000)
//         const myButton = await $$('.v-select__selections')[0];
//         await browser.pause(5000)
//         await myButton.click()
//         await browser.pause(2000)
//         $('#Zwrocony').click();
//         await browser.pause(2000)
//         const filtr = await $('#filter-button')
//         await filtr.click()
//         await browser.pause(2000)
//         var found = false;
//         await $$('.v-card__title.d-flex.py-2').forEach(async(element) => {
//             const el = await element.$$('.text-body-2')[2].getText();
//             found = el!='Zwrócony';
//         });
//         expect(found).toEqual(false);
//     });
// });

// describe('Filtr test', async() => {
//     it('filtrowanie po statusie - gotowy do wysyłki', async () => {
//         await browser.url(`http://localhost:8080`);
//         libHomeView.clickButton(" Przegląd historii ");
//         await browser.pause(2000)
//         const myButton = await $$('.v-select__selections')[0];
//         await browser.pause(5000)
//         await myButton.click()
//         await browser.pause(2000)
//         $('#Gotowy').click();
//         await browser.pause(2000)
//         const filtr = await $('#filter-button')
//         await filtr.click()

//         await browser.pause(2000)

//         var found = false;
//         await $$('.v-card__title.d-flex.py-2').forEach(async(element) => {
//             const el = await element.$$('.text-body-2')[2].getText();
//             found = el!='Gotowy do wysyłki';
//             console.log(el);
//         });
//         expect(found).toEqual(false);
//     });
// });

// describe('Filtr test', () => {
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
//     it('filtrowanie po lokalizacji', async () => {

//         await browser.url(`http://localhost:8080`);
//         libHomeView.clickButton(" Przegląd historii ");
//         $("#lokalizacja").click();
//         $$('.v-list-item__content')[23].click();
//         await sleep(5000);
//         $('.v-btn--is-elevated').click();
//         await sleep(2000)
//         found = false;
//         $$('.v-card__title.d-flex.py-2').forEach(element => {
//             found=element.children[4].innerText!="B_PVC";            
//         });
//         await sleep(2000);
//         expect(found).toEqual(false);
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
    

// describe('Filtr test', () => {
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
    

