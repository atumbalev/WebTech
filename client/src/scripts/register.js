const sendForm = event => {
    event.preventDefault();

    const email = document.getElementById('EmailRegister').value;
    const password = document.getElementById('PasswordRegister').value;

    const user = {
        "email": email,
        "password": password
    };

    localStorage.setItem('email', email);

    const options = {
        method: 'POST',
        mode: 'cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    const url = 'http://localhost:3000/register';

    // sendRequest(url, options, redirect, handleError);
    fetch(url, options)
        // .then(response => response.json())
        .then(response => redirect(response))
        .catch(error => console.log(error));
};

const redirect = response => {
    console.log(response);
    console.log(response.successk);
    if (response.ok) {
        window.location = 'PersonalInfo.html';
    } else {
        const errors = document.getElementsByClassName('regError');
        errors.innerHTML = response.error;
    }
}

(function() {
    const register = document.getElementById('regBut');

    register.addEventListener('click', sendForm);
})();