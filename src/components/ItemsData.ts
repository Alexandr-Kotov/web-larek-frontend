import { ICard, ICardsData } from "../types";
import { IEvents } from "./base/events";

export class ItemsData implements ICardsData {
  protected _items: ICard[] = [];
  protected _preview: string | null = null;
  protected events: IEvents;
  protected _total: number = 0;

  constructor(events: IEvents) {
    this.events = events;
  }

  set items(items: ICard[]) {
    this._items = items;
    this._total = items.length;
  }

  get items() {
    return this._items;
  }
  get preview() {
    return this._preview;
  }

  get total() {
    return this._total;
  }

  addItem(cardId: string): ICard {
    return this.getItem(cardId);
  }

  deleteItem(cardId: string): void {
    this._items = this._items.filter(item => item.id !== cardId);
  }

  getItem(cardId: string): ICard {
    return this._items.find((item) => item.id === cardId);
  }
};