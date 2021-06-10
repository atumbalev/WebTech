class Issue extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <li class="issue" draggable="true">
        <p class="issue-title"></p>
        <p class="issue-description"></p>
        </li>`
    }
};


window.customElements.define('custom-issue', Issue);