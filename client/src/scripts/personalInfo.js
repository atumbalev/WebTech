const PersonalInfro = event => {
    event.preventDefault();

    const name = document.getElementById('fullName').value;
    const email = document.getElementById('emailAddress').value;
    const phone = document.getElementById('phone').value;
    const description = document.getElementById('infoPer').value;

    const userInfo = {
        name,
        email,
        phone,
        description
    };

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

    const url = 'http://localhost:3000/user';

    sendRequest(url, options, loginUser, handleError);
};

// const loginUser = response => {
//     if (response.success) {

//         // kakvo se slutchva sled vavejdane na dannite
//     } else {
//         console.log(response.error);
//     }
// }

(function() {
    const doneBtn = document.getElementsByClassName('done');

    doneBtn.addEventListener('click', dashboard);
})();

const lockAll = () => {
    document.getElementById('fullName').readOnly = true;
    document.getElementById('emailAddress').readOnly = true;
    document.getElementById('phone').readOnly = true;
    document.getElementById('infoPer').readOnly = true;
}

const editProfile = () => {
    document.getElementById('fullName').readOnly = true;
    document.getElementById('emailAddress').readOnly = true;
    document.getElementById('phone').readOnly = false;
    document.getElementById('infoPer').disabled = this.checked;
}
re