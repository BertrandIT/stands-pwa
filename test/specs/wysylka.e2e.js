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

async function Wyszukaj(nrStojaka) {
    await driver.findElement(By.id('wysylka')).click();
    await sleep(2000)
    await driver.findElement(By.id('send-stands-search')).sendKeys(nrStojaka);
    await sleep(2000)
    const tytul = await driver.findElement(By.xpath('//*[@id="select-card-12584"]/div[1]/span[1]')).getText();
    await sleep(2000)
    expect(tytul).toEqual(nrStojaka)
    await driver.quit()
    driver = null;

}

describe('Wysyłka stojaka', async(done) =>{
    it('Wyszukanie po nr stojaka', async() =>{
         //launch the browser
    driver = await new Builder().forBrowser("chrome").build()
    //navigate to application
    await driver.get('http://localhost:8080')
        await Logowanie.Logowanie('admin', 'admin123', driver)
        await Wyszukaj('DREWNO608')
    }).catch(done);
});