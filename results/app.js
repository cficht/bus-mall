import { products } from '../data/products.js';
import { getCurrentClicks, getCurrentViews, getAllClicks, getAllViews } from '../common/storage.js';

const resultsContainer = document.getElementById('results-container');
const retryButton = document.getElementById('retry-button');

const currentClicksToDisplay = getCurrentClicks();
const currentViewsToDisplay = getCurrentViews();
const allClicksToDisplay = getAllClicks();
const allViewsToDisplay = getAllViews();

let allRatioArray = new Array(20).fill(0);

resultsPage();

function resultsPage() {
    resultsContainer.style.visibility = 'visible';

    const allClicked = document.getElementById('all-clicked');
    const allShown = document.getElementById('all-shown');
    const allRatioUl = document.getElementById('all-ratio');
    const chartButton = document.getElementById('chart-switch');
    const statsButton = document.getElementById('stat-switch');
    const typeStats = document.getElementById('type-stats');
    const typeChart = document.getElementById('type-chart');
    typeStats.style.display = 'none';

    for (let i = 0; i < allRatioArray.length; i++) {
        allRatioArray[i] = (allClicksToDisplay[i] / allViewsToDisplay[i]).toFixed(2);
    }

    for (let i = 0; i < allClicksToDisplay.length; i++) {
        const allFavorite = document.createElement('li');
        allFavorite.textContent = products[i].name + ': ' + allClicksToDisplay[i];
        allClicked.appendChild(allFavorite);
    }

    for (let i = 0; i < allViewsToDisplay.length; i++) {
        const allDisplay = document.createElement('li');
        allDisplay.textContent = products[i].name + ': ' + allViewsToDisplay[i];
        allShown.appendChild(allDisplay);
    }

    for (let i = 0; i < allRatioArray.length; i++) {
        const allRatio = document.createElement('li');
        allRatio.textContent = products[i].name + ': ' + allRatioArray[i] + '%';
        allRatioUl.appendChild(allRatio);
    }

    chartButton.addEventListener('click', () => {
        typeStats.style.display = 'none';
        typeChart.style.display = 'flex';
    });

    statsButton.addEventListener('click', () => {
        typeChart.style.display = 'none';
        typeStats.style.display = 'flex';
    });
}

retryButton.addEventListener('click', () => {
    window.location.replace('../');
});

