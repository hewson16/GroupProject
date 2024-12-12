console.log('google signin js');

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var username = profile.getName();
    document.getElementById('login-container').innerHTML = `<span>${username}</span>`;
}

function renderButton() {
    gapi.signin2.render('login-container', {
        'scope': 'profile email',
        'width': 200,
        'height': 50,
        'longtitle': true,
        'theme': 'dark'
    });
}

// Sign out function
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        document.getElementById('login-container').innerHTML = `<div class="g-signin2" data-onsuccess="onSignIn"></div>`;
        renderButton();
    });
}

// Load the Google API
function loadGoogleApi() {
    gapi.load('auth2', function() {
        gapi.auth2.init().then(function(){
            renderButton();
        });
    });
}

// Ensure the function is called on page load
window.onload = loadGoogleApi;