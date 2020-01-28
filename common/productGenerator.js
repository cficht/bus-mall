export class ProductGeneration {
    constructor(products) {
        this.products = products.slice();
    }

    randomProduct() {
        const randomNumber = Math.floor(Math.random() * this.products.length);
        const randomObject = { ... (this.products[randomNumber]) };
        return randomObject;
    }

    randomProduct3() {   
        const randomImageArray3 = [];
        for (let i = 0; i < 3; i++) {
            const objectForArray = this.randomProduct();
            this.matchProduct(objectForArray);
            randomImageArray3[i] = (objectForArray);
        }
        return randomImageArray3;
    }

    matchProduct(product) {
        for (let i = 0; i < this.products.length; i++) {
            if (product.id === this.products[i].id) {            
                const indexToRemove = i;
                this.removeProduct(indexToRemove);
            }
        }
    }

    removeProduct(product) {
        const removedProduct = this.products.splice(product, 1);
    }

    restore3Product(usedProducts) {
            for (let i = 0; i < 6; i++) {
                this.products.push(usedProducts[i]);
                console.log(this.products);
            }
    }
}