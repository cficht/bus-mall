export function setCurrentSession(clicks, views) {
    const currentClicksToStore = JSON.stringify(clicks);
    const currentViewsToStore = JSON.stringify(views);
    localStorage.setItem('current-session-clicks', currentClicksToStore);
    localStorage.setItem('current-session-views', currentViewsToStore);
}

export function setAllSession(clicks, views) {
    let storedAllClicks = JSON.parse(localStorage.getItem('all-session-clicks'));
    let storedAllViews = JSON.parse(localStorage.getItem('all-session-views'));

    if (!storedAllClicks) {
        storedAllClicks = Array(20).fill(0);
    }
    if (!storedAllViews) {
        storedAllViews = Array(20).fill(0);
    }

    for (let i = 0; i < storedAllClicks.length; i++) {
        storedAllClicks[i] = storedAllClicks[i] + clicks[i];
    }

    for (let i = 0; i < storedAllViews.length; i++) {
        storedAllViews[i] = storedAllViews[i] + views[i];
    }

    const newAllClicks = JSON.stringify(storedAllClicks);
    const newAllViews = JSON.stringify(storedAllViews);
    localStorage.setItem('all-session-clicks', newAllClicks);
    localStorage.setItem('all-session-views', newAllViews);

}

export function getCurrentClicks() {
    let storedCurrentClicks = JSON.parse(localStorage.getItem('current-session-clicks'));

    if (!storedCurrentClicks) {
        storedCurrentClicks = Array(20).fill(0);
    }

    return storedCurrentClicks;
}

export function getCurrentViews() {
    let storedCurrentViews = JSON.parse(localStorage.getItem('current-session-views'));
    
    if (!storedCurrentViews) {
        storedCurrentViews = Array(20).fill(0);
    }

    return storedCurrentViews;
}

export function getAllClicks() {
    let storedAllClicks = JSON.parse(localStorage.getItem('all-session-clicks'));
    
    if (!storedAllClicks) {
        storedAllClicks = Array(20).fill(0);
    }
    
    return storedAllClicks;
}

export function getAllViews() {
    let storedAllViews = JSON.parse(localStorage.getItem('all-session-views'));
    
    if (!storedAllViews) {
        storedAllViews = Array(20).fill(0);
    }

    return storedAllViews;
}



export function resetCurrentSession() {
    localStorage.removeItem('current-session-clicks');
    localStorage.removeItem('current-session-views');
}