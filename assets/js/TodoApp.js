import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

export default class TodoApp extends HTMLElement {
	constructor() {
		super();

		const template = document.getElementById('todo-list')
			.content;
		const shadowRoot = this.attachShadow({mode: 'open'})
			.appendChild(template.cloneNode(true));
		this.addTodo = this.addTodo.bind(this);
	}

	connectedCallback() {
		this.shadowRoot.addEventListener('saveTodo', this.addTodo);
	}

	addTodo(e) {
		const { detail } = e;
		var li = document.createElement('todo-item');
		li.innerHTML = `
			<span slot="title">${detail.title}</span>
			<span slot="description">${detail.description}</span>
		`;
		this.shadowRoot.querySelector('#todos').appendChild(li);
	}
}

customElements.define('todo-list', TodoApp);
