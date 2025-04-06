import { Card } from './Card';
import { ICard } from '../types';
import { ItemsData } from './ItemsData';
import { Modal } from './Modal';
import { DetailedInformation } from './DetailedInformation';
import { IEvents } from './base/events';
import { Basket } from './Basket';

export class CardsPresenter {
	protected container: HTMLElement;
	protected itemsData: ItemsData;
	protected template: HTMLTemplateElement;
	protected events: IEvents;
	protected modalCard: Modal;
	protected detailedInfo: DetailedInformation;
	protected basket: Basket;
	constructor(
		itemsData: ItemsData,
		template: HTMLTemplateElement,
		container: HTMLElement,
		events: IEvents,
		modalCard: Modal,
		detailedInfo: DetailedInformation,
		basket: Basket
	) {
		this.container = container;
		this.itemsData = itemsData;
		this.template = template;
		this.events = events;
		this.modalCard = modalCard;
		this.detailedInfo = detailedInfo;
		this.basket = basket;
	}

	displayItems() {
		this.container.innerHTML = '';
		this.itemsData.items.forEach((item: ICard) => {
			const card = new Card(this.template);
			const cardElement = card.render(item);
			cardElement.addEventListener('click', () => {
				const isInBasket = this.itemsData.isInBasket(item.id);
				this.detailedInfo.update(item, isInBasket);
				this.modalCard.open();
			});
			this.container.appendChild(cardElement);
		});
	}
}
