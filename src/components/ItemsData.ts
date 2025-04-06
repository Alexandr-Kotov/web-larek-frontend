import { ICard, ICardsData } from '../types';
import { IEvents } from './base/events';

export class ItemsData implements ICardsData {
	protected _items: ICard[] = [];
	protected _basket: ICard[] = [];
	protected _preview: string | null = null;
	protected events: IEvents;
	protected _total = 0;

	constructor(events: IEvents) {
		this.events = events;
	}

	set items(items: ICard[]) {
		this._items = items;
		this._total = items.length;
	}

	get items(): ICard[] {
		return this._items;
	}

	get preview(): string | null {
		return this._preview;
	}

	get total(): number {
		return this._total;
	}

	getItem(cardId: string): ICard | null {
		const item = this._items.find((item) => item.id === cardId);
		return item;
	}

	deleteItem(cardId: string): void {
		this._items = this._items.filter((item) => item.id !== cardId);
	}

	addToBasket(item: ICard): void {
		if (!this.isInBasket(item.id)) {
			this._basket.push(item);
		}
	}

	removeFromBasket(itemId: string): void {
		this._basket = this._basket.filter((item) => item.id !== itemId);
	}

	isInBasket(itemId: string): boolean {
		return this._basket.some((item) => item.id === itemId);
	}

	getBasketItems(): ICard[] {
		return this._basket;
	}

	getBasketTotal(): number {
		return this._basket.reduce((sum, item) => sum + (item.price || 0), 0);
	}

	clearBasket(): void {
		this._basket = [];
	}
}
