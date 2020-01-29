import { products } from '/data/products.js';
import { ProductGeneration } from '/common/productGenerator.js';
import { setCurrentSession, setAllSession, resetCurrentSession } from '/common/storage.js';

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
const resultsContainer = document.getElementById('results-container');
const productContainer = document.getElementById('product-container');
const resultsButton = document.getElementById('results-button');

let currentOptions = [];
let previousOptions = [];
resultsContainer.style.visibility = 'hidden';
resultsButton.style.visibility = 'hidden';

let numberOfClicks = 0;
let favoriteArray = new Array(20).fill(0);
let displayArray = new Array(20).fill(0);

resetCurrentSession();
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
    productContainer.style.display = 'none';
    resultsContainer.style.visibility = 'visible';

    for (let i = 0; i < 3; i++) {
        imageArray[i].style.visibility = 'hidden';
    }

    const favoriteList = document.getElementById('favorite-list');
    const displayedList = document.getElementById('displayed-list');

    for (let i = 0; i < favoriteArray.length; i++) {
        const favorite = document.createElement('li');
        favorite.textContent = products[i].name + ': ' + favoriteArray[i];
        favoriteList.appendChild(favorite);
    }

    for (let i = 0; i < displayArray.length; i++) {
        const display = document.createElement('li');
        display.textContent = products[i].name + ': ' + displayArray[i];
        displayedList.appendChild(display);
    }

    setCurrentSession(favoriteArray, displayArray);
    setAllSession(favoriteArray, displayArray);

    resultsButton.style.visibility = 'visible';
}

resultsButton.addEventListener('click', () => {
    window.location.replace('../results');
});


