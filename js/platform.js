function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
}

gapi.load('auth2', function() {
    gapi.auth2.init({
        client_id: '899818300065-sbaloqic4ut4uk4vkfuf2623p1f5h93k.apps.googleusercontent.com'
    });
});

