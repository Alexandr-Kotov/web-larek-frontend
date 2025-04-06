import { ICard } from '../types';
import { IEvents } from './base/events';
import { Basket } from './Basket';
import { ItemsData } from './ItemsData';
import { Modal } from './Modal';

export class BasketPresenter {
	protected basketView: Basket;
	protected events: IEvents;
	protected itemsData: ItemsData;
	protected modalBasket: Modal;
	protected modalCard: Modal;

	constructor(
		basketView: Basket,
		events: IEvents,
		itemsData: ItemsData,
		modalBasket: Modal,
		modalCard: Modal
	) {
		this.basketView = basketView;
		this.events = events;
		this.itemsData = itemsData;
		this.modalBasket = modalBasket;
		this.modalCard = modalCard;

		this.subscribeToEvents();
		this.basketView.clear();
		const headerBasketButton = document.querySelector('.header__basket');
		headerBasketButton.addEventListener('click', () => {
			modalBasket.open();
		});
	}

	protected subscribeToEvents() {
		this.events.on('card:add', (item: ICard) => {
			if (!this.itemsData.isInBasket(item.id)) {
				this.itemsData.addToBasket(item);
				this.updateView();
				this.modalCard.close();
			}
		});

		this.events.on('card:remove', (item: ICard) => {
			if (this.itemsData.isInBasket(item.id)) {
				this.itemsData.removeFromBasket(item.id);
				this.updateView();
				this.modalCard.close();
			}
		});
	}

	protected updateView() {
		this.basketView.renderAllItems();
		this.basketView.updateTotalPrice();
		this.basketView.updateBasketCounter();
		this.basketView.updateOrderButtonState();
	}
}
