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

describe('Zwrot stojaka', async(done) =>{
    it('Poprawny kod', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zwrot', driver)
    await Biblio.KodStojaka('return-stand-barcode', 'test1', 'add-return-stand', driver)
    await Biblio.Alert('Pomyślnie załadowano stojak', driver)
    }).catch(done);
});

describe('Zwrot stojaka', async(done) =>{
    it('Bledny kod', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zwrot', driver)
    await Biblio.KodStojaka('return-stand-barcode', 'test123', 'add-return-stand', driver)
    await Biblio.Alert('Nie znaleziono stojaka o podanym barkodzie',driver)
    await sleep(2000)
    }).catch(done);
});

describe('Zwrot stojaka', async(done) =>{
    it('Dodanie stojaka', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zwrot', driver)
    await Biblio.KodStojaka('return-stand-barcode', 'test1', 'add-return-stand', driver)
    await Biblio.Button('save-return', driver)
    await Biblio.Alert('Pomyślnie załadowano stojak', driver)
    }).catch(done);
});

describe('Zwrot stojaka', async(done) =>{
    it('Podwojnie dodany stojak', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zwrot', driver)
    await Biblio.KodStojaka('return-stand-barcode', 'test1', 'add-return-stand', driver)
    await Biblio.PodwojnyStojak('return-stand-barcode','test1', 'add-return-stand', 'test1', driver)
    await Biblio.Alert('Poodany stojak już istnieje', driver)
    }).catch(done);
});


describe('Zwrot stojaka', async(done) =>{
    it('Usun 0', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zwrot', driver)
    await Biblio.PodwojnyStojak('return-stand-barcode','test1', 'add-return-stand', 'test2', driver)
    await Biblio.Button('delete-from-return-0', driver) 
    await Biblio.SprawdzTekst('v-virtual-scroll', 'TEST2', driver)
    }).catch(done);
});

describe('Zwrot stojaka', async(done) =>{
    it('Usun 1', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zwrot', driver)
    await Biblio.PodwojnyStojak('return-stand-barcode','test1', 'add-return-stand', 'test2', driver)
    await Biblio.Button('delete-from-return-1', driver) 
    await Biblio.SprawdzTekst('v-virtual-scroll', 'TEST1', driver)
    }).catch(done);
});

describe('Zwrot stojaka', async(done) =>{
    it('Anuluj', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zwrot', driver)
    await Biblio.KodStojaka('return-stand-barcode', 'test1', 'add-return-stand', driver)
    await Biblio.Wroc('cancel-return', driver)
    await sleep(2000)
    }).catch(done);
});

describe('Zwrot stojaka', async(done) =>{
    it('Ilosc stojakow', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zwrot', driver)
    await Biblio.PodwojnyStojak('return-stand-barcode','test1', 'add-return-stand', 'test2', driver)
    await Biblio.SprawdzTekst2('v-card__subtitle', 1, 'Ilość stojaków: 2', driver )
    }).catch(done);
});
