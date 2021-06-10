function createIssue(titleMessage, descriptionMessage) {
    let newIssue = document.createElement("li")
    newIssue.classList.add('issue')

    let title = document.createElement('p')
    title.classList.add('issue-title')
    title.setAttribute('contenteditable', 'true');
    title.innerHTML = titleMessage;

    let description = document.createElement('p')
    description.classList.add('issue-description')
    description.setAttribute('contenteditable', 'true');
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

(function() {
    getIssues('Open', 'open')
    getIssues('In progress', 'in-progress')
    getIssues('Resolved', 'resolved')
    getIssues('Closed', 'closed')
})();