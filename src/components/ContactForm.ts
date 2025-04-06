export class ContactForm {
	protected _form: HTMLFormElement;
	protected submitButton: HTMLButtonElement;
	protected emailInput: HTMLInputElement;
	protected phoneInput: HTMLInputElement;

	constructor(formElement: HTMLFormElement) {
		this._form = formElement;
		this.submitButton = this._form.querySelector(
			'.modal__actions .button'
		) as HTMLButtonElement;
		this.emailInput = this._form.querySelector(
			'input[placeholder="Введите Email"]'
		) as HTMLInputElement;
		this.phoneInput = this._form.querySelector(
			'input[placeholder^="+7"]'
		) as HTMLInputElement;
		this.phoneInput.addEventListener('input', () => this.handlePhoneInput());
		this._form.addEventListener('input', () => this.validateForm());
		this._form.addEventListener('submit', (event) => this.handleSubmit(event));

		this.setValid(false);
	}

	validateForm(): void {
		const isValid =
			this.emailInput.value !== '' && this.phoneInput.value !== '';
		this.setValid(isValid);
	}

	handlePhoneInput(): void {
		let value = this.phoneInput.value;

		value = value.replace(/[^\d+]/g, '');
		value = value.replace(/(?!^)\+/g, '');
		this.phoneInput.value = value;
	}

	setValid(isValid: boolean): void {
		this.submitButton.disabled = !isValid;
	}

	getFormData(): { email: string; phone: string } {
		return {
			email: this.emailInput.value,
			phone: this.phoneInput.value,
		};
	}

	handleSubmit(event: Event): void {
		event.preventDefault();
	}

	resetForm(): void {
		this._form.reset();
		this.setValid(false);
	}
}
