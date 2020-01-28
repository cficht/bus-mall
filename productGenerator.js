export class ProductGeneration {
    constructor(products) {
        this.products = products.slice();
    }

    randomImage() {
        const randomNumber = Math.floor(Math.random() * 20);
        const randomObject = (this.products[randomNumber]);
        // this.products.splice(randomNumber, randomNumber + 1);
        // console.log(this.products);
        return randomObject;
    }

    randomImage3() {   
        let randomImageArray3 = [];
        for (let i = 0; i < 3; i++) {
            const randomNumber = Math.floor(Math.random() * 20);
            randomImageArray3[i] = (this.products[randomNumber]);
            // this.products.splice(randomNumber, randomNumber + 1);
            console.log(this.products);
        }
        return randomImageArray3;
    }
}