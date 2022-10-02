window.addEventListener("load", function(){
    function sendData() {
        const sendRequest = new XMLHttpRequest();
        const signupInfo = (new FormData(form));
        console.log('form', form);

        sendRequest.addEventListener("error", function (event){
            // alert('Log In unsuccessful! Please try again.');
        });
        sendRequest.addEventListener("load", function (event) {
            alert('Your account was created');
        });
        sendRequest.open("POST", "http://localhost:5000/app/new/user");
        console.log('signup', signupInfo);
        sendRequest.send( signupInfo );
    }
    const form = document.getElementById( "loginform" );
    form.addEventListener("submit", function ( event ){
        event.preventDefault();
        sendData();
    });
});