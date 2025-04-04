export class Successfully {
  protected modalElement: HTMLElement;
  protected totalAmountElement: HTMLElement;

  constructor(modalElement: HTMLElement) {
    this.modalElement = modalElement;

    // Получаем элементы внутри модального окна
    this.totalAmountElement = this.modalElement.querySelector('.film__description') as HTMLElement;
    // Привязываем событие на кнопку закрытия
  }

  // Обновление информации о заказе и общей сумме
  update(totalAmount: number): void {
    const formattedAmount = totalAmount// Форматирование суммы в рублях
    if (this.totalAmountElement) {
      this.totalAmountElement.textContent = `Списано ${formattedAmount} синапсов`;
    }
  }
}

