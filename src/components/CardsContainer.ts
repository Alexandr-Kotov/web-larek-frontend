import { ICardsContainer, IItem } from "../types";  // Импортируем типы

export class CardsContainer {
  protected _catalog: HTMLElement;
  protected container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container; // Инициализация контейнера
  }

  // Устанавливаем новые карточки в контейнер, используя replaceChildren для замены всех детей
  set catalog(items: HTMLElement[]) {
    this.container.replaceChildren(...items); // Заменяем старые карточки новыми
  }

  // Рендерим карточки в контейнер с использованием данных
  render(data: Partial<ICardsContainer>) {
    Object.assign(this, data);  // Применяем данные, полученные от родительского компонента
    return this.container;  // Возвращаем контейнер после рендера
  }

  // Метод для добавления карточки
  addCard(card: HTMLElement) {
    this.container.appendChild(card);  // Добавляем карточку в контейнер
  }

  // Метод для очистки контейнера
  clear() {
    this.container.innerHTML = '';
  }
}