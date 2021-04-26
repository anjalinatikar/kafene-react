export const isAuth = function() {
    if(!localStorage.getItem('isUserLoggedIn')) return false;
    const isUserLoggedIn = JSON.parse(localStorage.getItem('isUserLoggedIn'));
    if(!isUserLoggedIn) return false;
    return true;
}

export const setAuth = function(value) {
    if(value===true)
        localStorage.setItem('isUserLoggedIn', 'true');
    else 
        localStorage.clear('isUserLoggedIn');
}