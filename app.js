import { products } from '/data/products.js';
import { ProductGeneration } from '/common/productGenerator.js';

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
let previousOptions = [];
let favoriteArray = new Array(20).fill(0);
let displayArray = new Array(20).fill(0);
let numberOfClicks = 0;

newChoices();

for (let i = 0; i < radioButtonArray.length; i++){
    radioButtonArray[i].addEventListener('click', (e) => {
        const currentFavorite = e.target.value;
        favoriteArray[currentFavorite] += 1;
        numberOfClicks++;
        if (numberOfClicks >= 25) {
            hit25();
        }
        newChoices();
    });

}


function newChoices() {
    const randomProductOutput = newProductArray.randomProduct3();
    
    for (let i = 0; i < 3; i++) {
        imageArray[i].src = randomProductOutput[i].image;
        choiceArray[i].value = randomProductOutput[i].id;
        currentOptions[i] = randomProductOutput[i];
        displayArray[randomProductOutput[i].id] += 1;
    }  

    for (let i = 0; i < 3; i++) {
        if (previousOptions.length >= 6) {
            newProductArray.restore3Product(previousOptions);
            previousOptions = [];
        }
        previousOptions.push(currentOptions[i]);
    }  
}

function hit25() {
    for (let i = 0; i < 3; i++) {
        imageArray[i].style.visibility = 'hidden';
    }

    const favoriteList = document.getElementById('favorite-list');

    for (let i = 0; i < favoriteArray.length; i++) {
        const favorite = document.createElement('li');
        favoriteList.appendChild(favorite);
        const faveText = document.createElement('span');
        console.log(favoriteList[i]);
        faveText.textContent = favoriteList[i];
        favorite.appendChild(faveText);
        
    }

}

