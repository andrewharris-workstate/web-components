export default class TodoItem extends HTMLElement {
	constructor() {
		super();

		const template = document.getElementById('todo-item')
			.content;
		const shadowRoot = this.attachShadow({mode: 'open'})
			.appendChild(template.cloneNode(true));
		this.removeItem = this.removeItem.bind(this);
	}

	connectedCallback() {
		this.shadowRoot.querySelector('#done')
			.addEventListener('change', this.removeItem);
	}

	removeItem() {
		setTimeout(() => this.remove(), 300);
	}
}

customElements.define('todo-item', TodoItem);
