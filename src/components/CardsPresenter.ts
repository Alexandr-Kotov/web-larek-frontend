import { EventEmitter, IEvents } from "./base/events";
import { Card } from "./Card";
import { ICard } from "../types";
import { ItemsData } from "./ItemsData";
import { Modal } from "./Modal";
import { DetailedInformation } from "./DetailedInformation";
const events: IEvents = new EventEmitter();
const modalElement = document.querySelector('#modal-card') as HTMLElement;
const modal = new Modal(modalElement, events);
const detailedInfo = new DetailedInformation(modalElement.querySelector('.modal__content'), events);

export class CardsPresenter {
  protected container: HTMLElement;
  protected itemsData: ItemsData;
  protected template: HTMLTemplateElement;
  protected events: IEvents;
  constructor(
    itemsData: ItemsData,
    template: HTMLTemplateElement,
    container: HTMLElement,
    events: IEvents
  ) {
    this.container = container;
    this.itemsData = itemsData;
    this.template = template;
    this.events = events;
  }

  displayItems() {
    this.container.innerHTML = ''; // очистка
    this.itemsData.items.forEach((item: ICard) => {
      const card = new Card(this.template, this.events);
      const cardElement = card.render(item);
      cardElement.addEventListener('click', () => {
        this.events.emit("card:add", item);
        detailedInfo.update(item);
        modal.open();
    });
      this.container.appendChild(cardElement);
    });
  }
}
