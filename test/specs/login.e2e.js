const chromedriver = require('chromedriver');
const {Builder, By, Key} = require ("selenium-webdriver");
const assert = require ("assert")
const expect = require ("expect");
const { time } = require('console');
const Logowanie = require('../libLogowanie/libLogowanie.js')
let driver

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function Logowanie(login, password){
    //launch the browser
    driver = await new Builder().forBrowser("chrome").build()
    //navigate to application
    await driver.get('http://localhost:8080')
    await sleep(2000)
    //populate auth inputs
    await driver.findElement(By.id('loginId')).sendKeys(login);
    await sleep(2000)
    await driver.findElement(By.id('passwordId')).sendKeys(password);
    await sleep(2000)
    await driver.findElement(By.id('zaloguj')).click();
    await sleep(2000)
}

 async function Niepowodzenie(logN, passN, textN)
 {
    await Logowanie(logN, passN);
    const alert = await driver.findElement(By.className('v-alert__content')).getText()
    await sleep(2000)
    expect(alert).toEqual(textN);
     //close the browser
    await driver.quit()
    driver = null;
 }

 async function Powodzenie(logP, passP)
 {
     await Logowanie(logP, passP);
     const test = await driver.findElement(By.className('v-btn v-btn--text theme--dark v-size--default'))
     const element = await driver.findElement(By.id('logout'))
     await sleep(2000)
    expect(element).toBeTruthy()
    await driver.quit()
    driver = null;
 }

describe('Login test', async(done) => {
    it('Niepoprawny login', async() => {
        await Niepowodzenie('a', 'admin123', 'Błędny login')
    }).catch(done);
});

describe('Login test2', async(done) =>{
    it('Poprawne logowanie', async() => {
        await Powodzenie('admin', 'admin123')
        
    }).catch(done);
});


