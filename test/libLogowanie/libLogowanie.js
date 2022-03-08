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
    //populate auth inputs
    await driver.findElement(By.id('loginId')).sendKeys(login);

    await sleep(2000)
    await driver.findElement(By.id('passwordId')).sendKeys(password);
    await sleep(2000)
    await driver.findElement(By.id('zaloguj')).click();
    await sleep(2000)
    
};