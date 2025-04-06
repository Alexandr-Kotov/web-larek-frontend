import { ICard, ICardsData } from '../types';
import { cloneTemplate } from '../utils/utils';
import { IEvents } from './base/events';

export class Basket {
	protected container: HTMLElement;
	protected itemsList: HTMLElement;
	protected totalPriceElement: HTMLElement;
	protected template: HTMLTemplateElement;
	protected events: IEvents;
	protected orderButton: HTMLButtonElement;
	protected basketCounter: HTMLElement;
	protected itemsData: ICardsData;

	constructor(container: HTMLElement, events: IEvents, itemsData: ICardsData) {
		this.container = container;
		this.events = events;
		this.itemsData = itemsData;

		this.itemsList = this.container.querySelector('.basket__list');
		this.totalPriceElement = this.container.querySelector('.basket__price');
		this.template = document.querySelector(
			'#card-basket'
		) as HTMLTemplateElement;
		this.orderButton = this.container.querySelector(
			'#basket-order-button'
		) as HTMLButtonElement;
		this.basketCounter = document.querySelector(
			'.header__basket-counter'
		) as HTMLElement;

		this.renderAllItems();
		this.updateTotalPrice();
		this.updateOrderButtonState();
		this.updateBasketCounter();
	}

	addItemToBasket(item: ICard): void {
		if (!this.itemsData.isInBasket(item.id)) {
			this.itemsData.addToBasket(item);
			this.renderAllItems();
			this.updateTotalPrice();
			this.updateBasketCounter();
			this.updateOrderButtonState();
		}
	}

	renderItem(item: ICard) {
		const listItem = cloneTemplate(this.template) as HTMLElement;

		listItem.querySelector('.card__title').textContent = item.title;
		listItem.querySelector(
			'.card__price'
		).textContent = item.price !== null
    ? item.price + ' синапсов'
    : 'Цена не указана';

		const indexElement = listItem.querySelector(
			'.basket__item-index'
		) as HTMLElement;
		indexElement.textContent = (this.itemsList.children.length + 1).toString();

		const deleteButton = listItem.querySelector(
			'.basket__item-delete'
		) as HTMLButtonElement;
		deleteButton.addEventListener('click', () => {
			this.itemsData.removeFromBasket(item.id);
			this.renderAllItems();
			this.updateTotalPrice();
			this.updateBasketCounter();
			this.updateOrderButtonState();
		});

		this.itemsList.appendChild(listItem);
	}

	renderAllItems() {
		this.itemsList.innerHTML = '';
		const basketItems = this.itemsData.getBasketItems();
		basketItems.forEach((item) => this.renderItem(item));
	}

	updateTotalPrice() {
		const total = this.itemsData.getBasketTotal();
		this.totalPriceElement.textContent = `${total} синапсов`;
		return total;
	}

	updateBasketCounter() {
		const count = this.itemsData.getBasketItems().length;
		this.basketCounter.textContent = count.toString();
	}

	updateOrderButtonState() {
		const total = this.itemsData.getBasketTotal();
	  this.orderButton.disabled = total <= 0;
	}

	clear() {
		this.itemsData.clearBasket();
		this.renderAllItems();
		this.updateTotalPrice();
		this.updateBasketCounter();
		this.updateOrderButtonState();
	}
}
