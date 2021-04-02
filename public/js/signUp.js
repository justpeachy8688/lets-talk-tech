const signupFormHandler = async (data) => {
    console.log(data);
    data.preventDefault();

    const name = document.querySelector('#name-signup').nodeValue.trim();
    console.log(name);
    const email = document.querySelector('#email-signup').value.trim();
    console.log(email);
    const password = document.querySelector('#password-signup').value.trim();
    console.log(password);

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
