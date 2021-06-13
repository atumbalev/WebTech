function createIssue(titleMessage, descriptionMessage) {
    let newIssue = document.createElement("li")
    newIssue.classList.add('issue')
    newIssue.setAttribute('draggable', 'true');

    newIssue.addEventListener('dragstart', () => {
        newIssue.classList.add('dragging')
        deletionTray.style.visibility = 'visible'
        deletionTray.style.height = '30%'
    })

    newIssue.addEventListener('dragend', () => {
        newIssue.classList.remove('dragging')
        deletionTray.style.visibility = 'hidden'
        deletionTray.style.height = '0'
    })

    let title = document.createElement('p')
    title.classList.add('issue-title')
    title.innerHTML = titleMessage;

    let description = document.createElement('p')
    description.classList.add('issue-description')
    description.innerHTML = descriptionMessage;

    newIssue.appendChild(title)
    newIssue.appendChild(description)

    return newIssue;
}

function addIssueToList(list, issueName, issueDescription) {
    list.appendChild(createIssue("test", "testing"));
}

function getIssues(category, listID) {
    const projectName = localStorage.getItem('projectName');
    const url = `http://localhost:3000/projects/${projectName}/tickets/tasks/${category}`

    const options = {
        method: 'GET',
        mode: 'cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const list = document.getElementById(listID);

    fetch(url, options)
        .then(res => res.json())
        .then(res => Array.from(res).forEach(el => addIssueToList(list, el)))
        .catch(err => console.log(err))
}



function createTask() {
    const title = document.getElementById("task-name")
    const description = document.getElementById("task-description")
    const priority = document.getElementById("task-priority")
    const assignor = localStorage.getItem('email');

    const task = {
        "taskName": title,
        "description": description,
        "status": priority,
        "assignor": assignor,
        "assignees": []
    }
    const projectName = localStorage.getItem('projectName');
    const url = `http://localhost:3000/projects/${projectName}/tickets`

    const options = {
        method: 'POST',
        mode: 'cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    };
    fetch(url, options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))

}

(function() {
    getIssues('Open', 'open')
    getIssues('In progress', 'in-progress')
    getIssues('Resolved', 'resolved')
    getIssues('Closed', 'closed')

    const addTaskButton = document.getElementById("addTaskButton")
    addTaskButton.onclick = event => {
        event.preventDefault();
        createTask();
    }

    const cancelBtn = document.getElementById("cancelTask");
    cancelBtn.onclick = event => {
        event.preventDefault();
        let modal = document.getElementById("myModal")
        modal.style.display = "none";
    }

})();