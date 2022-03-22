const chromedriver = require('chromedriver');
const {Builder, By, Key} = require ("selenium-webdriver");
const assert = require ("assert")
const expect = require ("expect")
const Biblio = require('../Library/lib.js')
const { time } = require('console')
const Logowanie = require('../Library/lib.js')
let driver

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


 async function BlednyLogin(id)
 {
        await driver.findElement(By.className('v-btn v-btn--text theme--dark v-size--default'))
        const element = await driver.findElement(By.id(id))
        await sleep(2000)
        expect(element).toBeTruthy()
        await driver.quit()
        driver = null;
}

describe('Logowanie', async(done) => {
    it('Niepoprawny login', async() => {
        driver = await new Builder().forBrowser("chrome").build()
        await driver.get('http://localhost:8080')
        await Biblio.Logowanie('a', 'admin123', driver)
        await sleep(1000)
        await Biblio.Alert('Błędny login', driver)
    }).catch(done);
});

describe('Logowanie', async(done) =>{
    it('Poprawne logowanie', async() => {
        driver = await new Builder().forBrowser("chrome").build()
        await driver.get('http://localhost:8080')
        await Biblio.Logowanie('admin', 'admin123', driver)
        await sleep(1000)
        await BlednyLogin('logout')       
    }).catch(done);
});

describe('Logowanie', async(done) =>{
    it('Niepoprawne haslo', async() => {
        driver = await new Builder().forBrowser("chrome").build()
        await driver.get('http://localhost:8080')
        await Biblio.Logowanie('admin', 'admin', driver)
        await sleep(1000) 
        await Biblio.Alert('Błędny login', driver)   
    }).catch(done);
});

describe('Logowanie', async(done) =>{
    it('Brak danych', async() => {
        driver = await new Builder().forBrowser("chrome").build()
        await driver.get('http://localhost:8080')
        await Biblio.Logowanie('', '', driver)
        await sleep(1000) 
        await Biblio.Alert('Sprawdź połączenie z Internetem, bądź skontaktuj się z działem IT', driver)   
    }).catch(done);
});


