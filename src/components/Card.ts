import { ICard } from "../types";
import { CDN_URL } from "../utils/constants";
import { cloneTemplate } from "../utils/utils";
import { IEvents } from "./base/events";

export class Card {
  protected element: HTMLElement;
  protected events: IEvents;
  protected cardId: string;
  protected cardData: Partial<ICard>;
  protected template: HTMLTemplateElement;

  constructor(template: HTMLTemplateElement, events: IEvents) {
    this.template = template;
    this.events = events;
  }

  render(itemData: Partial<ICard>) {
    this.cardData = itemData;
    this.cardId = itemData.id;

    // Клонируем шаблон
    this.element = cloneTemplate(this.template);

    // Ищем элементы уже в клоне
    const cardCategory = this.element.querySelector('.card__category');
    const cardDescription = this.element.querySelector('.card__text');
    const cardImage = this.element.querySelector('.card__image') as HTMLImageElement;
    const cardPrice = this.element.querySelector('.card__price');
    const cardTitle = this.element.querySelector('.card__title');

    // Заполняем данные карточки
    if (cardDescription) cardDescription.textContent = itemData.description || '';
    if (cardImage) cardImage.src = CDN_URL + itemData.image;
    if (cardCategory) cardCategory.textContent = itemData.category;
    if (cardTitle) cardTitle.textContent = itemData.title;
    if (cardPrice) {
      cardPrice.textContent = itemData.price !== null && itemData.price !== undefined
        ? `${itemData.price} синапсов`
        : "Цена не указана";
    }

    // Навешиваем событие на саму карточку
    this.element.addEventListener("click", () => {
      this.events.emit("card:select", this.cardData);
    });

    return this.element;
  }

  get id() {
    return this.cardId;
  }
}
