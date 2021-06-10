class Project extends HTMLElement {
    constructor(title) {
        super();
        this.innerHTML = `
        <li class="project">
        <label class="project-name">asd</label>
        </li>
        `
    }
}

window.customElements.define('custom-project', Project);