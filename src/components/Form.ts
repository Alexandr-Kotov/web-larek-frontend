export class Form {
    protected _form: HTMLFormElement;
    protected submitButton: HTMLButtonElement;
    protected paymentButtons: NodeListOf<HTMLButtonElement>;
    protected addressInput: HTMLInputElement;
    protected selectedPayment: string | null = null;
  
    constructor(formElement: HTMLFormElement) {
      this._form = formElement;
      this.submitButton = this._form.querySelector(".modal__actions .button") as HTMLButtonElement;
      this.paymentButtons = this._form.querySelectorAll(".order__buttons .button_alt");
      this.addressInput = this._form.querySelector(".form__input") as HTMLInputElement;
  
      this._form.addEventListener("input", () => this.validateForm());
      this._form.addEventListener("submit", (event) => this.handleSubmit(event));
      this.paymentButtons.forEach((button) =>
        button.addEventListener("click", (event) => this.selectPayment(event))
      );
  
      this.setValid(false);
    }
  
    selectPayment(event: Event): void {
      const button = event.currentTarget as HTMLButtonElement;
      this.selectedPayment = button.textContent || null;
  
      this.paymentButtons.forEach((btn) => btn.classList.remove("button_alt-active"));
      button.classList.add("button_alt-active");
  
      this.validateForm();
    }
  
    validateForm(): void {
      const isValid = this.selectedPayment !== null && this.addressInput.value !== "";
      this.setValid(isValid);
    }
  
    setValid(isValid: boolean): void {
      this.submitButton.disabled = !isValid;
    }
  
    handleSubmit(event: Event): void {
      event.preventDefault();
      if (!this.selectedPayment || !this.addressInput.value) return;
  
      const formData = {
        paymentMethod: this.selectedPayment,
        address: this.addressInput.value,
      };
  
      console.log("Данные заказа:", formData);

      this._form.reset();
      this.selectedPayment = null;
      this.paymentButtons.forEach((btn) => btn.classList.remove("button_active"));
      this.setValid(false);
    }

    resetForm(): void {
        this._form.reset(); // Сброс полей формы
        this.selectedPayment = null;
      
        // Удаление активного класса с кнопок оплаты
        this.paymentButtons.forEach((btn) => {
          btn.classList.remove("button_alt-active");
        });
      
        // Деактивировать кнопку подтверждения
        this.setValid(false);
      }
}
  