export default class TodoItem extends HTMLElement {
	constructor() {
		super();

		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.innerHTML = /*html*/`
			<style>
				:host {
					display: block;
					margin: 20px 0;
				}
				.todo__title {
					font-weight: 600;
				}
				.todo__title:after {
					content: " - ";
				}
				.todo__desc {
					display: inline;
					margin: 0;
					font-family: Arial, sans-serif;
					white-space: pre-wrap;
					word-wrap: break-word;
				}
				.todo__done {
					display: block;
					background: #eee;
					margin-top: 10px;
				}
			</style>
			<li id="todo-item">
				<span class="todo__title"><slot name="title"></slot></span>
				<pre class="todo__desc"><slot name="description"></slot></pre>
				<label class="todo__done"><input type="checkbox" id="done">Done</label>
			</li>
		`;
		this.container = shadowRoot;
		this.doneCheckbox = shadowRoot.querySelector('#done');
		this.removeItem = this.removeItem.bind(this);
	}

	connectedCallback() {
		this.doneCheckbox.addEventListener('change', this.removeItem);
	}

	removeItem() {
		setTimeout(() => this.remove(), 300);

		this.dispatchEvent(new CustomEvent('deleteTodo', {
			bubbles: true,
			detail: {
				id: this.getAttribute('todo-id')
			}
		}));
	}
}

customElements.define('todo-item', TodoItem);
