import { products } from '/data/products.js';
import { ProductGeneration } from '/productGenerator.js';

const newProductArray = new ProductGeneration(products);
const choice1 = document.getElementById('choice-1');
const choice2 = document.getElementById('choice-2');
const choice3 = document.getElementById('choice-3');
const choice1Image = document.getElementById('choice-1-image');
const choice2Image = document.getElementById('choice-2-image');
const choice3Image = document.getElementById('choice-3-image');
const choiceArray = [choice1, choice2, choice3];
const imageArray = [choice1Image, choice2Image, choice3Image];
const radioButtonArray = document.querySelectorAll('input');

let currentOptions = [];
let favoriteArray = new Array(20).fill(0);

for (let i = 0; i < radioButtonArray.length; i++){
    radioButtonArray[i].addEventListener('click', (e) => {
        console.log(e.target.value);
        const currentFavorite = e.target.value;
        favoriteArray[currentFavorite] += 1;
        console.log(favoriteArray);
        newChoices();
    });
}


function newChoices() {
    // const randomProductOutput = newProductArray.randomImage3();

    for (let i = 0; i < 3; i++) {
        const randomProductOutput = newProductArray.randomImage();
        imageArray[i].src = randomProductOutput.image;
        choiceArray[i].value = randomProductOutput.id;
        currentOptions[i] = randomProductOutput;
        // console.log(choiceArray[i].value);
    }
}

newChoices();
