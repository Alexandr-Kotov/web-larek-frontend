import { ICardsContainer } from '../types';
export class CardsContainer {
	protected _catalog: HTMLElement;
	protected container: HTMLElement;

	constructor(container: HTMLElement) {
		this.container = container;
	}

	set catalog(items: HTMLElement[]) {
		this.container.replaceChildren(...items);
	}

	render(data: Partial<ICardsContainer>) {
		Object.assign(this, data);
		return this.container;
	}

	addCard(card: HTMLElement) {
		this.container.appendChild(card);
	}

	clear() {
		this.container.innerHTML = '';
	}
}
