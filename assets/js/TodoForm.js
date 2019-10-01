export default class TodoForm extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.innerHTML = /*html*/`
			<style>
				fieldset {
					border: 1px solid #ccc;
				}
				fieldset > * {
					box-sizing: border-box;
					display: block;
					margin: 1rem 0;
					padding: 10px;
					font: normal 16px Arial, sans-serif;
				}
				fieldset > input, fieldset > textarea {
					width: 50%;
					border: 1px solid #ccc;
					border-radius: 3px;
				}
				fieldset > button {
					background: #eee;
					border: 1px solid #ccc;
					padding: 5px 10px;
				}
			</style>
			<div id="todo-form">
				<fieldset>
					<input type="text" id="title" placeholder="Title (required)">
					<textarea id="description" placeholder="Description"></textarea>
					<button type="button" id="save-btn">Save</button>
				</fieldset>
			</div>
		`;
		this.titleInput = shadowRoot.querySelector('#title');
		this.descInput = shadowRoot.querySelector('#description');
		this.saveButton = shadowRoot.querySelector('#save-btn');
		this.container = shadowRoot;
		this.saveNewTodo = this.saveNewTodo.bind(this);
		this.clearInputs = this.clearInputs.bind(this);
	}

	connectedCallback() {
		this.saveButton.addEventListener('click', this.saveNewTodo);
	}

	saveNewTodo() {
		const title = this.titleInput.value || '';
		const description = this.descInput.value || '';

		if (title == '') return false;

		this.dispatchEvent(new CustomEvent('saveTodo', {
			bubbles: true,
			detail: {
				title,
				description
			}
		}));

		this.clearInputs();
	}

	clearInputs() {
		this.titleInput.value = '';
		this.descInput.value = '';
	}
}

customElements.define('todo-form', TodoForm);
