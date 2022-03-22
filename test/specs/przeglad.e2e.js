const chromedriver = require('chromedriver');
const Biblio = require('../Library/lib.js')
const {Builder, By, Key} = require ("selenium-webdriver");
const assert = require ("assert")
const expect = require ("expect");
const { time } = require('console');
let driver

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function Filtruj(elTab, id, kolumna, status) {
    await sleep(8000)
    const elementFiltr = await driver.findElements(By.className('v-select__selections'));
    await sleep(2000)
    elementFiltr[elTab].click();
    await sleep(2000)
    await driver.findElement(By.id(id)).click();
    await sleep(2000)
    await driver.findElement(By.id('filter-button')).click();
   await sleep(2000)
    var found = false;
    await sleep(3000)
    const wynik = await driver.findElements(By.css("span.text-body-2"))
    await sleep(3000)
    for (let index = 4; index < wynik.length; index++) {
        if(index % 4 === kolumna){
            found = await wynik[index].getAttribute("innerText") !== status ? true : found
        } 
    }
    expect(found).toEqual(false);
    await driver.quit()
    driver = null;
}

async function WpiszTekst(numerStojaka, nazwa) {
    await sleep(8000)
    await Biblio.KodStojaka('stand-barcode', numerStojaka, 'filter-button')
        var found = false;
    await sleep(3000)
    const wynik = await driver.findElements(By.css("span.text-subtitle-2"));
    await sleep(3000)
    found = await wynik[1].getAttribute("innerText") !== nazwa ? true : found
    expect(found).toEqual(false);
    await driver.quit()
    driver = null;
}

describe('Przegląd historii', async(done) =>{
    it('Status zwrocony', async() =>{
        driver = await new Builder().forBrowser("firefox").build()
        await driver.get('http://localhost:8080')
        driver.manage().window().maximize();
        await Biblio.Menu('admin', 'admin123', 'przeglad', driver)
        await Filtruj(0,'Zwrocony', 2, 'Zwrócony')
    }).catch(done);
});

describe('Przegląd historii', async(done) =>{
    it('Status gotowy', async() =>{
        driver = await new Builder().forBrowser("firefox").build()
        await driver.get('http://localhost:8080')
        driver.manage().window().maximize();
        await Biblio.Menu('admin', 'admin123', 'przeglad', driver)
        await Filtruj(0, 'Gotowy', 2, 'Gotowy do wysyłki')
    }).catch(done);
});

describe('Przegląd historii', async(done) =>{
    it('Status wyslany', async() =>{
        driver = await new Builder().forBrowser("firefox").build()
        await driver.get('http://localhost:8080')
        driver.manage().window().maximize();
        await Biblio.Menu('admin', 'admin123', 'przeglad', driver)
        await Filtruj(0, 'Wyslany', 2, 'Wysłany')
    }).catch(done);
});

describe('Przegląd historii', async(done) =>{
    it('Status zmiana', async() =>{
        driver = await new Builder().forBrowser("firefox").build()
        await driver.get('http://localhost:8080')
        driver.manage().window().maximize();
        await Biblio.Menu('admin', 'admin123', 'przeglad', driver)
        await Filtruj(0, 'Zmiana', 2, 'Zmiana lokalizacji')
    }).catch(done);
});

describe('Przegląd historii', async(done) =>{
    it('Status przyjecie', async() =>{
        driver = await new Builder().forBrowser("firefox").build()
        await driver.get('http://localhost:8080')
        driver.manage().window().maximize();
        await Biblio.Menu('admin', 'admin123', 'przeglad', driver)
        await Filtruj(0, 'Przyjecie', 2, 'Przyjęcie na stan')
    }).catch(done);
});

describe('Przegląd historii', async(done) =>{
    it('Lokalizacja PVC', async() =>{
        driver = await new Builder().forBrowser("firefox").build()
        await driver.get('http://localhost:8080')
        driver.manage().window().maximize();
        await Biblio.Menu('admin', 'admin123', 'przeglad', driver)
        await Filtruj(1, 'PVC', 3, 'B_PVC')
    }).catch(done);
});

describe('Przegląd historii', async(done) =>{
    it('Lokalizacja ALU', async() =>{
        driver = await new Builder().forBrowser("firefox").build()
        await driver.get('http://localhost:8080')
        driver.manage().window().maximize();
        await Biblio.Menu('admin', 'admin123', 'przeglad', driver)
        await Filtruj(1, 'ALU', 3, 'B_ALU')
    }).catch(done);
});

describe('Przegląd historii', async(done) =>{
    it('Lokalizacja DRE', async() =>{
        driver = await new Builder().forBrowser("firefox").build()
        await driver.get('http://localhost:8080')
        driver.manage().window().maximize();
        await Biblio.Menu('admin', 'admin123', 'przeglad', driver)
        await Filtruj(1, 'DRE', 3, 'B_DRE')
    }).catch(done);
});

describe('Przegląd historii', async(done) =>{
    it('Deadline zbizajacy', async() =>{
        driver = await new Builder().forBrowser("firefox").build()
        await driver.get('http://localhost:8080')
        driver.manage().window().maximize();
        await Biblio.Menu('admin', 'admin123', 'przeglad', driver)
        await Filtruj(2, 'Zblizajacy_sie_termin', 1, 'B_DRE')
    }).catch(done);
});


describe('Przegląd historii', async(done) =>{
    it('Po terminie', async() =>{
        driver = await new Builder().forBrowser("firefox").build()
        await driver.get('http://localhost:8080')
        driver.manage().window().maximize();
        await Biblio.Menu('admin', 'admin123', 'przeglad', driver)
        await Filtruj(2, 'Po_terminie', 1, 'B_DRE')
    }).catch(done);
});

describe('Przegląd historii', async(done) =>{
    it('Numer stojaka', async() =>{
        driver = await new Builder().forBrowser("firefox").build()
        await driver.get('http://localhost:8080')
        driver.manage().window().maximize();
        await Biblio.Menu('admin', 'admin123', 'przeglad', driver)
        await WpiszTekst('BB120', 'BB120')

    }).catch(done);
});

describe('Przegląd historii', async(done) =>{
    it('Klient', async() =>{
        driver = await new Builder().forBrowser("firefox").build()
        await driver.get('http://localhost:8080')
        driver.manage().window().maximize();
        await Biblio.Logowanie('admin', 'admin123', driver)
        await driver.findElement(By.id('przeglad')).click();
        await sleep(8000)
        await driver.findElement(By.id('client')).sendKeys('Marc-Andre Morin Ublo Inc.')
        await sleep(2000)
        await driver.findElement(By.id('filter-button')).click();
        await sleep(2000)
        await driver.findElement(By.className('text-subtitle-2')).click()
        await sleep(2000)

    }).catch(done);
});

