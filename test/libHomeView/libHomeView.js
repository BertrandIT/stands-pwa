class Biblio{
    innerText;
    get button () {return driver.findElement('//button/span[text()="'+this.innerText+'"]')[0]}
    

    clickButton(innerText){
        this.innerText = innerText;
        console.log(this.button);
        this.button.click();
    }
}

 module.exports = new Biblio();