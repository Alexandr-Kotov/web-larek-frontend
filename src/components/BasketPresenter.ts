import { Basket } from './Basket';
import { IEvents } from './base/events';
import { ICard } from '../types';

export class BasketPresenter {
  constructor(
    private basketView: Basket,
    private events: IEvents
  ) {
    this.subscribeToEvents();
  }

  protected subscribeToEvents() {
    // Слушаем добавление товара в корзину
    this.events.on('card:add', (item: ICard) => {
      this.basketView.addItem(item);
    });

    // Можно добавить очистку корзины
    this.events.on('basket:clear', () => {
      this.basketView.clear();
    });

    // Можно слушать успешный заказ и очищать корзину
    this.events.on('order:success', () => {
      this.basketView.clear();
    });
  }
}
