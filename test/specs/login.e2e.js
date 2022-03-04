const chromedriver = require('chromedriver');
const {Builder, By, Key} = require ("selenium-webdriver");
const assert = require ("assert")
const expect = require ("expect")

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



async function Logowanie(login, password, text){
    //launch the browser
    let driver = await new Builder().forBrowser("chrome").build()

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
    const alert = await driver.findElement(By.className('v-alert__content')).getText()
    await sleep(2000)
    expect(alert).toEqual(text);

     //close the browser
    await driver.quit()

}

describe('Login test', async(done) => {
    it('Niepoprawny login', async() => {
        await Logowanie('a', 'admin123', 'Błędny login')
    }).catch(done);
});

   
//  const Logowanie = async (login, password, text) =>{
//     //await browser.url(`http://localhost:8080`);
//      await driver.get(`http://localhost:8080`);
//     await sleep(2000);
//     let imputUserName = driver.findElement(By.id('loginId')).sendKeys(login);
//     //imputUserName.click();
//     //await driver.get(`http://localhost:8080`);
//     await sleep(2000);
//     $('#loginId').setValue(login);
//     console.log('test123')
//     await sleep(2000);
//    $('#passwordId').setValue(password);
//    await sleep(2000);
//    $('#zaloguj').click();
//    await sleep(2000);
//     const alert = await $('.v-alert__content').getText();
//     expect(alert).toEqual(text);
// }



// describe('Login test', async() => {
//     it('Niepoprawny login', Logowanie('a', 'admin123', 'Błędny lllogin')
//     );
// });

// describe('Login test', async() => {
//     it('Poprawne dane', async () => {
//         await browser.url(`http://localhost:8080`);
//         $('#loginId').setValue('admin');
//         await browser.pause(5000)
//         $('#passwordId').setValue('admin123');
//         await browser.pause(5000)
//         $('#zaloguj').click();
//         await browser.pause(3000)
//         const element = await $('#logout')
//         await expect(element).toBeDisplayed()
//     });
// });

