function getPersonalInfo(event) {
    event.preventDefault();

    const email = localStorage.getItem('email');

    const options = {
        method: 'GET',
        mode: 'cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const url = `http://localhost:3000/${email}/personalInfo`;

    fetch(url, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.log("Errorz:" + error));
};


function updatePersonalInfo() {
    const profilePic = document.getElementsByClassName('profilePicture');
    const name = document.getElementById('fullName');
    const phone = document.getElementById('phone');
    const description = document.getElementById('infoPer');

    const email = localStorage.getItem('email');

    const user = {
        "phone": phone,
        "name ": name,
        "description": description,
        "profilePicture": profilePic
    };

    const options = {
        method: 'PUT',
        mode: 'cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    const url = `http://localhost:3000/${email}/update`;

    fetch(url, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.log("Errorz:" + error));
}





// (function() {
//     const doneBtn = document.getElementsByClassName('done');

//     doneBtn.addEventListener('click', dashboard);
// })();

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

const projectName = document.getElementById('projectName');
//     const projectDescription = document.getElementById('projectDescription');depcos