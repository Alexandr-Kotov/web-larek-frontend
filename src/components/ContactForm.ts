export class ContactForm {
    protected _form: HTMLFormElement;
    protected submitButton: HTMLButtonElement;
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;
  
    constructor(formElement: HTMLFormElement) {
      this._form = formElement;
      this.submitButton = this._form.querySelector(".modal__actions .button") as HTMLButtonElement;
      this.emailInput = this._form.querySelector('input[placeholder="Введите Email"]') as HTMLInputElement;
      this.phoneInput = this._form.querySelector('input[placeholder^="+7"]') as HTMLInputElement;
  
      this._form.addEventListener("input", () => this.validateForm());
      this._form.addEventListener("submit", (event) => this.handleSubmit(event));
  
      this.setValid(false);
    }
  
    validateForm(): void {
      const isValid = this.emailInput.value !== "" && this.phoneInput.value !== "";
      this.setValid(isValid);
    }
  
    setValid(isValid: boolean): void {
      this.submitButton.disabled = !isValid;
    }
  
    handleSubmit(event: Event): void {
      event.preventDefault();
  
      const contactData = {
        email: this.emailInput.value,
        phone: this.phoneInput.value,
      };
  
      console.log("Контактные данные:", contactData);
  
      this.resetForm();
    }
  
    resetForm(): void {
      this._form.reset();
      this.setValid(false);
    }
  }