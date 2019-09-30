import TodoItem from './TodoItem.js';
import TodoForm from './TodoForm.js';

export default class TodoApp extends HTMLElement {
	constructor() {
		super();

		this.localStorage = window.localStorage;
		const shadowRoot = this.attachShadow({ mode: 'open' });
		const todos = this.getTodosFromLocalStorage();
		
		shadowRoot.innerHTML = /*html*/`
			<div id="todo-list">
				<h1>Todo List</h1>
				<todo-form></todo-form>
				<ul id="todos">
					<slot name="todos">
					${todos && todos.map((item, i) => /*html*/`
						<todo-item todo-id="${i}">
							<span slot="title">${item.title}</span>
							<span slot="description">${item.description}</span>
						</todo-item>
					`).join('')}
					</slot>
				</ul>
			</div>
		`;
		this.container = shadowRoot;
		this.addTodo = this.addTodo.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
		this.getTodosFromLocalStorage = this.getTodosFromLocalStorage.bind(this);
		this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
	}

	connectedCallback() {
		this.container.addEventListener('saveTodo', this.addTodo);
		this.container.addEventListener('deleteTodo', this.removeTodo);
	}

	addTodo(e) {
		const { detail } = e;
		var li = document.createElement('todo-item');
		li.setAttribute('todo-id', this.getTodosFromLocalStorage().length);
		li.innerHTML = /*html*/`
			<span slot="title">${detail.title}</span>
			<span slot="description">${detail.description}</span>
		`;
		this.container.querySelector('#todos').querySelector('slot[name="todos"]').appendChild(li);
		this.saveToLocalStorage(detail);
	}

	removeTodo(e) {
		const { detail } = e;
		const todos = this.getTodosFromLocalStorage();
		const newTodos = todos.filter((item, i) => i.toString() !== detail.id);
		this.localStorage.setItem('todos', JSON.stringify(newTodos));
	}

	getTodosFromLocalStorage() {
		try {
			const todos = JSON.parse(this.localStorage.getItem('todos'));

			if (!Array.isArray(todos)) throw new Error;
			
			return todos;
		} catch (e) {
			return [];
		}
	}

	saveToLocalStorage(item) {
		const todos = this.getTodosFromLocalStorage();
		todos.push(item);
		this.localStorage.setItem('todos', JSON.stringify(todos));
	}
}

customElements.define('todo-list', TodoApp);
