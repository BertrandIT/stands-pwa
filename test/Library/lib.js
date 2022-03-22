const chromedriver = require('chromedriver');
const {Builder, By, Key} = require ("selenium-webdriver");
const assert = require ("assert")
const expect = require ("expect");
const { time } = require('console');
const { moduleExpression } = require('@babel/types');
let driver

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.Logowanie = async(login, password, driver)=>{
   
    await sleep(2000)
    await driver.findElement(By.id('loginId')).sendKeys(login);
    await sleep(2000)
    await driver.findElement(By.id('passwordId')).sendKeys(password);
    await sleep(2000)
    await driver.findElement(By.id('zaloguj')).click();
    await sleep(2000)
    
};

exports.Menu = async(login, password, id, driver, )=>{
   
    await this.Logowanie(login, password, driver)
    await driver.findElement(By.id(id)).click();
    await sleep(2000)
};

exports.Alert = async(tekst, driver) =>{
    const alert = await driver.findElement(By.className('v-alert__wrapper')).getText()
    expect(alert).toEqual(tekst)
    await driver.quit()
    driver = null;
}

exports.Wroc = async(idButton, driver) => {
    await driver.findElement(By.id(idButton)).click()
    await sleep(2000)
    const pom = await driver.findElement(By.id('zaladunek'))
    expect(pom).toBeTruthy()
    await driver.quit()
    driver = null;
}

exports.SprawdzTekst = async(klasa, doPorownania, driver ) =>{
    var found = false;
    await sleep(3000)
    const tytul = await driver.findElement(By.className(klasa))
    await sleep(3000)
    found = await tytul.getAttribute("innerText") !== doPorownania ? true : found
    expect(found).toEqual(false);
    await driver.quit()
    driver = null;
}

exports.SprawdzTekst2 = async(klasa, tab, doPorownania, driver ) =>{
    var found = false;
    await sleep(3000)
    const tytul = await driver.findElements(By.className(klasa))
    await sleep(3000)
    found = await tytul[tab].getAttribute("innerText") !== doPorownania ? true : found
    expect(found).toEqual(false);
    await driver.quit()
    driver = null;
}

exports.Button = async(id, driver) =>{
    await driver.findElement(By.id(id)).click()
    await sleep(1000)
}

exports.PodwojnyStojak = async(klasa, barcode, button, barcode2, driver) =>{
    await driver.findElement(By.id(klasa)).sendKeys(barcode)
    await driver.findElement(By.id(button)).click()
    await sleep(1000)
    await driver.findElement(By.id(klasa)).sendKeys(barcode2)
    await driver.findElement(By.id(button)).click()
    //await sleep(1000)
}

exports.KodStojaka = async(element, kodStojaka, id, driver) =>{
    await driver.findElement(By.id(element)).sendKeys(kodStojaka)
    await sleep(1000)
    await this.Button(id, driver)
}