import { ICard } from "../types";
import { CDN_URL } from "../utils/constants";
import { cloneTemplate } from "../utils/utils";
import { IEvents } from "./base/events";

export class Card {
  protected element: HTMLElement;
  protected events: IEvents;
  protected cardDescription: HTMLElement;
  protected cardImage: HTMLImageElement;
  protected cardTitle: HTMLElement;
  protected cardCategory: HTMLElement;
  protected cardPrice: HTMLElement;
  protected addButton: HTMLButtonElement;
  protected deletButton: HTMLButtonElement;
  protected preview: HTMLButtonElement;
  protected cardId: string;
  protected cardData: Partial<ICard>

  constructor(template: HTMLTemplateElement, events: IEvents) {
    this.events = events;
    this.element = cloneTemplate(template);

    this.cardCategory = this.element.querySelector('.card__category');
    this.cardDescription = this.element.querySelector('.card__text');
    this.cardImage = this.element.querySelector('.card__image');
    this.cardPrice = this.element.querySelector('.card__price');
    this.cardTitle = this.element.querySelector('.card__title');
    this.addButton = this.element.querySelector('.button');
    this.deletButton = this.element.querySelector('.basket__item-delete');
    this.preview = this.element.querySelector('.gallery__item');

    this.element.addEventListener("click", () => {
      this.events.emit("card:select", this.cardData);
    });
  }

  render(itemData: Partial<ICard>) {
    this.cardId = itemData.id;
    this.cardData = itemData;
    if(this.cardDescription) this.cardDescription.textContent = itemData.description;
    if(this.cardImage) this.cardImage.src = CDN_URL + itemData.image;
    if(this.cardCategory) this.cardCategory.textContent = itemData.category;
    this.cardTitle.textContent = itemData.title;
    this.cardPrice.textContent = itemData.price !== null ? itemData.price + " синапсов" : "Цена не указана";
    return this.element;
  }

  get id() {
    return this.cardId;
  }
}