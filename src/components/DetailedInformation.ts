// interface IDetailedInformation {

import { IEvents } from "./base/events";

// }


export class DetailedInformation {
  private description: HTMLFormElement;
  private image: HTMLImageElement;
  private title: HTMLFormElement;
  private category: HTMLFormElement;
  private price: HTMLFormElement;
  protected submitButton: HTMLButtonElement;
  protected events: IEvents;
  protected container: HTMLElement;

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
}