import { products } from '../data/products.js';
import { getCurrentClicks, getCurrentViews, getAllClicks, getAllViews } from '../common/storage.js';

const resultsContainer = document.getElementById('results-container');
const retryButton = document.getElementById('retry-button');

const currentClicksToDisplay = getCurrentClicks();
const currentViewsToDisplay = getCurrentViews();
const AllClicksToDisplay = getAllClicks();
const AllViewsToDisplay = getAllViews();

resultsPage();

function resultsPage() {
    resultsContainer.style.visibility = 'visible';

    const favoriteList = document.getElementById('favorite-list');
    const displayedList = document.getElementById('displayed-list');
    const allClicked = document.getElementById('all-clicked');
    const allShown = document.getElementById('all-shown');

    for (let i = 0; i < currentClicksToDisplay.length; i++) {
        const favorite = document.createElement('li');
        favorite.textContent = products[i].name + ': ' + currentClicksToDisplay[i];
        favoriteList.appendChild(favorite);
    }

    for (let i = 0; i < currentViewsToDisplay.length; i++) {
        const display = document.createElement('li');
        display.textContent = products[i].name + ': ' + currentViewsToDisplay[i];
        displayedList.appendChild(display);
    }

    for (let i = 0; i < AllClicksToDisplay.length; i++) {
        const allFavorite = document.createElement('li');
        allFavorite.textContent = products[i].name + ': ' + AllClicksToDisplay[i];
        allClicked.appendChild(allFavorite);
    }

    for (let i = 0; i < AllViewsToDisplay.length; i++) {
        const allDisplay = document.createElement('li');
        allDisplay.textContent = products[i].name + ': ' + AllViewsToDisplay[i];
        allShown.appendChild(allDisplay);
    }
}

retryButton.addEventListener('click', () => {
    window.location.replace('../');
});

