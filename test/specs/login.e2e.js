const libHomeView = require('../libHomeView/libHomeView.js')


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

describe('Login test', async() => {
    it('Niepoprawny login', async () => {
        await browser.url(`http://localhost:8080`);
        $('#loginId').setValue('a');
        await browser.pause(5000)
        $('#passwordId').setValue('admin123');
        await browser.pause(5000)
        $('#zaloguj').click();
        await browser.pause(5000)
        const alert = await $('.v-alert__content').getText();
        expect(alert).toEqual('Błędny login');
    });
});