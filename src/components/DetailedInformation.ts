import { ICard } from '../types';
import { CDN_URL } from '../utils/constants';
import { IEvents } from './base/events';
import { Basket } from './Basket';
import { ItemsData } from './ItemsData';

export class DetailedInformation {
	protected description: HTMLElement;
	protected image: HTMLImageElement;
	protected title: HTMLElement;
	protected category: HTMLElement;
	protected price: HTMLElement;
	protected submitButton: HTMLButtonElement;
	protected events: IEvents;
	protected container: HTMLElement;
	protected id: string;
	protected cardData: ICard;
	protected basket: Basket;
	protected itemsData: ItemsData;

	constructor(
		container: HTMLElement,
		events: IEvents,
		basket: Basket,
		itemsData: ItemsData
	) {
		this.events = events;
		this.container = container;
		this.basket = basket;
		this.itemsData = itemsData;

		this.description = this.container.querySelector('.card__text');
		this.image = this.container.querySelector('.card__image');
		this.title = this.container.querySelector('.card__title');
		this.category = this.container.querySelector('.card__category');
		this.price = this.container.querySelector('.card__price');
		this.submitButton = this.container.querySelector('.button');

		this.submitButton.addEventListener('click', () => {
			if (this.itemsData.isInBasket(this.cardData.id)) {
				this.events.emit('card:remove', this.cardData);
			} else {
				this.events.emit('card:add', this.cardData);
			}
		});
	}

	update(itemData: Partial<ICard>, isInBasket: boolean) {
		this.cardData = itemData as ICard;
		this.id = itemData.id;
		if (this.description)
			this.description.textContent =
				itemData.description || 'Описание отсутствует';
		if (this.image)
			this.image.src = itemData.image ? CDN_URL + itemData.image : '';
		if (this.category)
			this.category.textContent = itemData.category || 'Категория отсутствует';
		if (this.title)
			this.title.textContent = itemData.title || 'Название отсутствует';
		if (this.price)
			this.price.textContent =
				itemData.price !== null
					? itemData.price + ' синапсов'
					: 'Цена не указана';

		this.updateButtonText(isInBasket);
	}

	private updateButtonText(isInBasket: boolean) {
		if (this.submitButton) {
			if (isInBasket) {
				this.submitButton.textContent = 'Убрать из корзины';
			} else {
				this.submitButton.textContent = 'Добавить в корзину';
			}
		}
	}
}
