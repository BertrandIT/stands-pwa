const chromedriver = require('chromedriver');
const libHomeView = require('../libHomeView/libHomeView.js')
const Biblio = require('../Library/lib.js')
const {Builder, By, Key} = require ("selenium-webdriver");
const assert = require ("assert")
const expect = require ("expect");
const { time } = require('console');
let driver

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



async function Zaladunek(kodStojaka, barcode) {
    await Biblio.KodStojaka('choose-stand-input', kodStojaka, 'submit-button', driver )
    await Biblio.KodStojaka('add-element-input', barcode, 'add-element-button', driver )
}

async function Button(kodStojaka, przycisk, idZlecenia, rok, resztaZlecenia, pozycja, opis, przyciskKoncowy){
    await Biblio.KodStojaka('choose-stand-input', kodStojaka, 'submit-button', driver )
    await sleep(1000)
    await driver.findElement(By.id(przycisk)).click()
    await sleep(1000)
    await driver.findElement(By.className('v-select__slot')).click()
    await sleep(2000)
    await driver.findElement(By.id(idZlecenia)).click()
    await sleep(1000)
    await driver.findElement(By.id('year-input')).sendKeys(rok)
    await driver.findElement(By.id('order-input')).sendKeys(resztaZlecenia)
    await driver.findElement(By.id('chassis-input')).sendKeys(pozycja)
    await sleep(2000)
    await driver.findElement(By.id('insert-opis')).sendKeys(opis)
    await sleep(2000)
    await driver.findElement(By.id(przyciskKoncowy)).click()
    await sleep(2000)
}

describe('Załadunek stojaka', async(done) =>{
    it('Blednie dodany kod', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zaladunek', driver)
    await Biblio.KodStojaka('choose-stand-input', 'test', 'submit-button', driver )
    await sleep(2000)
    await Biblio.Alert( 'Nie można wykorzystać stojaka, stojak nie istnieje', driver)   
    }).catch(done);
});

describe('Załadunek stojaka', async(done) =>{
    it('Poprawnie dodany kod', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zaladunek', driver)
    await Biblio.KodStojaka('choose-stand-input', 'test1', 'submit-button', driver )
    await sleep(2000)
    await Biblio.SprawdzTekst('text-h5', 'ZAŁADUNEK STOJAKA: TEST1', driver)
    }).catch(done);
});

describe('Załadunek stojaka', async(done) =>{
    it('Zaladowanie stojaka - barcode', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zaladunek', driver)
    await Zaladunek('test1', '56A720001A')
    await Biblio.Alert( 'Dodano okno 56A720001A do załadunku', driver)   
    }).catch(done);
});

describe('Załadunek stojaka', async(done) =>{
    it('Podwojnie dodany stojak', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zaladunek', driver)
    await Biblio.KodStojaka('choose-stand-input', 'test1', 'submit-button', driver )
    await Biblio.PodwojnyStojak('add-element-input','56A720001A','add-element-button', '56A720001A', driver)
    await Biblio.Alert( 'Okno 56A720001A zostało już dodane', driver)   
    }).catch(done);
});

describe('Załadunek stojaka', async(done) =>{
    it('Button inne', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zaladunek', driver)
    await Button('test1', 'other-load-button', 'ZAM-', '20', '23', '8', 'testowy opis', 'dialog-submit-button')
    await Biblio.Alert('Dodano zlecenie ZAM-20-00023', driver)
    await driver.quit()
    }).catch(done);
});

describe('Załadunek stojaka', async(done) =>{
    it('Button inne - brak roku', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zaladunek', driver)
    await Button('test1', 'other-load-button', 'ZAM-', '', '23', '8', 'testowy opis', 'dialog-submit-button')
    await Biblio.Alert('Uzupełnij brakujące dane', driver)
    }).catch(done);
});

describe('Załadunek stojaka', async(done) =>{
    it('Button inne - brak reszty', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zaladunek', driver)
    await Button('test1','other-load-button', 'ZAM-', '20', '', '8', 'testowy opis', 'dialog-submit-button')
    await Biblio.Alert('Uzupełnij brakujące dane', driver)
    }).catch(done);
});

describe('Załadunek stojaka', async(done) =>{
    it('Button inne - brak pozycji', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zaladunek', driver)
    await Button('test1', 'other-load-button', 'ZAM-', '20', '23', '', 'testowy opis', 'dialog-submit-button')
    await Biblio.Alert('Dodano zlecenie ZAM-20-00023', driver)
    }).catch(done);
});

describe('Załadunek stojaka', async(done) =>{
    it('Button inne - brak opisu', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zaladunek', driver)
    await Button('test1', 'other-load-button', 'ZAM-', '20', '23', '8', '', 'dialog-submit-button')
    await Biblio.Alert('Dodano zlecenie ZAM-20-00023', driver)
    }).catch(done);
});

describe('Załadunek stojaka', async(done) =>{
    it('Button inne - anuluj', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zaladunek', driver)
    await Button('test1', 'other-load-button', 'ZAM-', '20', '23', '8', 'testowy opis', 'dialog-cancel-button')
    await Biblio.SprawdzTekst('v-virtual-scroll', '', driver)
    }).catch(done);
});

describe('Załadunek stojaka', async(done) =>{
    it('Button szyby - poprawne dodanie', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zaladunek', driver)
    await Button('test1', 'windows-load-button', 'ZAM-', '20', '23', '8', '3', 'dialog-submit-button')
    await Biblio.Alert('Dodano zlecenie ZAM-20-00023', driver)
    }).catch(done);
});

describe('Załadunek stojaka', async(done) =>{
    it('Button szyby - brak roku', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zaladunek', driver)
    await Button('test1', 'windows-load-button', 'ZAM-', '', '23', '8', '3', 'dialog-submit-button')
    await Biblio.Alert('Uzupełnij brakujące dane', driver)
    }).catch(done);
});

describe('Załadunek stojaka', async(done) =>{
    it('Button szyby - brak reszty', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zaladunek', driver)
    await Button('test1', 'windows-load-button', 'ZAM-', '20', '', '8', '3', 'dialog-submit-button')
    await Biblio.Alert('Uzupełnij brakujące dane', driver)
    }).catch(done);
});

describe('Załadunek stojaka', async(done) =>{
    it('Button szyby - brak pozycji', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zaladunek', driver)
    await Button('test1', 'windows-load-button', 'ZAM-', '20', '23', '', '3', 'dialog-submit-button')
    await Biblio.Alert('Dodano zlecenie ZAM-20-00023', driver)
    }).catch(done);
});

describe('Załadunek stojaka', async(done) =>{
    it('Button szyby - brak ilosci', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zaladunek', driver)
    await Button('test1', 'windows-load-button', 'ZAM-', '', '23', '8', '', 'dialog-submit-button')
    await Biblio.Alert('Uzupełnij brakujące dane', driver)
    }).catch(done);
});

describe('Załadunek stojaka', async(done) =>{
    it('Button szyby - anuluj', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zaladunek', driver)
    await Button('test1', 'windows-load-button', 'ZAM-', '20', '23', '8', 'testowy opis', 'dialog-cancel-button')
    await Biblio.SprawdzTekst('v-virtual-scroll', '', driver)
    }).catch(done);
});

describe('Załadunek stojaka', async(done) =>{
    it('Usun zaladunek', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zaladunek', driver)
    await Biblio.KodStojaka('choose-stand-input', 'test1', 'submit-button', driver )
    await Biblio.PodwojnyStojak('add-element-input', '56A720001A','add-element-button', '56A800002B', driver)
    await Biblio.Button('delete-element-0', driver)
    await Biblio.SprawdzTekst('v-virtual-scroll', '56A800002B', driver)
    }).catch(done);
});

describe('Załadunek stojaka', async(done) =>{
    it('Przycisk wroc', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zaladunek', driver)
    await Biblio.KodStojaka('choose-stand-input', 'test1', 'submit-button', driver )
    await Biblio.Wroc('cancel-button',driver)
    }).catch(done);
});

describe('Załadunek stojaka', async(done) =>{
    it('Przycisk zatwierdz', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zaladunek', driver)
    await Zaladunek('test1', '56A720001A')
    await sleep(2000)
    await Biblio.Button('submit-button', driver)
    await Biblio.Alert('Pomyślnie załadowano stojak',driver)
    }).catch(done);
});

describe('Załadunek stojaka', async(done) =>{
    it('Okno edycja załadunku', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zaladunek', driver)
    await KodStojaka('test1')
    await Biblio.SprawdzTekst('pa-2', 'Czy chcesz edytować załadunek?', driver)
    }).catch(done);
});

describe('Załadunek stojaka', async(done) =>{
    it('Edycja załadunku - Tak', async() =>{
    driver = await new Builder().forBrowser("chrome").build()
    await driver.get('http://localhost:8080')
    await Biblio.Menu('admin', 'admin123', 'zaladunek', driver)
    await Biblio.KodStojaka('choose-stand-input', 'test1', 'submit-button', driver )
    await driver.findElement(By.id('yes-button')).click()
    }).catch(done);
});

