import { ICard } from "../types";
import { cloneTemplate } from "../utils/utils";
import { IEvents } from "./base/events";

export class Basket {
  protected container: HTMLElement;
  protected itemsList: HTMLElement;
  protected totalPriceElement: HTMLElement;
  protected template: HTMLTemplateElement;
  protected events: IEvents;
  protected orderButton: HTMLButtonElement;
  protected items: ICard[];
  protected basketCounter: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    this.container = container;
    this.itemsList = this.container.querySelector(".basket__list");
    this.totalPriceElement = this.container.querySelector(".basket__price");
    this.template = document.querySelector("#card-basket") as HTMLTemplateElement;
    this.orderButton = this.container.querySelector("#basket-order-button") as HTMLButtonElement;
    this.basketCounter = document.querySelector('.header__basket-counter') as HTMLElement;
    this.events = events;
    this.items = [];

    // Если корзина пуста, показываем 0 синапсов
    if (this.items.length === 0) {
      this.totalPriceElement.textContent = "0 синапсов";
    }
  }

  // Добавление товара в корзину
  addItem(item: ICard) {
    if (this.items.find(existingItem => existingItem.id === item.id)) {
      return; // Если товар уже есть, ничего не делаем
    }


    if (this.items.find(existingItem => existingItem.id === item.id)) {
      return; // Если товар уже есть, ничего не делаем
    }
    this.items.push(item); // Добавляем товар в массив корзины
    this.renderItem(item);
    this.updateBasketCounter();  // Отображаем товар в списке корзины
    this.updateTotalPrice(); // Обновляем общую сумму
  }

  renderItem(item: ICard) {
    const listItem = cloneTemplate(this.template) as HTMLElement;
    // Наполнение карточки товара
    listItem.querySelector('.card__title').textContent = item.title;
    listItem.querySelector('.card__price').textContent = `${item.price} синапсов`;
  
    // Присвоение индекса товара
    const indexElement = listItem.querySelector('.basket__item-index') as HTMLElement;
    indexElement.textContent = (this.itemsList.children.length + 1).toString(); // Индекс в корзине
  
    // Поиск кнопки удаления и назначение обработчика
    const deleteButton = listItem.querySelector('.basket__item-delete') as HTMLButtonElement;
    deleteButton.addEventListener("click", () => this.removeItem(item.id));  // Обработчик удаления товара
  
    // Добавление элемента в корзину
    this.itemsList.appendChild(listItem);
    this.updateOrderButtonState();
  }

  // Удаление товара из корзины
  removeItem(itemId: string) {
    // Находим элемент в корзине и удаляем его
    const itemIndex = this.items.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      this.items.splice(itemIndex, 1); // Удаляем товар из массива

      // Перерисовываем всю корзину
      this.renderAllItems();

      // Обновляем общую сумму
      this.updateTotalPrice();
      this.updateBasketCounter();
      this.updateOrderButtonState();
    }
  }

  // Рендеринг всех товаров в корзине
  renderAllItems() {
    this.itemsList.innerHTML = ''; // Очищаем список
    this.items.forEach(item => this.renderItem(item)); // Рендерим все товары заново
  }

  updateBasketCounter() {
    if (this.basketCounter) {
      this.basketCounter.textContent = this.items.length.toString(); // Обновляем счетчик товаров
    }
  }

  // Обновление общей суммы корзины
  updateTotalPrice() {
    const total = this.totalPrice();
    this.totalPriceElement.textContent = `${total} синапсов`;
  }

  totalPrice(){
    return  this.items.reduce((sum, item) => sum + item.price, 0);
  }

  updateOrderButtonState() {
    if (this.items.length === 0) {
      this.orderButton.disabled = true;  // Если корзина пуста, кнопка заблокирована
    } else {
      this.orderButton.disabled = false; // Если товары есть, кнопка активна
    }
  }

  // Очистка корзины
  clear() {
    this.itemsList.innerHTML = "";
    this.items = [];
    this.updateTotalPrice();
    this.updateOrderButtonState();
    this.updateBasketCounter()
  }
}