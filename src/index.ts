import { AppApi } from './components/AppApi';
import { Api } from './components/base/api';
import { EventEmitter, IEvents } from './components/base/events';
import { Basket } from './components/Basket';
import { Card } from './components/Card';
import { CardsContainer } from './components/CardsContainer';
import { DetailedInformation } from './components/DetailedInformation';
import { Modal } from './components/Modal';
import './scss/styles.scss';
import { IApi, ICard, ICardsData } from './types';
import { API_URL, settings } from './utils/constants';

const events: IEvents = new EventEmitter();
const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

const cardTemplate: HTMLTemplateElement = document.querySelector('#card-catalog');
const galleryElement = document.querySelector('.gallery') as HTMLElement;

// Модальное окно для карточек
const modalElement = document.querySelector('#modal-card') as HTMLElement;
const modal = new Modal(modalElement, events);
const detailedInfo = new DetailedInformation(modalElement.querySelector('.modal__content'), events);

api.getItems()
    .then((data: ICardsData) => {
        const cards: HTMLElement[] = [];
        const section = new CardsContainer(galleryElement);
        section.clear();

        data.items.forEach((item: ICard) => {
            const card = new Card(cardTemplate, events);
            const cardElement = card.render(item);
            //  Добавляем событие клика по карточке
            cardElement.addEventListener('click', () => {
                detailedInfo.update(item);
                modal.open();
            });
            cards.push(cardElement);
        });
        section.catalog = cards;
    })

// Модальное окно корзины
const basketModalElement = document.querySelector('#modal-bascet') as HTMLElement;
const basketModal = new Modal(basketModalElement, events);
const basketButton = document.querySelector('.header__basket');

basketButton.addEventListener('click', () => {
    basketModal.open();
});

const bascet = new Basket(basketModalElement, events);
bascet.clear()

events.on('card:add', (itemData: ICard) => {
    bascet.addItem(itemData); // Добавляем товар в корзину
    modal.close();
});