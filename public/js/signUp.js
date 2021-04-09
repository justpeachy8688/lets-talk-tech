const signupFormHandler = async (event) => {
    console.log(event);
    data.preventDefault();

    const name = document.querySelector('#name-signup').nodeValue.trim();
    console.log("NAME:", name);
    const email = document.querySelector('#email-signup').value.trim();
    console.log("EMAIL:", email);
    const password = document.querySelector('#password-signup').value.trim();
    console.log("PASSWORD:", password);

    if (name && email && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
