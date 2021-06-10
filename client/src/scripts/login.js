// const handleError = (error) => {
//     console.log(error);
//     // const errors = document.getElementById('errors');
//     // errors.innerHTML = error.error.toString();
// }

const sendRequest = (url, options, successCallback, errorCallback) => {
    fetch(url, options)
        .then(response => response.json())
        .then(response => successCallback(response))
        .catch(error => errorCallback(error));
};

const login = event => {
    event.preventDefault();


    const email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;

    const user = {
        email,
        password
    };

    localStorage.setItem('email', email); // save email for finding projects later

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

    const url = 'http://localhost:3000/login';

    // sendRequest(url, options, loginUser, handleError);

    fetch(url, options)
        // .then(response => response.json())
        .then(response => loginUser(response))
        .catch(error => errorCallback(console.log(error)));

    console.log("send");
};

const loginUser = (data) => {
    console.log('login')
    if (data.error) {
        const errors = document.getElementsByClassName('forgot');
        errors.innerHTML = data.error;
        console.log("error!");
    } else {
        console.log("OK");
        window.location = 'dashboard.html';
        //return user.email;
    }
}

(function() {
    const loginBtn = document.getElementById('login');

    console.log("attached!")

    loginBtn.addEventListener('click', login);
})();





// const registerForm = document.getElementById('register-form');
// const loginForm = document.getElementById('login-form');

// if (registerForm != null) {
//     registerForm.addEventListener('click', (event) => {
//         event.preventDefault();

//         const requestBody = {
//             email: email.value,
//             password: password.value
//         }

//         postRequest("http://localhost:3000/register", JSON.stringify(requestBody),
//             (data) => {
//                 localStorage.setItem('token', data.token);
//                 window.location.replace("project.html");
//             },
//             (err) => {
//                 showError("Invalid email or password");
//             });
//     });
// }

// if (loginForm != null) {
//     loginForm.addEventListener('submit', event => {
//         event.preventDefault();

//         const requestBody = {
//             email: email.value,
//             password: password.value
//         }

//         postRequest("http://localhost:3000/login", JSON.stringify(requestBody),
//             (data) => {
//                 localStorage.setItem('token', data.token);
//                 window.location.replace("Dashboard.html");
//             },
//             (err) => {
//                 showError("Invalid email or password");
//             });
//     })
// }

// function postRequest(url, body, successCallback, errorCallback) {
//     fetch(url, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: body
//         })
//         .then(resonse => resonse.json())
//         .then(data => {
//             successCallback(data);
//         }).catch(err => {
//             errorCallback(err);
//         })
// }

// function showError(text) {
//     error.style.display = 'block';
//     const textNode = document.createTextNode(text);
//     const paragraph = document.getElementsByClassName('forgot');
//     paragraph.innerHTML = "";
//     paragraph.appendChild(textNode);

//     setTimeout(() => {
//         error.style.display = 'none';
//     }, 3000)
// }