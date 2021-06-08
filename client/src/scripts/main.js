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

}