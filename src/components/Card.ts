import { ICard } from '../types';
import { CDN_URL } from '../utils/constants';
import { cloneTemplate } from '../utils/utils';

export class Card {
	protected cardData: Partial<ICard> = {};
	protected cardId = '';
	protected element: HTMLElement;
	protected template: HTMLTemplateElement;

	constructor(template: HTMLTemplateElement) {
		this.template = template;
	}

	render(itemData: Partial<ICard>) {
		this.cardData = itemData;
		this.cardId = itemData.id || '';
		this.element = cloneTemplate(this.template);

		this.fillCardData(itemData);

		return this.element;
	}

	private fillCardData(itemData: Partial<ICard>) {
		const cardCategory = this.element.querySelector('.card__category');
		const cardDescription = this.element.querySelector('.card__text');
		const cardImage = this.element.querySelector(
			'.card__image'
		) as HTMLImageElement;
		const cardPrice = this.element.querySelector('.card__price');
		const cardTitle = this.element.querySelector('.card__title');

		if (cardDescription)
			cardDescription.textContent = itemData.description || '';
		if (cardImage) cardImage.src = CDN_URL + itemData.image;
		if (cardCategory) cardCategory.textContent = itemData.category;
		if (cardTitle) cardTitle.textContent = itemData.title;
		if (cardPrice) {
			cardPrice.textContent =
				itemData.price !== null && itemData.price !== undefined
					? `${itemData.price} синапсов`
					: 'Цена не указана';
		}
	}
}
