export class Successfully {
	protected modalElement: HTMLElement;
	protected totalAmountElement: HTMLElement;

	constructor(modalElement: HTMLElement) {
		this.modalElement = modalElement;
		this.totalAmountElement = this.modalElement.querySelector(
			'.film__description'
		) as HTMLElement;
	}

	update(totalAmount: number): void {
		const formattedAmount = totalAmount;
		if (this.totalAmountElement) {
			this.totalAmountElement.textContent = `Списано ${formattedAmount} синапсов`;
		}
	}
}
