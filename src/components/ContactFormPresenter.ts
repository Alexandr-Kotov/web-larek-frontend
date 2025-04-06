import { Modal } from './Modal';
import { ContactForm } from '../components/ContactForm';
import { IEvents } from '../components/base/events';
import { UserData } from './UserData';

export class ContactFormPresenter {
	protected form: ContactForm;
	protected modal: Modal;
	protected events: IEvents;
	protected userData: UserData;

	constructor(
		form: ContactForm,
		modal: Modal,
		events: IEvents,
		userData: UserData
	) {
		this.form = form;
		this.modal = modal;
		this.events = events;
		this.userData = userData;

		this.overrideSubmit();
	}

	protected overrideSubmit() {
		const originalSubmit = this.form.handleSubmit.bind(this.form);
		this.form.handleSubmit = (event: Event) => {
			originalSubmit(event);

			const data = this.formData();
			if (data) {
				this.userData.setUserInfo({
					email: data.email,
					phone: data.phone,
				});

				this.events.emit('contact:submit', data);
				this.events.emit('order:success');
				this.modal.close();
			}
		};
	}

	protected formData() {
		const data = this.form.getFormData();
		if (data.email && data.phone) {
			return {
				email: data.email,
				phone: data.phone,
			};
		}

		return null;
	}

	public open() {
		this.form.resetForm();
		this.modal.open();
	}

	public attachOpenHandler(
		button: HTMLButtonElement,
		closeModal?: Modal
	): void {
		button.addEventListener('click', () => {
			if (closeModal) closeModal.close();
			this.open();
		});
	}
}
