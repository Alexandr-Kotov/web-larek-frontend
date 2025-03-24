import { IItem, IItemsData } from "../types";
import { IEvents } from "./base/events";

export class ItemsData implements IItemsData {
  protected _items: IItem[];
  protected _preview: string | null;
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  set items(items: IItem[]) {
    this._items = items;
  }

  get items() {
    return this._items;
  }
  get preview() {
    return this._preview;
  }

  addItem(itemId: string): IItem {
    return this.getItem(itemId);
  }

  deleteItem(itemId: string): void {
    this._items = this._items.filter(item => item.id !== itemId);
  }

  getItem(itemId: string): IItem {
    return this._items.find((item) => item.id === itemId);
  }
};