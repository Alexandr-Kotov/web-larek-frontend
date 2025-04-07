import { IEvents } from './base/events';
import { Modal } from './Modal';
import { Successfully } from './Successfully';
import { ItemsData } from './ItemsData';
import { AppApi } from './AppApi';
import { UserData } from './UserData';
import { Basket } from './Basket';

export class SuccessfullyPresenter {
	protected view: Successfully;
	protected modal: Modal;
	protected events: IEvents;
	protected itemsData: ItemsData;
	protected closeButton: HTMLButtonElement;
	protected api: AppApi;
	protected userData: UserData;
	protected basket: Basket;

	constructor(
		successModalElement: HTMLElement,
		modal: Modal,
		events: IEvents,
		itemsData: ItemsData,
		api: AppApi,
		userData: UserData,
		basket: Basket
	) {
		this.view = new Successfully(successModalElement);
		this.modal = modal;
		this.events = events;
		this.itemsData = itemsData;
		this.api = api;
		this.userData = userData;
		this.basket = basket;

		this.closeButton = successModalElement.querySelector(
			'.order-success__close'
		) as HTMLButtonElement;
		this.closeButton.addEventListener('click', () => this.handleClose());

		this.events.on('order:success', () => this.handleOrderSuccess());
	}

	bindPayButton(button: HTMLButtonElement, contactModal: Modal): void {
		button.addEventListener('click', () => {
			contactModal.close();
		});
	}

	protected handleOrderSuccess(): void {
		const total = this.itemsData.getBasketTotal();
		const { email, payment, address, phone } = this.userData.getUserData();
		const items = this.itemsData
		.getBasketItems()
		.filter((item) => item.price !== null)
		.map((item) => item.id);

		this.api
			.postOrder({ total, payment, email, phone, address, items })
			.then((response) => {
				console.log('Заказ успешно отправлен:', response);
				this.basket.clear();
				this.view.update(total);
				this.modal.open();
				this.itemsData.clearBasket();
			})
			.catch((error) => {
				console.error('Ошибка при отправке заказа:', error);
			});
	}

	protected handleClose(): void {
		this.modal.close();
	}
}
