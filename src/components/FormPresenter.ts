import { IEvents } from './base/events';
import { Form } from './Form';
import { Modal } from './Modal';
import { UserData } from './UserData';

export class FormPresenter {
	protected form: Form;
	protected modal: Modal;
	protected events: IEvents;
	protected userData: UserData;

	constructor(
		form: Form,
		modal: Modal,
		events: IEvents,
		orderButton: HTMLButtonElement,
		basketModal: Modal,
		userData: UserData
	) {
		this.form = form;
		this.modal = modal;
		this.events = events;
		this.userData = userData;

		orderButton.addEventListener('click', () => {
			basketModal.close();
			this.open();
		});

		this.overrideSubmit();
	}

	protected overrideSubmit() {
		const originalSubmit = this.form.handleSubmit.bind(this.form);
		this.form.handleSubmit = (event: Event) => {
			originalSubmit(event);

			const data = this.formData();
			if (data) {
				this.userData.setUserDelivery({
					payment: data.paymentMethod,
					address: data.address,
				});

				this.events.emit('order:submit', data);
				this.modal.close();
			}
		};
	}

	public open() {
		this.form.resetForm();
		this.modal.open();
	}

	protected formData() {
		const data = this.form.getFormData();
		if (data.paymentMethod && data.address) {
			return {
				paymentMethod: data.paymentMethod,
				address: data.address,
			};
		}

		return null;
	}

	protected updateUserData(paymentMethod: string, address: string) {
		this.userData.setUserDelivery({
			payment: paymentMethod,
			address: address,
		});
	}
}
