export default class TodoForm extends HTMLElement {
	constructor() {
		super();

		const template = document.getElementById('todo-form')
			.content;
		const shadowRoot = this.attachShadow({mode: 'open'})
			.appendChild(template.cloneNode(true));
		this.saveNewTodo = this.saveNewTodo.bind(this);
	}

	connectedCallback() {
		this.shadowRoot.querySelector('#save-btn')
			.addEventListener('click', this.saveNewTodo);
	}

	saveNewTodo() {
		const title = this.shadowRoot.querySelector('#title').value || '';
		const description = this.shadowRoot.querySelector('#description').value || '';
		this.dispatchEvent(new CustomEvent('saveTodo', {
			bubbles: true,
			detail: {
				title,
				description
			}
		}));
	}
}

customElements.define('todo-form', TodoForm);
