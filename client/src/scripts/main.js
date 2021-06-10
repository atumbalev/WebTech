// Get the modal
let modal = document.getElementById("myModal");
let btnClose = document.getElementById("deleteProject");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close");

function addProject() {
    console.log(modal)
    modal.style.display = "block";
    // btnClose.onclick = () => {
    //     modal.style.display = "none"
    // };
}

function addTask() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function hidePopup() {
    console.log('close')
    modal.style.display = "none";
}

// if (event.target === modal) {
//     modal.style.display = "none";
// }
// }


//to show myProfile and LogOut
var test = document.getElementById("hamburgerMenu");
var counter = 0;

function show() {
    if (counter % 2 == 0) {
        test.style.display = "block";
        test.style.textAlign = "justify";
    } else {
        test.style.display = "none";
    }

    counter++;
};

//statuses
const btn5 = document.getElementById('status5');
const btn4 = document.getElementById('status4');
const btn3 = document.getElementById('status3');
const btn2 = document.getElementById('status2');
const btn1 = document.getElementById('status1');

btn5.addEventListener('click', function() {
    if (btn4.style.marginTop != '290px') {
        btn4.style.marginTop = '290px';
    } else {
        btn4.style.marginTop = '20px';
    }
});

btn4.addEventListener('click', function() {
    if (btn3.style.marginTop != '290px') {
        btn3.style.marginTop = '290px';
    } else {
        btn3.style.marginTop = '20px';
    }
});

btn3.addEventListener('click', function() {
    if (btn2.style.marginTop != '290px') {
        btn2.style.marginTop = '290px';
    } else {
        btn2.style.marginTop = '20px';
    }
});

btn2.addEventListener('click', function() {
    if (btn1.style.marginTop != '290px') {
        btn1.style.marginTop = '290px';
    } else {
        btn1.style.marginTop = '20px';
    }
});