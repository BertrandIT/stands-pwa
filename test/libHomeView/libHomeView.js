class Biblio{
    innerText;
    get button () {return $$('//button/span[text()="'+this.innerText+'"]')[0]}
<<<<<<< HEAD
    
=======
>>>>>>> 239c39aa05b57b158ce5d953166a142fac767389

    clickButton(innerText){
        this.innerText = innerText;
        console.log(this.button);
        this.button.click();
    }

    
<<<<<<< HEAD
=======
    
>>>>>>> 239c39aa05b57b158ce5d953166a142fac767389


}

 module.exports = new Biblio();