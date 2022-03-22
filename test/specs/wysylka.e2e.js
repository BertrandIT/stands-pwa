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

async function Wyszukaj(nrStojaka) {
    await driver.findElement(By.id('send-stands-search')).sendKeys(nrStojaka);
    await sleep(2000)
}

describe('Wysyłka stojaka', async(done) =>{
    it('Wyszukaj', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'wysylka', driver)
    await Wyszukaj('DREWNO608')
    await Biblio.SprawdzTekst('text-subtitle-2', 'DREWNO608', driver)
    }).catch(done);
});

describe('Wysyłka stojaka', async(done) =>{
    it('Edycja', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'wysylka', driver)
    await Wyszukaj('DREWNO608')
    await Biblio.Button('edit-stand', driver)
    await Biblio.KodStojaka('new-stand-barcode', 'test1', 'download-stands', driver)
    await Biblio.Alert('Pomyślnie załadowano stojak', driver)
    }).catch(done);
});

describe('Wysyłka stojaka', async(done) =>{
    it('Reset', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'wysylka', driver)
    await Wyszukaj('DREWNO608')
    await Biblio.Button('edit-stand', driver)    
    await Biblio.KodStojaka('new-stand-barcode', 'test1', 'download-stands', driver)
    //await sleep(1000)
    await Biblio.Button('reset-stands', driver)
    await Biblio.SprawdzTekst2('v-label', 1, 'Kod stojaka', driver)
    }).catch(done);
});

describe('Wysyłka stojaka', async(done) =>{
    it('Zly kod', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'wysylka', driver)
    await Wyszukaj('DREWNO608')
    await Biblio.Button('edit-stand', driver) 
    await Biblio.KodStojaka('new-stand-barcode', '123', 'download-stands', driver)
    await Biblio.Alert('Nie znaleziono stojaka o podanym barkodzie', driver)
    }).catch(done);
});

describe('Wysyłka stojaka', async(done) =>{
    it('Brak kodu', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'wysylka', driver)
    await Wyszukaj('DREWNO608')
    await Biblio.Button('edit-stand', driver)
    await Biblio.Button('download-stands', driver)
    await Biblio.Alert('Nie podano barkodu stojaka', driver)
    }).catch(done);
});

describe('Wysyłka stojaka', async(done) =>{
    it('Klik', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'wysylka', driver)
    await Wyszukaj('DREWNO608')
    await Biblio.Button('edit-stand', driver) 
    await Biblio.KodStojaka('new-stand-barcode', '123', 'download-stands', driver)
    const test = await driver.findElements(By.className('my-1'))
    test[1].click()
    await sleep(2000)
    await driver.findElement(By.id('save-edit-stand-items')).click()
    }).catch(done);
});
