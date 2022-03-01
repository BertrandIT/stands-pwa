const libHomeView = require('../libHomeView/libHomeView.js')
class Biblio{
    innerText;
    get button () {return $$('//button[text()="'+this.innerText+'"]')}

    clickButton(innerText){
        this.innerText = innerText;
        this.button.click();
    }

}

 module.exports = new Biblio();