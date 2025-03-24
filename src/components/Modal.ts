import { IEvents } from './base/events';

export class Modal {
  protected modal: HTMLElement;
  protected events: IEvents;
  protected container: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    this.events = events;
    this.container = container;
    const closeButtonElement = this.container.querySelector('.modal__close');
    closeButtonElement.addEventListener('click', this.close.bind(this));
    this.container.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
    this.handleEscUp = this.handleEscUp.bind(this);
  }

  open() {
    this.container.classList.add('modal_active');
    document.addEventListener('keyup', this.handleEscUp);
  }

  close() {
    this.container.classList.remove('modal_active');
    document.removeEventListener('keyup', this.handleEscUp);
  }

  handleEscUp (evt: KeyboardEvent) {
    if (evt.key === 'Escape') {
      this.close();
    }
  };
}