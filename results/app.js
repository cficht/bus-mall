import { products } from '../data/products.js';
import { getAllClicks, getAllViews } from '../common/storage.js';

const resultsContainer = document.getElementById('results-container');
const retryButton = document.getElementById('retry-button');

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

    const ctx = document.getElementById('chart').getContext('2d');

    const label = 'All-Time Clicked';
    const data = allClicksToDisplay;
    const labelColors = 'red';

    const label2 = 'All-Time Views';
    const data2 = allViewsToDisplay;
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

