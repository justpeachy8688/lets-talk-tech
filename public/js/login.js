const loginFormHandler = async (data) => {
    data.preventDefault();

    //COLLECT VALUES FROM THE LOGIN FORM
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        //SEND a POST REQUEST TO THE API ENDPOINT
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            // IF SUCCESSFUL, REDIRECT THE BROWSER TO THE POST PAGE
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);