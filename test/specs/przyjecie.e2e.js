const chromedriver = require('chromedriver');
const Biblio = require('../Library/lib.js')
const Alert = require('../Library/lib.js')
const {Builder, By, Key} = require ("selenium-webdriver");
const assert = require ("assert")
const expect = require ("expect");
const { time } = require('console');
let driver

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function Przyjecie(buttonLokalizacja, buttonDostawca) {
    const test1 = await driver.findElements(By.className('v-select__selections'))
    await sleep(2000)
    test1[0].click();
    await sleep(2000)
    await driver.findElement(By.id(buttonLokalizacja)).click();
    await sleep(2000)
    test1[1].click();
    await sleep(2000)
    await driver.findElement(By.id(buttonDostawca)).click();
    await sleep(2000)
    await Biblio.Button('manually-add-stand',driver)
}

async function NiewypelnionePole(elTab, button) {
    const test1 = await driver.findElements(By.className('v-select__selections'))
    await sleep(2000)
    test1[elTab].click();
    await sleep(2000)
    await Biblio.Button(button, driver)
    await Biblio.Button('manually-add-stand',driver)
}

async function PrzyjmijDodaj(kodStojaka){
    await Biblio.KodStojaka('add-stand-input', kodStojaka, 'add-button', driver )    
    await sleep(4000)
    await Biblio.Button('save-button', driver)
}

async function SprawdzNazwe(id){
    await Biblio.Button(id, driver)
    const test1 = await driver.findElement(By.className('v-list-item__title')).getText()
    await Biblio.Button('delete-stand-0', driver)
    await sleep(2000)
    await Biblio.Button(id, driver)
    const test2 = await driver.findElement(By.className('v-list-item__title')).getText()
    expect(test1).toEqual(test2)
}

describe('Przyjecie stojaka', async(done) =>{
    it('Poprawny zaladunek stojaka', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'przyjecie', driver)
    await Przyjecie('PVC','PG')
    await PrzyjmijDodaj('test1')
    await Biblio.Alert('Pomyślnie dodano stojaki', driver)
    }).catch(done);
});

describe('Przyjecie stojaka', async(done) =>{
    it('Brak wybranego dostawcy', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'przyjecie', driver)
    await NiewypelnionePole(0, 'PVC')
    await Biblio.Alert('Nie podano lokalizacji lub dostawcy', driver)
    }).catch(done);
});

describe('Przyjecie stojaka', async(done) =>{
    it('Brak wybranej lokalizacji', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'przyjecie', driver)
    await NiewypelnionePole(1, 'PG')
    await Biblio.Alert('Nie podano lokalizacji lub dostawcy', driver)
    }).catch(done);
});

describe('Przyjecie stojaka', async(done) =>{
    it('Brak lokalizacji i dostawcy', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'przyjecie', driver)
    await Biblio.Button('manually-add-stand', driver)
    await Biblio.Alert('Nie podano lokalizacji lub dostawcy', driver)
    }).catch(done);
});

describe('Przyjecie stojaka', async(done) =>{
    it('Dodaj drewno', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'przyjecie', driver)
    await Przyjecie('PVC','PG')
    await Biblio.Button('add-wood-button', driver)
    await Biblio.Button('save-button', driver)
    await Biblio.Alert('Pomyślnie dodano stojaki', driver)
    }).catch(done);
});

describe('Przyjecie stojaka', async(done) =>{
    it('Dodaj bb', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'przyjecie', driver)
    await Przyjecie('PVC','PG')
    await Biblio.Button('add-bb-button', driver)
    await Biblio.Button('save-button', driver)
    await Biblio.Alert('Pomyślnie dodano stojaki', driver)
    }).catch(done);
});

describe('Przyjecie stojaka', async(done) =>{
    it('Istnieje stojak', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'przyjecie', driver)
    await Przyjecie('PVC','PG')
    await Biblio.PodwojnyStojak('add-stand-input','test1', 'add-button', 'test1', driver)
    await Biblio.Alert('Stojak TEST1 został już dodany', driver)
    }).catch(done);
});

describe('Przyjecie stojaka', async(done) =>{
    it('Usuniecie stojaka 0', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'przyjecie', driver)
    await Przyjecie('PVC','PG')
    await Biblio.PodwojnyStojak('add-stand-input','test1', 'add-button', 'test2', driver)
    await sleep(5000)
    await Biblio.Button('delete-stand-0', driver)
    await Biblio.SprawdzTekst('v-list-item__title ', 'TEST2', driver )
    }).catch(done);
});

describe('Przyjecie stojaka', async(done) =>{
    it('Usuniecie stojaka 1', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'przyjecie', driver)
    await Przyjecie('PVC','PG')
    await Biblio.PodwojnyStojak('add-stand-input','test1', 'add-button', 'test2', driver)
    await sleep(5000)
    await Biblio.Button('delete-stand-1', driver)
    await Biblio.SprawdzTekst('v-list-item__title ', 'TEST1', driver )
    }).catch(done);
});

describe('Przyjecie stojaka', async(done) =>{
    it('Numeracja drewno', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'przyjecie', driver)
    await Przyjecie('PVC','PG')
    await SprawdzNazwe('add-wood-button')    
    }).catch(done);
});

describe('Przyjecie stojaka', async(done) =>{
    it('Numeracja bb', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'przyjecie', driver)
    await Przyjecie('PVC','PG')
    await SprawdzNazwe('add-bb-button')    
    }).catch(done);
});

describe('Przyjecie stojaka', async(done) =>{
    it('Wroc', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'przyjecie', driver)
    await Przyjecie('PVC','PG')
    await Biblio.Button('cancel-button', driver)
    await Biblio.Wroc('cancel', driver)  
    }).catch(done);
});