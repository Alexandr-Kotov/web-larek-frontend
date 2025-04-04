import { ICard } from "../types";
import { CDN_URL } from "../utils/constants";
import { IEvents } from "./base/events";

export class DetailedInformation {
  protected description: HTMLElement;
  protected image: HTMLImageElement;
  protected title: HTMLElement;
  protected category: HTMLElement;
  protected price: HTMLElement;
  protected submitButton: HTMLButtonElement;
  protected events: IEvents;
  protected container: HTMLElement;
  protected id: string;
  protected cardData: ICard;

  constructor(container: HTMLElement, events: IEvents) {
    this.events = events;
    this.container = container;

    this.description = this.container.querySelector('.card__text');
    this.image = this.container.querySelector('.card__image');
    this.title = this.container.querySelector('.card__title');
    this.category = this.container.querySelector('.card__category');
    this.price = this.container.querySelector('.card__price');
    this.submitButton = this.container.querySelector('.button');
    
    this.submitButton.addEventListener("click", () => {
      if (!this.cardData) {
        console.error("Ошибка: cardData не определено перед отправкой в событие.");
        return; // Не выполняем эмиттинг события, если нет данных
      }
      this.events.emit('card:add', this.cardData);
    });
  }

  update(itemData: Partial<ICard>) {
    this.cardData = itemData as ICard;
    this.id = itemData.id;
    if (this.description) this.description.textContent = itemData.description || "Описание отсутствует";
    if (this.image) this.image.src = itemData.image ? CDN_URL + itemData.image : "";
    if (this.category) this.category.textContent = itemData.category || "Категория отсутствует";
    if (this.title) this.title.textContent = itemData.title || "Название отсутствует";
    if (this.price) this.price.textContent = itemData.price !== null ? itemData.price + " синапсов" : "Цена не указана";
  }
}