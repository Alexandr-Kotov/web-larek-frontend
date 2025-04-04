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
    if (!Array.isArray(items) || items.some(item => !item.id)) {
      console.error("Некорректные данные для items:", items);
      return; // Прерываем выполнение, если данные некорректны
    }
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

  addItem(cardId: string): ICard | null {
    const item = this.getItem(cardId);
    if (!item) {
      console.error(`Не удалось добавить товар с id ${cardId}, товар не найден.`);
      return null; // Возвращаем null, если товар не найден
    }
    return item;
  }
  

  deleteItem(cardId: string): void {
    this._items = this._items.filter(item => item.id !== cardId);
  }

  getItem(cardId: string): ICard | null {
    const item = this._items.find((item) => item.id === cardId);
    if (!item) {
      console.error(`Товар с id ${cardId} не найден.`);
      return null; // Возвращаем null, если товар не найден
    }
    return item;
  }
};