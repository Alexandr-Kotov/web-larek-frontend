import { ICard } from "../types";
import { CDN_URL } from "../utils/constants";
import { IEvents } from "./base/events";

export class DetailedInformation {
  private description: HTMLElement;
  private image: HTMLImageElement;
  private title: HTMLElement;
  private category: HTMLElement;
  private price: HTMLElement;
  protected submitButton: HTMLButtonElement;
  protected events: IEvents;
  protected container: HTMLElement;
  protected id: string;

  constructor(container: HTMLElement, events: IEvents) {
    this.events = events;
    this.container = container;

    this.description = this.container.querySelector('.card__text');
    this.image = this.container.querySelector('.card__image');
    this.title = this.container.querySelector('.card__title');
    this.category = this.container.querySelector('.card__category');
    this.price = this.container.querySelector('.card__price');
    this.submitButton = this.container.querySelector('.button');
  }

  update(itemData: Partial<ICard>) {
    this.id = itemData.id;
    if (this.description) this.description.textContent = itemData.description || "Описание отсутствует";
    if (this.image) this.image.src = itemData.image ? CDN_URL + itemData.image : "";
    if (this.category) this.category.textContent = itemData.category || "Категория отсутствует";
    if (this.title) this.title.textContent = itemData.title || "Название отсутствует";
    if (this.price) this.price.textContent = itemData.price !== null ? itemData.price + " синапсов" : "Цена не указана";
  }
}