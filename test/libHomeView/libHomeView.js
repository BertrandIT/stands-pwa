class Biblio{
    innerText;
    get button () {return $$('//button/span[text()="'+this.innerText+'"]')[0]}
<<<<<<< HEAD
    
=======
>>>>>>> 068f91d (test filtruj)

    clickButton(innerText){
        this.innerText = innerText;
        console.log(this.button);
        this.button.click();
    }
<<<<<<< HEAD

=======
>>>>>>> 068f91d (test filtruj)
    


}

 module.exports = new Biblio();