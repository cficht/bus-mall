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
const instructionsDiv = document.getElementById('instructions');

let currentOptions = [];
let previousOptions = [];
resultsContainer.style.display = 'none';
resultsButton.style.display = 'none';

let numberOfClicks = 0;
let favoriteArray = new Array(20).fill(0);
let displayArray = new Array(20).fill(0);
let ratioArray = new Array(20).fill(0);

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
    instructionsDiv.style.display = 'none';
    productContainer.style.display = 'none';
    resultsContainer.style.display = 'inherit';
    resultsButton.style.display = 'flex';

    const chartButton = document.getElementById('chart-switch');
    const statsButton = document.getElementById('stat-switch');
    const typeStats = document.getElementById('type-stats');
    const typeChart = document.getElementById('type-chart');
    typeStats.style.display = 'none';

    for (let i = 0; i < 3; i++) {
        imageArray[i].style.visibility = 'hidden';
    }

    for (let i = 0; i < ratioArray.length; i++) {
        ratioArray[i] = (favoriteArray[i] / displayArray[i]).toFixed(2);
    }

    const favoriteList = document.getElementById('favorite-list');
    const displayedList = document.getElementById('displayed-list');
    const ratioList = document.getElementById('ratio-list');

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

    for (let i = 0; i < ratioArray.length; i++) {
        const ratio = document.createElement('li');
        ratio.textContent = products[i].name + ': ' + ratioArray[i] + '%';
        ratioList.appendChild(ratio);
    }

    const ctx = document.getElementById('chart').getContext('2d');

    const label = 'Current Clicks';
    const data = favoriteArray;
    const labelColors = 'red';

    const label2 = 'Current Views';
    const data2 = displayArray;
    const labelColors2 = 'blue';

    const productNames = [];
    for (let i = 0; i < products.length; i++) {
        productNames.push(products[i].name);
    }    

    // eslint-disable-next-line no-unused-vars
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productNames,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: labelColors
            }, {
                label: label2,
                data: data2,
                backgroundColor: labelColors2
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });

    setCurrentSession(favoriteArray, displayArray);
    setAllSession(favoriteArray, displayArray);

    resultsButton.style.visibility = 'visible';

    chartButton.addEventListener('click', () => {
        typeStats.style.display = 'none';
        typeChart.style.display = 'flex';
    });

    statsButton.addEventListener('click', () => {
        typeChart.style.display = 'none';
        typeStats.style.display = 'flex';
    });
}

resultsButton.addEventListener('click', () => {
    window.location.replace('../results');
});


